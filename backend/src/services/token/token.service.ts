// eslint-disable-next-line no-restricted-syntax
import type Jwt from 'jsonwebtoken';
import { type JwtPayload } from 'jsonwebtoken';

import { type config as Config } from '@/common/config/config';

class Token {
  private jwt: typeof Jwt;
  private config: typeof Config;

  public constructor(jwt: typeof Jwt, config: typeof Config) {
    this.jwt = jwt;
    this.config = config;
  }

  public createToken(data: string | object | Buffer): string {
    return this.jwt.sign(data, this.config.JWT.SECRET);
  }

  public verifyToken(token: string): string | JwtPayload {
    return this.jwt.verify(token, this.config.JWT.SECRET);
  }
}

export { Token };
