import joi from 'joi';

import { UserValidationMessage } from '@/enums/enums.js';

import { type UserSignInRequestDto } from '../types/types.js';

const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const signIn = joi.object<UserSignInRequestDto, true>({
  email: joi.string().pattern(emailRegExp).required().messages({
    'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    'string.pattern.base': UserValidationMessage.EMAIL_WRONG,
  }),
  password: joi.string().trim().min(8).max(20).required().messages({
    'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
    'string.min': UserValidationMessage.PASSWORD_MIN,
    'string.max': UserValidationMessage.PASSWORD_MAX,
  }),
});

export { signIn };
