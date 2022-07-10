'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('RoleMenus', {
      fields: ['RoleId'],
      type: 'FOREIGN KEY',
      name: 'FK_RoleMenus_RoleId',
      references: {
        table: 'Roles',
        field: 'id',
      },
    });
    await queryInterface.addConstraint('RoleMenus', {
      fields: ['MenuId'],
      type: 'FOREIGN KEY',
      name: 'FK_RoleMenus_MenuId',
      references: {
        table: 'Menus',
        field: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('RoleMenus', 'FK_RoleMenus_RoleId');
    await queryInterface.removeConstraint('RoleMenus', 'FK_RoleMenus_MenuId');
  },
};
