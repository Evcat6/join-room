import { type Application, type Router } from 'express';

import { ROUTES } from '../common/enums/enums.js';
import { logger } from '../common/logger/logger.js';
import { router as usersRouter } from './users.api.js';

type Route = {
  path: string;
  router: Router;
};

const routes: Route[] = [{ path: ROUTES.USERS, router: usersRouter }];

const registerRoutes = (app: Application, prefix = '/api'): void => {
  for (const route of routes) {
    app.use(`${prefix}/${route.path}`, route.router);
    logger.info(`${prefix}/${route.path} route registered`);
  }
};

export { registerRoutes };
