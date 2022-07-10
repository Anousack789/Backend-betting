'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class Transaction extends Model {}
  Transaction.init(
    {
      UserId: DataTypes.INTEGER,
      TransactionRefNo: DataTypes.STRING,
      Name: DataTypes.STRING,
      Email: DataTypes.STRING,
      ContactNo: DataTypes.STRING,
      TransactionType: DataTypes.INTEGER,
      TransactionDetails: DataTypes.STRING,
      Amount: DataTypes.DOUBLE,
      TransactionStatus: DataTypes.INTEGER,
      TransactionAttachment: DataTypes.STRING,
      ProcessedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );
  return Transaction;
};
