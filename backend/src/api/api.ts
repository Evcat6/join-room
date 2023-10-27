import { type Application } from 'express';

import {
  RESET_COLOR,
  YELLOW_COLOR,
} from '@/common/constants/console-colors.constant.js';
import { ApiPath } from '@/common/enums/enums.js';
import { logger } from '@/common/logger/logger.js';
import { type ApiRoute } from '@/common/types/types.js';

import { router as authRouter } from './auth.api.js';
import { router as chatMessagesRouter } from './chat-messages.api.js';
import { router as usersRouter } from './user.api.js';
import { router as userChatsRouter } from './user-chats.api.js';

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
      const routeMethodsStringed = Object.keys(subRoute.route.methods)
        .toString()
        .toUpperCase();
      const loggerMessage = `${RESET_COLOR}${YELLOW_COLOR}[${routeMethodsStringed}]${YELLOW_COLOR} ${YELLOW_COLOR}:${prefix}${route.path}${subRoute.route.path}${YELLOW_COLOR} route registered${RESET_COLOR}`;
      logger.info(loggerMessage);
    }
  }
};

export { registerRoutes };
