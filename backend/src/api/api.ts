import { type Application, type Router } from 'express';

import { ROUTES } from '../common/enums/enums';
import { logger } from '../common/logger/logger';
import { router as initRouter } from './init.api';

type Route = {
  path: string;
  router: Router;
};

const routes: Route[] = [{ path: ROUTES.INIT, router: initRouter }];

const registerRoutes = (app: Application, prefix = '/api'): void => {
  for (const route of routes) {
    app.use(`${prefix}/${route.path}`, route.router);
    logger.info(`${prefix}/${route.path} route registered`);
  }
};

export { registerRoutes };
