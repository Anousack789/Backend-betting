const express = require('express');
const database = require('../utils/database');
const router = express.Router();
const { DataTypes } = require('sequelize');
const User = require('../db/models/user')(database, DataTypes);
const UserRole = require('../db/models/userrole')(database, DataTypes);
const Role = require('../db/models/role')(database, DataTypes);

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
