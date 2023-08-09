import { type Application } from 'express';

import { ApiPath } from '@/common/enums/enums.js';
import { logger } from '@/common/logger/logger.js';
import { type ApiRoute } from '@/common/types/types.js';

import { router as authRouter } from './auth.api.js';
import { router as chatMessagesRouter } from './chat-messages.api.js';
import { router as userChatsRouter } from './user-chats.api.js';
import { router as usersRouter } from './users.api.js';

const routes: ApiRoute[] = [
  { path: ApiPath.USERS, router: usersRouter },
  { path: ApiPath.AUTH, router: authRouter },
  { path: ApiPath.USER_CHATS, router: userChatsRouter },
  { path: ApiPath.CHAT_MESSAGES, router: chatMessagesRouter },
];

const registerRoutes = (app: Application, prefix = '/api'): void => {
  for (const route of routes) {
    app.use(`${prefix}${route.path}`, route.router);
    for (const subRoute of route.router.stack) {
      logger.info(
        `${Object.keys(subRoute.route.methods)
          .toString()
          .toUpperCase()} ${prefix}${route.path}${
          subRoute.route.path
        } route registered`
      );
    }
  }
};

export { registerRoutes };
