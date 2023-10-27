enum UserValidationMessage {
  EMAIL_REQUIRED = 'Email is required',
  EMAIL_WRONG = 'Wrong email',
  PASSWORD_REQUIRED = 'Password is required',
  PASSWORD_MIN = 'Minimum length is 8 characters',
  PASSWORD_MAX = 'Maximum length is 20 characters',
  PASSWORDS_MATCH = 'Passwords must match',
  USER_NAME_REQUIRED = 'user name is required',
  FIRST_NAME_REQUIRED = 'first name is required',
  LAST_NAME_REQUIRED = 'last name is required',
  INVALID_PHONE_NUMBER = 'phone number is not valid',
}

export { UserValidationMessage };
