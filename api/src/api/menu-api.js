const passport = require('passport');
const { sequelize } = require('../utils/database');
const Menu = require('../db/models/menu')(sequelize);
const RoleMenu = require('../db/models/rolemenu')(sequelize);
const Role = require('../db/models/role')(sequelize);
Role.hasMany(RoleMenu, { foreignKey: 'RoleId' });
Menu.hasMany(RoleMenu, { foreignKey: 'MenuId' });
RoleMenu.belongsTo(Role, { foreignKey: 'RoleId' });
RoleMenu.belongsTo(Menu, { foreignKey: 'MenuId' });

const router = require('express').Router();
router.use('/menu', passport.authenticate('jwt', { session: false }));
router.get('/menu', async (req, res) => {
  const user = req.user;
  if (user.roles.include('Admin')) {
    try {
      const menus = Menu.findAll({
        include: [
          {
            model: RoleMenu,
            include: [
              {
                model: Role,
              },
            ],
          },
        ],
      });
      menus.forEach((m) => {
        m.Roles = m.RoleMenus.map((rm) => rm.Role);
        m.RoleMenus = undefined;
      });
      res.status(200).json(menus);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(401).send('Unauthorized');
  }
});
module.exports = router;
