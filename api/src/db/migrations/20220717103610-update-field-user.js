'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'FirstName', Sequelize.STRING);
    await queryInterface.addColumn('Users', 'LastName', Sequelize.STRING);
    await queryInterface.addColumn('Users', 'BirthDate', Sequelize.DATE);
    await queryInterface.addColumn('Users', 'Gender', Sequelize.INTEGER);
    await queryInterface.addColumn('Users', 'BankName', Sequelize.STRING);
    await queryInterface.addColumn('Users', 'BankAccount', Sequelize.STRING);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'FirstName');
    await queryInterface.removeColumn('Users', 'LastName');
    await queryInterface.removeColumn('Users', 'BirthDate');
    await queryInterface.removeColumn('Users', 'Gender');
    await queryInterface.removeColumn('Users', 'BankName');
    await queryInterface.removeColumn('Users', 'BankAccount');
  },
};
