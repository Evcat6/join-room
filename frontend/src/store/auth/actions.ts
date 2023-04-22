import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKey } from '@/common/enums/storage-key.enum';
import {
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from '@/common/types/types';

import { type AsyncThunkConfig } from '../store';
import { ActionTypes } from './common';

const signUp = createAsyncThunk<
  Promise<void>,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(ActionTypes.SIGN_UP, async (payload, { extra: { services } }) => {
  const { authApi, notification, storage } = services;

  const { token } = await authApi.signUp(payload);

  storage.set(StorageKey.TOKEN, token);

  notification.success('You are successfully signed up');
});

const signIn = createAsyncThunk<
  Promise<void>,
  UserSignInRequestDto,
  AsyncThunkConfig
>(ActionTypes.SIGN_UP, async (payload, { extra: { services } }) => {
  const { authApi, notification, storage } = services;

  const { token } = await authApi.signIn(payload);

  storage.set(StorageKey.TOKEN, token);

  notification.success('You are successfully authorized');
});

export { signIn, signUp };
