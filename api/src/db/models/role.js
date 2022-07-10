'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class Role extends Model {}
  Role.init(
    {
      Name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Role',
    }
  );
  return Role;
};
