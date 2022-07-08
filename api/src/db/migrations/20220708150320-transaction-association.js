'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Transactions', {
      fields: ['UserId'],
      type: 'FOREIGN KEY',
      name: 'FK_Transactions_UserId',
      references: {
        table: 'Users',
        field: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Transactions',
      'FK_Transactions_UserId'
    );
  },
};
