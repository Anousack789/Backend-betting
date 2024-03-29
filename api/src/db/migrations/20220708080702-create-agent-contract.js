'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AgentContracts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      AgentId: {
        type: Sequelize.INTEGER,
      },
      DepositCommission: {
        type: Sequelize.DOUBLE,
      },
      DepositType: {
        type: Sequelize.INTEGER,
      },
      WithdrawalCommission: {
        type: Sequelize.DOUBLE,
      },
      WithdrawalType: {
        type: Sequelize.INTEGER,
      },
      RecruitCommission: {
        type: Sequelize.DOUBLE,
      },
      RecruitType: {
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
    await queryInterface.dropTable('AgentContracts');
  },
};
