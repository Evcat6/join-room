import { combineReducers } from '@reduxjs/toolkit';

import { reducer as chatMessages } from './chat-messages/reducer';
import { reducer as user } from './user/reducer';
import { reducer as userChats } from './user-chats/reducer';

const rootReducer = combineReducers({ user, userChats, chatMessages });

export { rootReducer };
