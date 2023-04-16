import { config } from './src/common/config/config';

const { NAME, PASSWORD, HOST, USER, PORT } = config.DB;

module.exports = {
  client: 'pg',
  connection: {
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: NAME,
    port: PORT,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: __dirname + '/src/db/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: __dirname + '/src/db/seeds',
  },
};
