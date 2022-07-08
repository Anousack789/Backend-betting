'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {}
  Player.init(
    {
      UserId: DataTypes.INTEGER,
      AgentId: DataTypes.INTEGER,
      Status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Player',
    }
  );
  return Player;
};
