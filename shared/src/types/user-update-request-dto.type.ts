type UserUpdateRequestDto = {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber?: string;
  birth?: string;
  avatarUrl?: string;
};

export { type UserUpdateRequestDto };
