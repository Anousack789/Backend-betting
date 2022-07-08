'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RegisterLog extends Model {}
  RegisterLog.init(
    {
      Token: DataTypes.STRING,
      RegisterType: DataTypes.INTEGER,
      ProviderId: DataTypes.INTEGER,
      ReceiverId: DataTypes.INTEGER,
      CreatedAt: DataTypes.DATE,
      UpdatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'RegisterLog',
    }
  );
  return RegisterLog;
};
