import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKey } from '@/common/enums/storage-key.enum';
import {
  type CurrentUserLoadResponseDto,
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
  type UserUpdateRequestDto,
} from '@/common/types/types';

import { type AsyncThunkConfig } from '../store';
import { ActionTypes } from './common';

const signUp = createAsyncThunk<
  Promise<void>,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(ActionTypes.SIGN_UP, async (payload, { dispatch, extra: { services } }) => {
  const { authApi, notification, storage } = services;

  const { token } = await authApi.signUp(payload);

  storage.set(StorageKey.TOKEN, token);

  notification.success('You are successfully signed up');
  await dispatch(load());
});

const signIn = createAsyncThunk<
  Promise<void>,
  UserSignInRequestDto,
  AsyncThunkConfig
>(ActionTypes.SIGN_IN, async (payload, { dispatch, extra: { services } }) => {
  const { authApi, notification, storage } = services;

  const { token } = await authApi.signIn(payload);

  storage.set(StorageKey.TOKEN, token);

  notification.success('You are successfully authorized');
  await dispatch(load());
});

const load = createAsyncThunk<
  CurrentUserLoadResponseDto,
  undefined,
  AsyncThunkConfig
>(ActionTypes.LOAD, async (_, { extra: { services } }) => {
  const { authApi } = services;
  return await authApi.load();
});

const update = createAsyncThunk<
  CurrentUserLoadResponseDto,
  UserUpdateRequestDto,
  AsyncThunkConfig
>(ActionTypes.UPDATE, async (payload, { extra: { services } }) => {
  const { userApi, notification } = services;
  const user = await userApi.updateOne(payload);
  notification.success('data update successfully');
  return user;
});

export { load, signIn, signUp, update };
