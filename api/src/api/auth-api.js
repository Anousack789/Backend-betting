'use strict';
const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const client = require('../utils/redis');
const passport = require('passport');
const myCrypto = require('../utils/my-crypto');
const { sequelize } = require('../utils/database');
const User = require('../db/models/user')(sequelize);
const UserRole = require('../db/models/userrole')(sequelize);
const Role = require('../db/models/role')(sequelize);
const Menu = require('../db/models/menu')(sequelize);
const RoleMenu = require('../db/models/rolemenu')(sequelize);
User.hasMany(UserRole, { foreignKey: 'UserId' });
Role.hasMany(UserRole, { foreignKey: 'RoleId' });
UserRole.belongsTo(User, { foreignKey: 'UserId' });
UserRole.belongsTo(Role, { foreignKey: 'RoleId' });
RoleMenu.belongsTo(Role, { foreignKey: 'RoleId' });
RoleMenu.belongsTo(Menu, { foreignKey: 'MenuId' });
Menu.hasMany(RoleMenu, { foreignKey: 'MenuId' });
Role.hasMany(RoleMenu, { foreignKey: 'RoleId' });

router.post('/auth/login', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const findUser = await User.findOne({
      where: {
        UserName: userName,
      },
      include: [
        {
          model: UserRole,
          include: [
            {
              model: Role,
              include: [
                {
                  model: RoleMenu,
                  include: [
                    {
                      model: Menu,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    const user = findUser.dataValues;
    if (!user) {
      res.status(400).json({ message: 'User not found' });
    } else {
      const match = user.HashPass
        ? await bcryptjs.compare(password, user.password)
        : password === user.Password;
      if (match) {
        const updateObject = {
          id: user.id,
          LastUpdated: new Date(),
        };
        await User.update(updateObject, { where: { id: user.id } });
        const roles = user.UserRoles.map((ur) => {
          return ur.Role;
        });
        const menus = roles.map((r) => r.RoleMenus.map((rm) => rm.Menu));
        let myMenus = [];
        menus.forEach((m) => {
          myMenus = myMenus.concat(m);
        });
        myMenus = myMenus.filter(
          (v, i, s) => s.findIndex((v2) => v2.id === v.id) === i
        );
        const myUser = {
          id: user.id,
          userName: user.UserName,
          userStatus: user.UserStatus,
          roles: roles.map((r) => r.Name),
        };
        const token = jwt.sign(myUser, process.env.JWT_SECRET, {
          algorithm: 'HS256',
        });

        const expiresIn = dayjs().add(7, 'days').toDate();
        res.cookie('api-auth', token, {
          secure: false,
          httpOnly: true,
          expires: expiresIn,
        });
        const menuEncrypted = myCrypto.encrypt(JSON.stringify(myMenus));
        res.status(200).json({
          avatar: user.Avatar,
          userName: user.UserName,
          wallet: user.Wallet,
          token: menuEncrypted,
          expiresIn,
        });
      } else {
        res.status(400).json({ message: 'Invalid password' });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post(
  '/auth/logout',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id } = req.user;
      const authToken = req.cookies['api-auth'];
      const redisUserRecord = await client.get(String(id));
      console.log('Record: ', redisUserRecord);
      if (redisUserRecord) {
        const parsedData = JSON.parse(redisUserRecord);
        parsedData[String(id)].push(authToken);
        client.setEx(String(id), 7 * 24 * 60 * 60, JSON.stringify(parsedData));
        res.clearCookie('api-auth');
        res.status(200).json({ message: 'Logged out' });
      } else {
        const blackListedData = {
          [String(id)]: [authToken],
        };
        client.setEx(
          String(id),
          7 * 24 * 60 * 60,
          JSON.stringify(blackListedData)
        );
        res.clearCookie('api-auth');
        res.status(200).json({ message: 'Logged out' });
      }
    } catch (e) {
      logger.error('Error: ', JSON.stringify(e));
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

module.exports = router;
