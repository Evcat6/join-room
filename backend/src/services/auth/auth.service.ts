import { ExceptionMessage, HttpCode } from '@/common/enums/enums.js';
import { HttpError } from '@/common/exceptions/exceptions.js';
import {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '@/common/types/types.js';

import { type Crypt } from '../crypt/crypt.service.js';
import { type Token } from '../token/token.service.js';
import { type User } from '../user/user.service.js';

class Auth {
  private cryptService: Crypt;
  private userService: User;
  private tokenService: Token;

  public constructor(
    cryptService: Crypt,
    userService: User,
    tokenService: Token
  ) {
    this.cryptService = cryptService;
    this.userService = userService;
    this.tokenService = tokenService;
  }

  public async signUp(
    userRequestDto: UserSignUpRequestDto
  ): Promise<UserSignUpResponseDto | undefined> {
    const isVerifyUser = await this.verifySignUpCredentials(userRequestDto);
    if (isVerifyUser) {
      const newUser = await this.userService.create(userRequestDto);
      const { id } = newUser.toObject();
      const token = this.tokenService.createToken({ id });
      return {
        token,
      };
    }
  }

  private async verifySignUpCredentials(
    requestUser: UserSignUpRequestDto
  ): Promise<boolean> {
    const { email } = requestUser;
    const user = await this.userService.findByEmail(email);
    if (user) {
      throw new HttpError({
        message: ExceptionMessage.EMAIL_ALREADY_EXISTS,
        status: HttpCode.BAD_REQUEST,
      });
    }
    return true;
  }
}

export { Auth };
