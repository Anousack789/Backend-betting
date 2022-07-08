'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.STRING
      },
      Name: {
        type: Sequelize.STRING
      },
      Avatar: {
        type: Sequelize.STRING
      },
      Wallet: {
        type: Sequelize.DOUBLE
      },
      BonusCredit: {
        type: Sequelize.DOUBLE
      },
      Email: {
        type: Sequelize.STRING
      },
      ContactNo: {
        type: Sequelize.STRING
      },
      WithdrawalDetails: {
        type: Sequelize.STRING
      },
      DateOfRegistration: {
        type: Sequelize.DATE
      },
      LastUpdated: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Users');
  }
};