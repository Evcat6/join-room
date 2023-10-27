type CurrentUserLoadResponseDto = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  phoneNumber?: string | null;
  birth?: string | null;
  avatarUrl?: string | null;
  isFullyRegistered: boolean;
};

export { type CurrentUserLoadResponseDto };
