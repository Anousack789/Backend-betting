'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('UserRoles', {
      fields: ['UserId'],
      type: 'FOREIGN KEY',
      name: 'FK_UserRoles_UserId',
      references: {
        table: 'Users',
        field: 'id',
      },
    });
    await queryInterface.addConstraint('UserRoles', {
      fields: ['RoleId'],
      type: 'FOREIGN KEY',
      name: 'FK_UserRoles_RoleId',
      references: {
        table: 'Roles',
        field: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('UserRoles', 'FK_UserRoles_UserId');
    await queryInterface.removeConstraint('UserRoles', 'FK_UserRoles_RoleId');
  },
};
