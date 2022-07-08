'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.STRING,
      },
      UserName: {
        type: Sequelize.STRING,
      },
      Password: {
        type: Sequelize.STRING,
      },
      HashPass: {
        type: Sequelize.BOOLEAN,
      },
      Avatar: {
        type: Sequelize.STRING,
      },
      Wallet: {
        type: Sequelize.DOUBLE,
      },
      BonusCredit: {
        type: Sequelize.DOUBLE,
      },
      Email: {
        type: Sequelize.STRING,
      },
      ContactNo: {
        type: Sequelize.STRING,
      },
      WithdrawalDetails: {
        type: Sequelize.STRING,
      },
      UserStatus: {
        type: Sequelize.INTEGER,
      },
      DateOfRegistration: {
        type: Sequelize.DATE,
      },
      LastUpdated: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
