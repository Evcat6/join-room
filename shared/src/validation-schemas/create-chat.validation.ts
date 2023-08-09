import joi from 'joi';

import { UserChatValidationMessage } from '@/enums/user-chats-validation-message.enum.js';

import { type UserChatCreateRequestDto } from '../types/types.js';

const createChat = joi.object<UserChatCreateRequestDto, true>({
  chatAvatarUrl: joi.string().empty(''),
  name: joi.string().required().messages({
    'string.empty': UserChatValidationMessage.EMPTY_NAME,
  }),
  description: joi.string().empty(''),
});

export { createChat };
