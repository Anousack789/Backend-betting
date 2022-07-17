'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class AgentContact extends Model {}
  AgentContact.init(
    {
      AgentId: DataTypes.INTEGER,
      DepositCommission: DataTypes.DOUBLE,
      DepositType: DataTypes.INTEGER, // 0: value, 1: percentage
      WithdrawalCommission: DataTypes.DOUBLE,
      WithdrawalType: DataTypes.INTEGER, // 0: value, 1: percentage
      RecruitCommission: DataTypes.DOUBLE,
      RecruitType: DataTypes.INTEGER, // 0: value, 1: percentage
      DateCreated: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'AgentContract',
    }
  );
  return AgentContact;
};
