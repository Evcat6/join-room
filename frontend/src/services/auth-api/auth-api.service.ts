import { HttpMethod } from '@/common/enums/enums';
import {
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
      `${this.baseUrl}${this.path}/sign-up`,
      {
        method: HttpMethod.POST,
        hasAuth: true,
        payload: JSON.stringify(payload),
      }
    );

    return await response.json<UserSignUpResponseDto>();
  }
}

export { AuthApi };
