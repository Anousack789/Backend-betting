'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('AgentContracts', {
      fields: ['AgentId'],
      type: 'FOREIGN KEY',
      name: 'FK_AgentContracts_AgentId',
      references: {
        table: 'Users',
        field: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'AgentContracts',
      'FK_AgentContracts_AgentId'
    );
  },
};
