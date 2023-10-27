import http from 'node:http';

import bodyParser from 'body-parser';
import cors from 'cors';
import {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
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
  socketInjector,
} from './common/middlewares/middlewares.js';
import { swaggerOptions } from './common/swagger/swagger.config.js';
import { type AppConstructor } from './common/types/types.js';

class App {
  private app: Application;
  private config: typeof Config;
  private logger: Logger;
  private io: Server;
  private server: http.Server;

  public constructor({ app, config, logger }: AppConstructor) {
    this.app = app;
    this.config = config;
    this.logger = logger;
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });
  }

  private initMiddleware(): void {
    this.app.use(bodyParser.json());

    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use(methodOverride());

    this.app.use(cors());

    this.app.use((request: Request, response: Response, next: NextFunction) =>
      authorization(request, response, next)
    );

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

    this.app.use(socketInjector(this.io));
  }

  private initApi(): void {
    this.logger.info('Generating API documentation...');
    swaggerOptions(this.app);

    this.connectSocket();

    registerRoutes(this.app, '/api');
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

    this.initErrorHandler();

    this.initApi();

    this.notFoundHandler();

    this.server.listen(this.config.APP.PORT, () => {
      this.logger.info(
        `Application is listening on PORT - ${this.config.APP.PORT}`
      );
    });
  }
}

export { App };
