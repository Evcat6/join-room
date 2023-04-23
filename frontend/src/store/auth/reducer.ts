import { createReducer, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '@/common/enums/data-status.enum';
import { type UserLoadResponseDto } from '@/common/types/types';

import { loadUser, signIn, signUp } from './actions';

type InitialState = {
  dataStatus: DataStatus;
  isUserLoaded: boolean;
  user: UserLoadResponseDto;
};

const initialState: InitialState = {
  dataStatus: DataStatus.IDLE,
  isUserLoaded: false,
  user: {
    id: '',
    email: '',
    firstName: null,
    lastName: null,
    userName: '',
    phoneNumber: null,
    birth: null,
    passwordSalt: '',
    passwordHash: '',
    avatarUrl: null,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadUser.fulfilled, (state, action) => {
    state.user = action.payload;
    state.isUserLoaded = true;
  });

  builder.addMatcher(
    isAnyOf(signUp.pending, signIn.pending, loadUser.pending),
    (state) => {
      state.dataStatus = DataStatus.PENDING;
    }
  );

  builder.addMatcher(
    isAnyOf(signUp.fulfilled, signIn.fulfilled, loadUser.fulfilled),
    (state) => {
      state.dataStatus = DataStatus.FULFILLED;
    }
  );

  builder.addMatcher(
    isAnyOf(signUp.rejected, signIn.rejected, loadUser.rejected),
    (state) => {
      state.dataStatus = DataStatus.REJECTED;
    }
  );
});

export { reducer };
