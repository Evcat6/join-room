import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { config } from './src/common/config/config.js';

const { NAME, PASSWORD, HOST, USER, PORT } = config.DB;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
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
    directory: path.resolve(__dirname, './src/db/migrations'),
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: path.resolve(__dirname, './src/db/seeds'),
  },
};
