import convict from 'convict';
import { config } from 'dotenv';

import { type EnvironmentSchema } from './types/types';

config();

const configSchema = convict<EnvironmentSchema>({
  APP: {
    ENV: {
      doc: 'The application environment.',
      format: Object.values(['production', 'development', 'test']),
      default: null,
      env: 'NODE_ENV',
    },
    PORT: {
      doc: 'The port to bind the app to.',
      format: Number,
      default: null,
      env: 'PORT',
    },
  },
  DB: {
    HOST: {
      doc: 'Database host name/IP',
      format: String,
      default: null,
      env: 'DB_HOST',
    },
    USER: {
      doc: 'Database username',
      format: String,
      default: null,
      env: 'DB_USER',
    },
    PASSWORD: {
      doc: 'Database password',
      format: String,
      default: null,
      env: 'DB_PASSWORD',
    },
    NAME: {
      doc: 'Database name',
      format: String,
      default: null,
      env: 'DB_NAME',
    },
    PORT: {
      doc: 'Database port',
      format: Number,
      default: null,
      env: 'DB_PORT',
    },
  },
});

configSchema.validate({ allowed: 'strict' });

export { configSchema };
