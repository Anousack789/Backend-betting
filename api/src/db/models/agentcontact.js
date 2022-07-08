'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AgentContact extends Model {}
  AgentContact.init(
    {
      AgentId: DataTypes.INTEGER,
      DepositCommission: DataTypes.DOUBLE,
      DepositType: DataTypes.INTEGER,
      WithdrawalCommission: DataTypes.DOUBLE,
      WithdrawalType: DataTypes.INTEGER,
      RecruitCommission: DataTypes.DOUBLE,
      RecruitType: DataTypes.INTEGER,
      DateCreated: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'AgentContact',
    }
  );
  return AgentContact;
};