import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  type ChatMessageCreateRequestDto,
  type ChatMessageGetResponseDto,
} from '@/common/types/types';

import { type AsyncThunkConfig } from '../store';
import { ActionTypes } from './common';

const loadMessages = createAsyncThunk<
  ChatMessageGetResponseDto[],
  { roomId: string },
  AsyncThunkConfig
>(
  ActionTypes.LOAD_ALL_MESSAGES,
  async ({ roomId }, { extra: { services } }) => {
    const { chatMessagesApi } = services;
    return await chatMessagesApi.loadAll(roomId);
  }
);

const createMessage = createAsyncThunk<
  ChatMessageGetResponseDto,
  ChatMessageCreateRequestDto,
  AsyncThunkConfig
>(ActionTypes.CREATE_MESSAGE, async (payload, { extra: { services } }) => {
  const { chatMessagesApi } = services;
  return await chatMessagesApi.create(payload);
});

const addNewMessage = createAsyncThunk<
  ChatMessageGetResponseDto,
  ChatMessageGetResponseDto,
  AsyncThunkConfig
>(ActionTypes.ADD_NEW_MESSAGE, (payload) => {
  return payload;
});

export { addNewMessage, createMessage, loadMessages };
