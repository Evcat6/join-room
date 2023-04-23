type UserLoadResponseDto = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  userName: string;
  phoneNumber: string | null;
  birth: string | null;
  passwordSalt: string;
  passwordHash: string;
  avatarUrl: string | null;
};

export { type UserLoadResponseDto };
