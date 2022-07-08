'use strict';
const config = require('./config');

module.exports = {
  development: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    host: config.db.host,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: false,
      },
    },
  },
  test: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    host: config.db.host,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: false,
      },
    },
  },
  production: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    host: config.db.host,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: false,
      },
    },
  },
};
