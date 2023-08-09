type UserChatGetResponseDto = {
  id: string;
  chatAdminId: string;
  chatAvatarUrl?: string | undefined;
  name: string;
  description?: string | undefined;
  defaultBackgroundColor: string;
};

export { type UserChatGetResponseDto };
