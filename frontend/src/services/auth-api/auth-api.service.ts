import { AuthApiPath, HttpMethod } from '@/common/enums/enums';
import {
  type CurrentUserLoadResponseDto,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '@/common/types/types';
import { AbstractApi } from '@/services/abstract-api/abstract-api.service';

import { type Http } from '../http/http.service';

class AuthApi extends AbstractApi {
  public constructor(baseUrl: string, path: string, http: Http) {
    super(baseUrl, path, http);
  }

  public async signUp(
    payload: UserSignUpRequestDto
  ): Promise<UserSignUpResponseDto> {
    const response = await this.http.load(
      `${this.baseUrl}${this.path}${AuthApiPath.SIGN_UP}`,
      {
        method: HttpMethod.POST,
        hasAuth: false,
        payload: JSON.stringify(payload),
      }
    );

    return await response.json<UserSignUpResponseDto>();
  }

  public async signIn(
    payload: UserSignInRequestDto
  ): Promise<UserSignInResponseDto> {
    const response = await this.http.load(
      `${this.baseUrl}${this.path}${AuthApiPath.SIGN_IN}`,
      {
        method: HttpMethod.POST,
        hasAuth: false,
        payload: JSON.stringify(payload),
      }
    );

    return await response.json<UserSignInResponseDto>();
  }

  public async load(): Promise<CurrentUserLoadResponseDto> {
    const response = await this.http.load(
      `${this.baseUrl}${this.path}${AuthApiPath.USER}`,
      {
        method: HttpMethod.GET,
        hasAuth: true,
      }
    );

    return await response.json<CurrentUserLoadResponseDto>();
  }
}

export { AuthApi };
