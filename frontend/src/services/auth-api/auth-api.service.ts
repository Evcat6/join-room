import { AuthApiPath, HttpMethod } from '@/common/enums/enums';
import {
  type UserLoadResponseDto,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '@/common/types/types';

import { type Http } from '../http/http.service';

class AuthApi {
  private baseUrl: string;

  private path: string;

  private http: Http;

  public constructor(baseUrl: string, path: string, http: Http) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.path = path;
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

    return await response.json<UserSignUpResponseDto>();
  }

  public async load(): Promise<UserLoadResponseDto> {
    const response = await this.http.load(
      `${this.baseUrl}${this.path}${AuthApiPath.USER}`,
      {
        method: HttpMethod.GET,
        hasAuth: true,
      }
    );

    return await response.json<UserLoadResponseDto>();
  }
}

export { AuthApi };
