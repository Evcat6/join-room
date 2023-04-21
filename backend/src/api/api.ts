import { type Application } from 'express';

import { ApiRoutes } from '@/common/enums/enums.js';
import { logger } from '@/common/logger/logger.js';
import { type ApiRoute } from '@/common/types/types.js';

import { router as authRouter } from './auth.api.js';
import { router as usersRouter } from './users.api.js';

const routes: ApiRoute[] = [
  { path: ApiRoutes.USERS, router: usersRouter },
  { path: ApiRoutes.AUTH, router: authRouter },
];

const registerRoutes = (app: Application, prefix = '/api'): void => {
  for (const route of routes) {
    app.use(`${prefix}${route.path}`, route.router);
    logger.info(`${prefix}${route.path} route registered`);
    for (const subRoute of route.router.stack) {
      logger.info(
        `${prefix}${route.path}${subRoute.route.path} route registered`
      );
    }
  }
};

export { registerRoutes };
