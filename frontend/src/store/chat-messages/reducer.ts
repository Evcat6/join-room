import { createReducer, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '@/common/enums/enums';
import { type ChatMessageGetResponseDto } from '@/common/types/types';

import { createMessage, loadMessages } from './actions';

type InitialState = {
  dataStatus: DataStatus;
  messages: ChatMessageGetResponseDto[];
};

const initialState: InitialState = {
  dataStatus: DataStatus.IDLE,
  messages: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadMessages.fulfilled, (state, action) => {
    state.messages = action.payload;
  });

  builder.addMatcher(
    isAnyOf(createMessage.pending, loadMessages.pending),
    (state) => {
      state.dataStatus = DataStatus.PENDING;
    }
  );

  builder.addMatcher(
    isAnyOf(createMessage.fulfilled, loadMessages.fulfilled),
    (state) => {
      state.dataStatus = DataStatus.FULFILLED;
    }
  );

  builder.addMatcher(
    isAnyOf(createMessage.rejected, loadMessages.rejected),
    (state) => {
      state.dataStatus = DataStatus.REJECTED;
    }
  );
});

export { reducer };
