'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('AgentContacts', {
      fields: ['AgentId'],
      type: 'FOREIGN KEY',
      name: 'FK_AgentContacts_AgentId',
      references: {
        table: 'Users',
        field: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'AgentContacts',
      'FK_AgentContacts_AgentId'
    );
  },
};
