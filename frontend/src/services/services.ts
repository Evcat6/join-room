import { toast } from 'react-toastify';

import { config } from '@/common/config/config';
import { ApiPath } from '@/common/enums/enums';

import { AuthApi } from './auth-api/auth-api.service';
import { Http } from './http/http.service';
import { Notification } from './notification/notification.service';
import { Storage } from './storage/storage.service';

const API_URL = `${config.API_URL}${config.ORIGIN_PATH}`;

const storageService = new Storage(localStorage);
const httpService = new Http(storageService);
const notificationService = new Notification(toast);
const authApi = new AuthApi(API_URL, ApiPath.AUTH, httpService);

export { authApi, httpService, notificationService, storageService };
