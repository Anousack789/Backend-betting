'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MenuDisplayName: {
        type: Sequelize.STRING
      },
      MenuUrl: {
        type: Sequelize.STRING
      },
      MenuIcon: {
        type: Sequelize.STRING
      },
      ParentId: {
        type: Sequelize.INTEGER
      },
      OrderIndex: {
        type: Sequelize.INTEGER
      },
      IsViewPaged: {
        type: Sequelize.BOOLEAN
      },
      MenuPosition: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Menus');
  }
};