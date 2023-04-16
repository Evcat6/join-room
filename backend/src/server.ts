import express from 'express';

import { App } from './app';
import { config } from './common/config/config';
import { logger } from './common/logger/logger';

const app = express();

const server = new App({ app, config, logger });

server.start();
