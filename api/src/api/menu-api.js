const passport = require('passport');
const Menu = require('../db/models/menu');
const RoleMenu = require('../db/models/rolemenu');
const Role = require('../db/models/role');
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
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(401).send('Unauthorized');
  }
});
module.exports = router;
