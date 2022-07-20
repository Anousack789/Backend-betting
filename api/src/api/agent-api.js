const express = require('express');
const passport = require('passport');
const router = express.Router();
const { Op } = require('sequelize');
const { sequelize } = require('../utils/database');
const User = require('../db/models/user')(sequelize);
const UserRole = require('../db/models/userrole')(sequelize);
const Role = require('../db/models/role')(sequelize);
const AgentContract = require('../db/models/agentcontract')(sequelize);
const RegisterLog = require('../db/models/registerlog')(sequelize);
User.hasMany(UserRole, { foreignKey: 'UserId' });
Role.hasMany(UserRole, { foreignKey: 'RoleId' });
UserRole.belongsTo(User, { foreignKey: 'UserId' });
UserRole.belongsTo(Role, { foreignKey: 'RoleId' });
User.hasMany(AgentContract, { foreignKey: 'AgentId' });
AgentContract.belongsTo(User, { foreignKey: 'AgentId' });

const myPass = passport.authenticate('jwt', { session: false });

const checkPermission = async (providerId, receiverId) => {
  const registerLog = await RegisterLog.findOne({
    where: {
      ProviderId: providerId,
      ReceiverId: receiverId,
    },
  });
  return registerLog != null;
};

router.get('/agents', myPass, async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).send({ message: 'Unauthorized' });
  try {
    if (user.roles.includes('Admin')) {
      const roleMasterAgent = await Role.findAll({
        where: {
          Name: ['Master Agent', 'Agent'],
        },
        include: [
          {
            model: UserRole,
            include: [
              {
                model: User,
              },
            ],
          },
        ],
      });
      let resultUser = [];
      roleMasterAgent.forEach((role) => {
        resultUser = resultUser.concat(
          role.UserRoles.map((ur) => {
            ur.User.HashPass = undefined;
            ur.User.Password = undefined;
            return ur.User;
          })
        );
      });
      resultUser = resultUser.filter(
        (v, i, s) => s.findIndex((v2) => v2.id === v.id) === i
      );
      resultUser = resultUser.filter((fUser) => fUser.id != req.user.id);
      res.status(200).json(resultUser);
    } else if (user.roles.includes('Master Agent')) {
      const users = await User.findAndCountAll({
        include: [
          {
            model: UserRole,
            include: [
              {
                model: Role,
                where: {
                  Name: ['Agent', 'Master Agent'],
                },
              },
            ],
          },
        ],
      });
      user.rows = users.rows.map((u) => {
        u.Password = undefined;
        u.HashPass = undefined;
        u.UserRoles = undefined;
        return u;
      });
      res.status(200).json(users);
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.put('/agents/update-status', myPass, async (req, res) => {
  const user = req.user;
  console.log(user);
  if (!user) return res.status(401).send({ message: 'Unauthorized' });
  try {
    if (user.roles.includes('Admin') || user.roles.includes('Master Agent')) {
      const { agentId, status } = req.body;
      const user = await User.findByPk(agentId);
      if (!user) return res.status(404).send({ message: 'User not found' });
      user.UserStatus = status;
      await user.save();
      res.status(200).send({ message: 'User updated' });
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get('/agents/contracts/:id', myPass, async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).send({ message: 'Unauthorized' });
  try {
    if (user.roles.includes('Admin') || user.roles.includes('Master Agent')) {
      const { id } = req.params;
      const permission = await checkPermission(user.id, id);
      if (!permission)
        return res.status(404).send({ message: 'User not found' });
      const agentcontract = await AgentContract.findOne({
        where: {
          AgentId: id,
        },
      });
      if (!agentcontract) {
        const createAgentContract = await AgentContract.create({
          AgentId: id,
          DepositCommission: 0,
          DepositType: 0,
          WithdrawalCommission: 0,
          WithdrawalType: 0,
          RecruitCommission: 0,
          RecruitType: 0,
        });
        return res.status(200).json(createAgentContract);
      } else {
        return res.status(200).json(agentcontract.dataValues);
      }
    } else {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.put('/agents/contracts/:id', myPass, async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).send({ message: 'Unauthorized' });
  try {
    if (user.roles.includes('Admin') || user.roles.includes('Master Agent')) {
      const { id } = req.params;

      const permission = await checkPermission(user.id, id);
      if (!permission)
        return res.status(404).send({ message: "You don't have Permission!!" });

      const {
        DepositCommission,
        DepositType,
        WithdrawalCommission,
        WithdrawalType,
        RecruitCommission,
        RecruitType,
      } = req.body;
      const agentcontract = await AgentContract.findOne({
        where: {
          AgentId: id,
        },
      });
      if (!agentcontract) {
        const createAgentContract = await AgentContract.create({
          AgentId: id,
          DepositCommission,
          DepositType,
          WithdrawalCommission,
          WithdrawalType,
          RecruitCommission,
          RecruitType,
        });
        return res.status(200).json(createAgentContract);
      } else {
        agentcontract.DepositCommission = DepositCommission;
        agentcontract.DepositType = DepositType;
        agentcontract.WithdrawalCommission = WithdrawalCommission;
        agentcontract.WithdrawalType = WithdrawalType;
        agentcontract.RecruitCommission = RecruitCommission;
        agentcontract.RecruitType = RecruitType;
        await agentcontract.save();
        return res.status(200).json(agentcontract.dataValues);
      }
    } else {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get('/agents/players/:id', myPass, async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).send({ message: 'Unauthorized' });
  try {
    if (user.roles.includes('Admin') || user.roles.includes('Master Agent')) {
      const { id } = req.params;
      const permission = await checkPermission(user.id, id);
      if (!permission)
        return res.status(404).send({ message: 'User not found' });

      const playerIds = await RegisterLog.findAll({
        where: {
          ProviderId: id,
          RegisterType: 2,
        },
        attributes: ['ReceiverId'],
      });
      const players = await User.findAndCountAll({
        where: {
          id: {
            [Op.in]: playerIds.map((p) => p.ReceiverId),
          },
        },
        attributes: ['id', 'UserName', 'Wallet'],
      });

      res.status(200).json(players);
    } else {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
