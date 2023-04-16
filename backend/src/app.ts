import bodyParser from 'body-parser';
import { type Application } from 'express';
import morgan from 'morgan';
import { type Logger } from 'winston';

import { registerRoutes } from './api/api';
import { type config as Config } from './common/config/config';
import { swaggerOptions } from './common/swagger/swagger.config';
import { type AppConstructor } from './common/types/types';

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

  public start(): void {
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
