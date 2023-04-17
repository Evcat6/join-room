import bodyParser from 'body-parser';
import { type Application } from 'express';
import Knex from 'knex';
import morgan from 'morgan';
import { Model } from 'objection';
import { type Logger } from 'winston';

import knexConfig from '../knexfile.js';
import { registerRoutes } from './api/api.js';
import { type config as Config } from './common/config/config.js';
import { swaggerOptions } from './common/swagger/swagger.config.js';
import { type AppConstructor } from './common/types/types.js';

class App {
  private app: Application;
  private config: typeof Config;
  private logger: Logger;

  public constructor({ app, config, logger }: AppConstructor) {
    this.app = app;
    this.config = config;
    this.logger = logger;
  }

  private initMiddleware(): void {
    this.app.use(bodyParser.json());

    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use(
      morgan('combined', {
        stream: { write: (message) => this.logger.info(message.trim()) },
      })
    );
  }

  private initApi(): void {
    swaggerOptions(this.app);

    registerRoutes(this.app, '/api');
  }

  private connectDatabase(): void {
    this.logger.info('Connecting to database...');

    Model.knex(Knex(knexConfig));
  }

  public start(): void {
    this.connectDatabase();

    this.initMiddleware();

    this.initApi();

    this.app.listen(this.config.APP.PORT, () => {
      this.logger.info(
        `Application is listening on PORT - ${this.config.APP.PORT}`
      );
    });
  }
}

export { App };
