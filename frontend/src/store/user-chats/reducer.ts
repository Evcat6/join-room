import { createReducer, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '@/common/enums/data-status.enum';
import { type UserChatGetResponseDto } from '@/common/types/types';

import {
  createChat,
  getAllChats,
  getChatById,
  joinOneUserChatById,
} from './actions';

type InitialState = {
  dataStatus: DataStatus;
  chats: UserChatGetResponseDto[];
  chat: UserChatGetResponseDto;
  isChatOpened: boolean;
};

const initialState: InitialState = {
  dataStatus: DataStatus.IDLE,
  chats: [],
  chat: {
    id: '',
    chatAdminId: '',
    chatAvatarUrl: undefined,
    name: '',
    defaultBackgroundColor: '',
  },
  isChatOpened: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getAllChats.fulfilled, (state, action) => {
    state.chats = action.payload;
  });

  builder.addCase(getChatById.fulfilled, (state, action) => {
    state.isChatOpened = true;
    state.chat = action.payload;
  });

  builder.addCase(getChatById.pending, (state) => {
    state.isChatOpened = false;
  });

  builder.addMatcher(
    isAnyOf(createChat.fulfilled, joinOneUserChatById.fulfilled),
    (state, action) => {
      state.chats.push(action.payload);
    }
  );

  builder.addMatcher(
    isAnyOf(
      createChat.fulfilled,
      getAllChats.fulfilled,
      getChatById.fulfilled,
      joinOneUserChatById.fulfilled
    ),
    (state) => {
      state.dataStatus = DataStatus.FULFILLED;
    }
  );

  builder.addMatcher(
    isAnyOf(
      createChat.pending,
      getAllChats.pending,
      getChatById.pending,
      joinOneUserChatById.pending
    ),
    (state) => {
      state.dataStatus = DataStatus.PENDING;
    }
  );

  builder.addMatcher(
    isAnyOf(
      createChat.rejected,
      getAllChats.rejected,
      getChatById.rejected,
      joinOneUserChatById.rejected
    ),
    (state) => {
      state.dataStatus = DataStatus.REJECTED;
    }
  );
});

export { reducer };
