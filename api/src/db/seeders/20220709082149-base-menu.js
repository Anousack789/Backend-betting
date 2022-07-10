'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Menus',
      [
        {
          id: 1,
          MenuDisplayName: 'Dashboard',
          MenuUrl: '/dashboard',
          MenuIcon: 'fa fa-dashboard',
          ParentId: 0,
          OrderIndex: 1,
          IsViewPaged: true,
          MenuPosition: 1,
        },
        {
          id: 2,
          MenuDisplayName: 'Agent Management',
          MenuUrl: '/agent-management',
          MenuIcon: 'fa fa-dashboard',
          ParentId: 0,
          OrderIndex: 1,
          IsViewPaged: true,
          MenuPosition: 2,
        },
        {
          id: 3,
          MenuDisplayName: 'Player Management',
          MenuUrl: '/player-management',
          MenuIcon: 'fa fa-dashboard',
          ParentId: 0,
          OrderIndex: 1,
          IsViewPaged: true,
          MenuPosition: 3,
        },
        {
          id: 4,
          MenuDisplayName: 'Agent Contact Management',
          MenuUrl: '/agent-contact-management',
          MenuIcon: 'fa fa-dashboard',
          ParentId: 0,
          OrderIndex: 1,
          IsViewPaged: true,
          MenuPosition: 4,
        },
        {
          id: 5,
          MenuDisplayName: 'Account',
          MenuUrl: '/account',
          MenuIcon: 'fa fa-dashboard',
          ParentId: 0,
          OrderIndex: 1,
          IsViewPaged: true,
          MenuPosition: 5,
        },
        {
          id: 6,
          MenuDisplayName: 'Wallet',
          MenuUrl: '/wallet',
          MenuIcon: 'fa fa-dashboard',
          ParentId: 0,
          OrderIndex: 1,
          IsViewPaged: true,
          MenuPosition: 6,
        },
        {
          id: 7,
          MenuDisplayName: 'Register',
          MenuUrl: '/register',
          MenuIcon: 'fa fa-dashboard',
          ParentId: 0,
          OrderIndex: 1,
          IsViewPaged: true,
          MenuPosition: 7,
        },
      ].map((menu) => {
        menu.createdAt = new Date();
        menu.updatedAt = new Date();
        return menu;
      }),
      {},
      {
        id: {
          autoIncrement: true,
        },
      }
    );
    await queryInterface.bulkInsert(
      'RoleMenus',
      [
        {
          id: 1,
          RoleId: 1,
          MenuId: 1,
        },
        {
          id: 2,
          RoleId: 1,
          MenuId: 2,
        },
        {
          id: 3,
          RoleId: 1,
          MenuId: 3,
        },
        {
          id: 4,
          RoleId: 1,
          MenuId: 4,
        },
        {
          id: 5,
          RoleId: 1,
          MenuId: 5,
        },
        {
          id: 6,
          RoleId: 1,
          MenuId: 6,
        },
        {
          id: 7,
          RoleId: 1,
          MenuId: 7,
        },
      ].map((roleMenu) => {
        roleMenu.createdAt = new Date();
        roleMenu.updatedAt = new Date();
        return roleMenu;
      }),
      {},
      {
        id: {
          autoIncrement: true,
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Menus', null, {});
    await queryInterface.bulkDelete('RoleMenus', null, {});
  },
};
