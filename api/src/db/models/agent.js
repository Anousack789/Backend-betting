'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agent extends Model {}
  Agent.init(
    {
      UserId: DataTypes.INTEGER,
      AgentType: DataTypes.INTEGER,
      ParentId: DataTypes.INTEGER,
      Status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Agent',
    }
  );
  return Agent;
};
