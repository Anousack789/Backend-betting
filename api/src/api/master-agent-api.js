'use strict';
const { sequelize } = require('../utils/database');

const passport = require('passport');

const router = require('express').Router();

const RegisterLog = require('../db/models/registerlog')(sequelize);
const User = require('../db/models/user')(sequelize);
const UserRole = require('../db/models/userrole')(sequelize);
const Role = require('../db/models/role')(sequelize);

User.hasMany(RegisterLog, { foreignKey: 'ProviderId' });
User.hasMany(RegisterLog, { foreignKey: 'ReceiverId' });
RegisterLog.belongsTo(User, { foreignKey: 'ProviderId' });
RegisterLog.belongsTo(User, { foreignKey: 'ReceiverId' });
User.hasMany(UserRole, { foreignKey: 'UserId' });
Role.hasMany(UserRole, { foreignKey: 'RoleId' });
UserRole.belongsTo(User, { foreignKey: 'UserId' });
UserRole.belongsTo(Role, { foreignKey: 'RoleId' });

router.use('/master-agents', passport.authenticate('jwt', { session: false }));
router.use('/master-agents', (req, res, next) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: 'Unauthorized' });
  if (!user.roles.includes('Admin') && !user.roles.includes('Master Agent'))
    return res.status(401).json({ message: 'Unauthorized' });
  next();
});

router.post('/master-agents/update-agent-status', async (req, res) => {
  try {
    const user = req.user;
    const agentId = req.body.agentId;
    const status = req.body.status;
    const registerLog = await RegisterLog.findOne({
      where: {
        ProviderId: user.id,
        ReceiverId: agentId,
      },
    });
    if (!registerLog)
      return res.status(400).json({ message: 'Agent not found' });
    await User.update({ Status: status }, { where: { id: agentId } });
    return res.status(200).json({ message: 'Agent status updated' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
