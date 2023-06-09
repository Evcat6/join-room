import http from 'node:http';

import bodyParser from 'body-parser';
import cors from 'cors';
import { type Application } from 'express';
import Knex from 'knex';
import methodOverride from 'method-override';
import morgan from 'morgan';
import { Model } from 'objection';
import { Server } from 'socket.io';
import { type Logger } from 'winston';

import knexConfig from '../knexfile.js';
import { registerRoutes } from './api/api.js';
import { type config as Config } from './common/config/config.js';
import {
  authorization,
  errorMiddleware,
  notFound,
} from './common/middlewares/middlewares.js';
import { swaggerOptions } from './common/swagger/swagger.config.js';
import { type AppConstructor } from './common/types/types.js';
import { socketEventsHandler } from './socket/socket.events.js';

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

    this.app.use(methodOverride());

    this.app.use(cors());

    this.app.use(authorization);

    this.app.use(
      morgan('combined', {
        stream: { write: (message) => this.logger.info(message.trim()) },
      })
    );
  }

  private initErrorHandler(): void {
    this.app.use(errorMiddleware);
  }

  private connectSocket(): void {
    this.logger.info('Connecting webSockets...');
    const server = http.createServer(this.app);
    const io: Server = new Server(server);
    socketEventsHandler(io);
  }

  private initApi(): void {
    this.logger.info('Generating API documentation...');
    swaggerOptions(this.app);

    registerRoutes(this.app, '/api');

    this.connectSocket();
  }

  private notFoundHandler(): void {
    this.app.use(notFound);
  }

  private connectDatabase(): void {
    this.logger.info('Connecting to database...');

    Model.knex(Knex(knexConfig));
  }

  public start(): void {
    this.connectDatabase();

    this.initMiddleware();

    this.initApi();

    this.initErrorHandler();

    this.notFoundHandler();

    this.app.listen(this.config.APP.PORT, () => {
      this.logger.info(
        `Application is listening on PORT - ${this.config.APP.PORT}`
      );
    });
  }
}

export { App };
