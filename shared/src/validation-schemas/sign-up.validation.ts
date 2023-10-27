import joi from 'joi';

import { EMAIL_REG_EXP } from '@/constants/constants.js';
import { UserValidationMessage } from '@/enums/enums.js';

import { type UserSignUpRequestDto } from '../types/types.js';

const signUp = joi.object<UserSignUpRequestDto, true>({
  email: joi.string().pattern(EMAIL_REG_EXP).required().messages({
    'string.empty': UserValidationMessage.EMAIL_REQUIRED,
    'string.pattern.base': UserValidationMessage.EMAIL_WRONG,
  }),
  password: joi.string().trim().min(8).max(20).required().messages({
    'string.empty': UserValidationMessage.PASSWORD_REQUIRED,
    'string.min': UserValidationMessage.PASSWORD_MIN,
    'string.max': UserValidationMessage.PASSWORD_MAX,
  }),
  repeatPassword: joi.string().valid(joi.ref('password')).required().messages({
    'any.only': UserValidationMessage.PASSWORDS_MATCH,
  }),
});

export { signUp };
