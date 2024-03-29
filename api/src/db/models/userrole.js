'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
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
