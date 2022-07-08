'use strict';
const express = require('express');
const router = express.Router();
const { DataTypes } = require('sequelize');
const database = require('../utils/database');
const User = require('../db/models/user')(database, DataTypes);
const UserRole = require('../db/models/userrole')(database, DataTypes);
const Role = require('../db/models/role')(database, DataTypes);

router.post('/login', (req, res) => {
  const { userName, password } = req.body;
  User.findOne({
    where: {
      UserName: userName,
      Password: password,
    },
    include: [
      {
        model: UserRole,
        include: [{ model: Role }],
      },
    ],
  })
    .then((user) => {
      if (!user) {
        res.status(400).json({ message: 'User not found' });
      } else if (user.password !== password) {
        res.status(400).json({ message: 'Invalid password' });
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
