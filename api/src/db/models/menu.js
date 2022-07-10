'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class Menu extends Model {}
  Menu.init(
    {
      MenuDisplayName: DataTypes.STRING,
      MenuUrl: DataTypes.STRING,
      MenuIcon: DataTypes.STRING,
      ParentId: DataTypes.INTEGER,
      OrderIndex: DataTypes.INTEGER,
      IsViewPaged: DataTypes.BOOLEAN,
      MenuPosition: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Menu',
    }
  );
  return Menu;
};
