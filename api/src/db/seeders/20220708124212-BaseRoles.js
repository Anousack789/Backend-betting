'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          id: 1,
          Name: 'Admin',
        },
        {
          id: 2,
          Name: 'Master Agent',
        },
        {
          id: 3,
          Name: 'Agent',
        },
        {
          id: 4,
          Name: 'Player',
        },
      ].map((role) => {
        role.CreatedAt = new Date();
        role.UpdatedAt = new Date();
        return role;
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
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
