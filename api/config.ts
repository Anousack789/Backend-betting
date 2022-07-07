import assert from 'assert';
import dotenv from 'dotenv';
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
} = process.env;

assert(PORT, 'PORT is required');
assert(DB_HOST, 'DB_HOST is required');
assert(DB_USERNAME, 'DB_USERNAME is required');
assert(DB_PASSWORD, 'DB_PASSWORD is required');
assert(DB_NAME, 'DB_NAME is required');
assert(JWT_SECRET, 'JWT_SECRET is required');
assert(SERVER_KEY, 'SERVER_KEY is required');
assert(SOCKET_TOKEN_KEY, 'SOCKET_TOKEN_KEY is required');

export default {
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
  socketTokenKey: SOCKET_TOKEN_KEY,
};
