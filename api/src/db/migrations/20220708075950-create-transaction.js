'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      TransactionRefNo: {
        type: Sequelize.STRING
      },
      Name: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      ContactNo: {
        type: Sequelize.STRING
      },
      TransactionType: {
        type: Sequelize.INTEGER
      },
      TransactionDetails: {
        type: Sequelize.STRING
      },
      Amount: {
        type: Sequelize.DOUBLE
      },
      TransactionStatus: {
        type: Sequelize.INTEGER
      },
      TransactionAttachment: {
        type: Sequelize.STRING
      },
      ProcessedBy: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Transactions');
  }
};