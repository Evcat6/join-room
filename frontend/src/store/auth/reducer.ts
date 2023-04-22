import { createReducer, isAllOf } from '@reduxjs/toolkit';

import { DataStatus } from '@/common/enums/data-status.enum';

import { signIn, signUp } from './actions';

type InitialState = {
  dataStatus: DataStatus;
};

const initialState: InitialState = {
  dataStatus: DataStatus.IDLE,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addMatcher(isAllOf(signUp.pending, signIn.pending), (state) => {
    state.dataStatus = DataStatus.PENDING;
  });

  builder.addMatcher(isAllOf(signUp.fulfilled, signIn.fulfilled), (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });

  builder.addMatcher(isAllOf(signUp.rejected, signIn.rejected), (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
