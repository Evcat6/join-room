import { HttpMethod, UsersApiPath } from '@/common/enums/enums';
import {
  type CurrentUserLoadResponseDto,
  type UserUpdateRequestDto,
} from '@/common/types/types';

import { AbstractApi } from '../abstract-api/abstract-api.service';
import { type Http } from '../http/http.service';

class UserApi extends AbstractApi {
  public constructor(baseUrl: string, path: string, http: Http) {
    super(baseUrl, path, http);
  }

  public async updateOne(
    payload: UserUpdateRequestDto
  ): Promise<CurrentUserLoadResponseDto> {
    const response = await this.http.load(
      `${this.baseUrl}${this.path}${UsersApiPath.INDEX}`,
      {
        method: HttpMethod.PUT,
        hasAuth: true,
        payload: JSON.stringify(payload),
      }
    );
    return await response.json<CurrentUserLoadResponseDto>();
  }
}

export { UserApi };
