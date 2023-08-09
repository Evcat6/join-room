import {
  ChatMessagesModel,
  ChatModel,
  MessageModel,
  UserChatsModel,
  UserModel,
} from '@/common/models/models.js';

import { ChatRepository } from './chat.repository.js';
import { ChatMessages } from './chat-messages.repository.js';
import { UserRepository } from './user.repository.js';
import { UserChats } from './user-chats.repository.js';

const userRepository = new UserRepository(UserModel);
const chatRepository = new ChatRepository(ChatModel);
const userChatsRepository = new UserChats(UserModel, ChatModel, UserChatsModel);
const chatMessagesRepository = new ChatMessages(
  ChatModel,
  ChatMessagesModel,
  MessageModel
);

export {
  chatMessagesRepository,
  chatRepository,
  userChatsRepository,
  userRepository,
};
