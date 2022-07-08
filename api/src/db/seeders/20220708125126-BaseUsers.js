'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          UserId: '',
          UserName: 'admin',
          Password: 'admin@789',
          HashPass: false,
          Avatar: '',
          Wallet: 0,
          BonusCredit: 0,
          Email: 'no69station@gmail.com',
          ContactNo: '02059158789',
          WithdrawalDetails: '',
          UserStatus: 1,
          DateOfRegistration: new Date(),
          LastUpdated: new Date(),
        },
      ],
      {},
      {
        id: {
          autoIncrement: true,
        },
      }
    );
    await queryInterface.bulkInsert(
      'UserRoles',
      [
        {
          id: 1,
          UserId: 1,
          RoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
      {
        id: {
          autoIncrement: true,
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('UserRoles', null, {});
  },
};
