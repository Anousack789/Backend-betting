'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class User extends Model {}
  User.init(
    {
      UserId: DataTypes.STRING,
      UserName: DataTypes.STRING,
      Password: DataTypes.STRING,
      HashPass: DataTypes.BOOLEAN,
      Avatar: DataTypes.STRING,
      Wallet: DataTypes.DOUBLE,
      BonusCredit: DataTypes.DOUBLE,
      Email: DataTypes.STRING,
      ContactNo: DataTypes.STRING,
      WithdrawalDetails: DataTypes.STRING,
      UserStatus: DataTypes.INTEGER, // 0: inactive, 1: active, 2: suspended
      FirstName: DataTypes.STRING,
      LastName: DataTypes.STRING,
      BirthDate: DataTypes.DATE,
      Gender: DataTypes.INTEGER, // 0: male, 1: female, 2: other
      BankName: DataTypes.STRING,
      BankAccount: DataTypes.STRING,
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
