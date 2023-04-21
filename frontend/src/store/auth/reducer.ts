import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '@/common/enums/data-status.enum';

import { signUp } from './actions';

type InitialState = {
  dataStatus: DataStatus;
};

const initialState: InitialState = {
  dataStatus: DataStatus.IDLE,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(signUp.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });

  builder.addCase(signUp.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });

  builder.addCase(signUp.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
