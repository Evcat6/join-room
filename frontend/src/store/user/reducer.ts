import { createReducer, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '@/common/enums/data-status.enum';
import { type CurrentUserLoadResponseDto } from '@/common/types/types';

import { load, signIn, signUp, update } from './actions';

type InitialState = {
  dataStatus: DataStatus;
  isUserLoaded: boolean;
  user: CurrentUserLoadResponseDto;
};

const initialState: InitialState = {
  dataStatus: DataStatus.IDLE,
  isUserLoaded: false,
  user: {
    id: '',
    email: '',
    firstName: undefined,
    lastName: undefined,
    userName: '',
    phoneNumber: null,
    birth: null,
    avatarUrl: null,
    isFullyRegistered: false,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addMatcher(
    isAnyOf(load.fulfilled, update.fulfilled),
    (state, action) => {
      state.user = action.payload;
      state.isUserLoaded = true;
    }
  );

  builder.addMatcher(
    isAnyOf(signUp.pending, signIn.pending, load.pending, update.pending),
    (state) => {
      state.dataStatus = DataStatus.PENDING;
    }
  );

  builder.addMatcher(
    isAnyOf(
      signUp.fulfilled,
      signIn.fulfilled,
      load.fulfilled,
      update.fulfilled
    ),
    (state) => {
      state.dataStatus = DataStatus.FULFILLED;
    }
  );

  builder.addMatcher(
    isAnyOf(signUp.rejected, signIn.rejected, load.rejected, update.rejected),
    (state) => {
      state.dataStatus = DataStatus.REJECTED;
    }
  );
});

export { reducer };
