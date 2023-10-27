import joi from 'joi';

import { EMAIL_REG_EXP, PHONE_NUMBER_REGEX } from '@/constants/constants.js';
import { UserValidationMessage } from '@/enums/enums.js';

import { type UserUpdateRequestDto } from '../types/types.js';

const userUpdate = joi.object<UserUpdateRequestDto, true>({
  email: joi.string().pattern(EMAIL_REG_EXP).required().messages({
    'string.empty': UserValidationMessage.EMAIL_REQUIRED,
    'string.pattern.base': UserValidationMessage.EMAIL_WRONG,
  }),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  userName: joi.string().required(),
  phoneNumber: joi.string().pattern(PHONE_NUMBER_REGEX).empty(''),
  birth: joi.string().empty(''),
  avatarUrl: joi.string().empty(''),
});

export { userUpdate };
