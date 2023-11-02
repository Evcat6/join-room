import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  type UserChatCreateRequestDto,
  type UserChatCreateResponseDto,
} from '@/common/types/types';

import { type AsyncThunkConfig } from '../store';
import { ActionTypes } from './common';

const createChat = createAsyncThunk<
  UserChatCreateResponseDto,
  UserChatCreateRequestDto,
  AsyncThunkConfig
>(ActionTypes.CREATE_CHAT, async (payload, { extra: { services } }) => {
  const { userChatsApi } = services;
  return await userChatsApi.create(payload);
});

const getAllChats = createAsyncThunk<
  UserChatCreateResponseDto[],
  undefined,
  AsyncThunkConfig
>(ActionTypes.GET_ALL_CHATS, async (_, { extra: { services } }) => {
  const { userChatsApi } = services;
  return await userChatsApi.getAll();
});

const getChatById = createAsyncThunk<
  UserChatCreateResponseDto,
  { roomId: string },
  AsyncThunkConfig
>(ActionTypes.GET_ONE_CHAT, async (payload, { extra: { services } }) => {
  const { roomId } = payload;
  const { userChatsApi } = services;
  return await userChatsApi.getOne(roomId);
});

const joinOneUserChatById = createAsyncThunk<
  UserChatCreateResponseDto,
  { roomId: string },
  AsyncThunkConfig
>(ActionTypes.JOIN_ONE_CHAT, async (payload, { extra: { services } }) => {
  const { roomId } = payload;
  const { userChatsApi } = services;
  return await userChatsApi.joinOne(roomId);
});

export { createChat, getAllChats, getChatById, joinOneUserChatById };
