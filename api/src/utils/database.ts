import { Sequelize } from 'sequelize';
import config from '../../config';
import logger from './logger';
const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: 'mssql',
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
export default sequelize;
