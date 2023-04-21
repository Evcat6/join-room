import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '@/common/types/types';

import { type AsyncThunkConfig } from '../store';
import { ActionTypes } from './common';

const signUp = createAsyncThunk<
  UserSignUpResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(
  ActionTypes.SIGN_UP,
  async (payload, { extra: { services } }): Promise<UserSignUpResponseDto> => {
    const { authApi } = services;
    return await authApi.signUp(payload);
  }
);

export { signUp };
