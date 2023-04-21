import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { config } from '@/common/config/config';
import { AppEnvironment } from '@/common/enums/enums';

import {
  authApi,
  notificationService as notification,
  storageService as storage,
} from '../services/services';
import { handleError } from './middlewares/middlewares';
import { rootReducer } from './root-reducer';

const extraArgument = {
  services: {
    notification,
    authApi,
    storage,
  },
};

const middleware = getDefaultMiddleware({
  thunk: { extraArgument },
});

const store = configureStore({
  devTools: config.MODE !== AppEnvironment.PRODUCTION,
  reducer: rootReducer,
  middleware: middleware.concat(handleError),
});

type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: typeof extraArgument;
  rejectValue: {
    message: string;
  };
};

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export { type AppDispatch, type AsyncThunkConfig, type RootState };
export { store };
