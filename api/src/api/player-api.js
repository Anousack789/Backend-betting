const express = require('express');
const passport = require('passport');
const { sequelize } = require('../utils/database');
const router = express.Router();

const RegisterLog = require('../db/models/registerlog')(sequelize);
const User = require('../db/models/user')(sequelize);
const UserRole = require('../db/models/userrole')(sequelize);
const Role = require('../db/models/role')(sequelize);

User.hasMany(UserRole, { foreignKey: 'userId' });
Role.hasMany(UserRole, { foreignKey: 'roleId' });
UserRole.belongsTo(User, { foreignKey: 'userId' });
UserRole.belongsTo(Role, { foreignKey: 'roleId' });

router.use('/players', passport.authenticate('jwt', { session: false }));

router.get('/players', async (req, res) => {
  const user = req.user;
  if (user) {
    if (
      user.roles.includes('Admin') ||
      user.roles.includes('Agent') ||
      user.roles.includes('Master Agent')
    ) {
      try {
        const registerReceiver = await RegisterLog.findAll({
          where: {
            ProviderId: user.id,
            RegisterType: 2,
          },
          attributes: ['ReceiverId'],
        });
        const playerIds = registerReceiver.map((item) => item.ReceiverId);
        const players = await User.findAll({
          where: {
            id: {
              [sequelize.Op.ne]: playerIds,
            },
          },
          include: [
            {
              model: UserRole,
              include: [
                {
                  model: Role,
                },
              ],
            },
          ],
        });
        res.json(players);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
      }
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;
