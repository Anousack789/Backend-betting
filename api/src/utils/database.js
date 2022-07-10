'use strict';
const { Sequelize } = require('sequelize');
const config = require('../../config');
const logger = require('./logger');
const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: 'mssql',
    operatorsAliases: 0,
    logging: false,
    dialectOptions: {
      options: {
        encrypt: false,
      },
    },
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    logger.log('Connection to Database has been established successfuly');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
module.exports = { sequelize };
