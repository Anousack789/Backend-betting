'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      UserId: DataTypes.STRING,
      Name: DataTypes.STRING,
      Avatar: DataTypes.STRING,
      Wallet: DataTypes.DOUBLE,
      BonusCredit: DataTypes.DOUBLE,
      Email: DataTypes.STRING,
      ContactNo: DataTypes.STRING,
      WithdrawalDetails: DataTypes.STRING,
      DateOfRegistration: DataTypes.DATE,
      LastUpdated: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
