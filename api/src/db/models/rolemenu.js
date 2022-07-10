'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class RoleMenu extends Model {}
  RoleMenu.init(
    {
      RoleId: DataTypes.INTEGER,
      MenuId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'RoleMenu',
    }
  );
  return RoleMenu;
};
