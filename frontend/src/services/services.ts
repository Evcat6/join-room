import { toast } from 'react-toastify';

import { config } from '@/common/config/config';
import { ApiPath } from '@/common/enums/enums';

import { AuthApi } from './auth-api/auth-api.service';
import { ChatMessagesApi } from './chat-messages-api/chat-messages-api.service';
import { Http } from './http/http.service';
import { Notification } from './notification/notification.service';
import { Storage } from './storage/storage.service';
import { UserApi } from './user-api/user-api.service';
import { UserChatsApi } from './user-chats-api/user-chats-api.service';

const API_URL = `${config.API_URL}${config.ORIGIN_PATH}`;

const storageService = new Storage(localStorage);
const httpService = new Http(storageService);
const notificationService = new Notification(toast);
const authApi = new AuthApi(API_URL, ApiPath.AUTH, httpService);
const userChatsApi = new UserChatsApi(API_URL, ApiPath.USER_CHATS, httpService);
const userApi = new UserApi(API_URL, ApiPath.USERS, httpService);
const chatMessagesApi = new ChatMessagesApi(
  API_URL,
  ApiPath.CHAT_MESSAGES,
  httpService
);

export {
  authApi,
  chatMessagesApi,
  httpService,
  notificationService,
  storageService,
  userApi,
  userChatsApi,
};
