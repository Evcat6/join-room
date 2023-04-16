// eslint-disable-next-line no-restricted-syntax
import type convict from 'convict';

type EnvironmentSchema = {
  APP: {
    ENV: convict.SchemaObj<['production', 'development', 'test']>;
    PORT: number;
  };
  DB: {
    HOST: string;
    USER: string;
    PASSWORD: string;
    NAME: string;
    PORT: number;
  };
};

export { type EnvironmentSchema };
