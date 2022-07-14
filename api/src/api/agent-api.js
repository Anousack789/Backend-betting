const express = require('express');
const passport = require('passport');
const router = express.Router();

const { sequelize } = require('../utils/database');
const User = require('../db/models/user')(sequelize);
const UserRole = require('../db/models/userrole')(sequelize);
const Role = require('../db/models/role')(sequelize);
User.hasMany(UserRole, { foreignKey: 'UserId' });
Role.hasMany(UserRole, { foreignKey: 'RoleId' });
UserRole.belongsTo(User, { foreignKey: 'UserId' });
UserRole.belongsTo(Role, { foreignKey: 'RoleId' });

router.use('/agents', passport.authenticate('jwt', { session: false }));
router.get('/agents', async (req, res) => {
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

module.exports = router;
