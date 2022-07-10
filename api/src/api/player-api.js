const express = require('express');
const { sequelize } = require('../utils/database');
const router = express.Router();
const User = require('../db/models/user')(sequelize);
const UserRole = require('../db/models/userrole')(sequelize);
const Role = require('../db/models/role')(sequelize);

User.hasMany(UserRole, { foreignKey: 'userId' });
Role.hasMany(UserRole, { foreignKey: 'roleId' });
UserRole.belongsTo(User, { foreignKey: 'userId' });
UserRole.belongsTo(Role, { foreignKey: 'roleId' });

router.get('/profile', (req, res) => {
  if (!req.user) res.status(400).send('Not logged in');
  User.findOne({
    where: {
      id: req.user.id,
    },
    include: [
      {
        model: UserRole,
        include: [{ model: Role }],
      },
    ],
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
router.put('/profile', (req, res) => {});
router.post('/register', (req, res) => {});

module.exports = router;
