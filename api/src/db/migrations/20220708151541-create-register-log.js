'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RegisterLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Token: {
        type: Sequelize.STRING(1024),
      },
      RegisterType: {
        type: Sequelize.INTEGER,
      },
      ProviderId: {
        type: Sequelize.INTEGER,
      },
      ReceiverId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RegisterLogs');
  },
};
