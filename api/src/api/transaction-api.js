'use strict';
const router = require('express').Router();
const passport = require('passport');
const { sequelize } = require('../utils/database');
const Transaction = require('../db/models/transaction')(sequelize);
const User = require('../db/models/user')(sequelize);
User.hasMany(Transaction, { foreignKey: 'UserId' });
Transaction.belongsTo(User, { foreignKey: 'UserId' });

router.use('/transactions', passport.authenticate('jwt', { session: false }));
router.get('/transactions', async (req, res) => {
  const user = req.user;
  if (user) {
    console.log(user.roles);
    const transactions = await Transaction.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json(transactions);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
});

module.exports = router;
