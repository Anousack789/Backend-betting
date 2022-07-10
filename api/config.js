'use strict';
const assert = require('assert');
const dotenv = require('dotenv');
dotenv.config();
const {
  PORT,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  JWT_SECRET,
  SERVER_KEY,
  SOCKET_TOKEN_KEY,
  IV,
} = process.env;

assert(PORT, 'PORT is required');
assert(DB_HOST, 'DB_HOST is required');
assert(DB_USERNAME, 'DB_USERNAME is required');
assert(DB_PASSWORD, 'DB_PASSWORD is required');
assert(DB_NAME, 'DB_NAME is required');
assert(JWT_SECRET, 'JWT_SECRET is required');
assert(SERVER_KEY, 'SERVER_KEY is required');
assert(SOCKET_TOKEN_KEY, 'SOCKET_TOKEN_KEY is required');
assert(IV, 'IV is required');

module.exports = {
  port: PORT,
  db: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
  },
  jwt: {
    secret: JWT_SECRET,
  },
  serverKey: SERVER_KEY,
  iv: IV,
  socketTokenKey: SOCKET_TOKEN_KEY,
};
