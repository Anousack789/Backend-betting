'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {}
  UserRole.init(
    {
      UserId: DataTypes.INTEGER,
      RoleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserRole',
    }
  );
  return UserRole;
};