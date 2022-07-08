'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('RegisterLogs', {
      fields: ['ProviderId'],
      type: 'FOREIGN KEY',
      name: 'FK_RegisterLogs_ProviderId',
      references: {
        table: 'Users',
        field: 'id',
      },
    });
    await queryInterface.addConstraint('RegisterLogs', {
      fields: ['ReceiverId'],
      type: 'FOREIGN KEY',
      name: 'FK_RegisterLogs_ReceiverId',
      references: {
        table: 'Users',
        field: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'RegisterLogs',
      'FK_RegisterLogs_ProviderId'
    );
    await queryInterface.removeConstraint(
      'RegisterLogs',
      'FK_RegisterLogs_ReceiverId'
    );
  },
};
