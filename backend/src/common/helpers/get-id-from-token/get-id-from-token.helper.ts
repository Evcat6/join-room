import { tokenService } from '@/services/services.js';

type DecodedToken = {
  id: string;
};

const getIdFromToken = (token: string): DecodedToken => {
  return tokenService.verifyToken(token) as DecodedToken;
};

export { getIdFromToken };
