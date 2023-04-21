import { type Application } from 'express';
import { type Logger } from 'winston';

import { type config } from '../config/config';

type AppConstructor = {
  app: Application;
  config: typeof config;
  logger: Logger;
};

export { type AppConstructor };
