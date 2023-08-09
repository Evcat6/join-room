import { combineReducers } from '@reduxjs/toolkit';

import { reducer as auth } from './auth/reducer';
import { reducer as chatMessages } from './chat-messages/reducer';
import { reducer as userChats } from './user-chats/reducer';

const rootReducer = combineReducers({ auth, userChats, chatMessages });

export { rootReducer };
