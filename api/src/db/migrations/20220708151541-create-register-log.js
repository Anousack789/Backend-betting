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
        type: Sequelize.STRING,
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
      CreatedAt: {
        type: Sequelize.DATE,
      },
      UpdatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RegisterLogs');
  },
};
