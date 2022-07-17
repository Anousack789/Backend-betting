'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class RegisterLog extends Model {}
  RegisterLog.init(
    {
      Token: DataTypes.STRING(1024),
      RegisterType: DataTypes.INTEGER, // 0: master agent, 1: agent, 2: player
      ProviderId: DataTypes.INTEGER,
      ReceiverId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'RegisterLog',
    }
  );
  return RegisterLog;
};
