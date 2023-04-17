import express from 'express';

import { App } from './app.js';
import { config } from './common/config/config.js';
import { logger } from './common/logger/logger.js';

const app = express();

const server = new App({ app, config, logger });

server.start();
