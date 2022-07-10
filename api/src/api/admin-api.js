'use strict';
const express = require('express');
const passport = require('passport');
const router = express.Router();
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

router.use('/admin', passport.authenticate('jwt', { session: false }));
router.get('/admin/profile', async (req, res) => {
  const findUser = await User.findOne({
    where: {
      id: req.user.id,
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
  if (user) {
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
    const result = {
      id: user.id,
      userName: user.UserName,
      userStatus: user.UserStatus,
      roles: roles.map((r) => {
        return {
          id: r.id,
          name: r.Name,
        };
      }),
      menus: myMenus,
    };
    res.status(200).json(result);
  } else {
    res.status(400).json({ message: 'User not found' });
  }
});

module.exports = router;
