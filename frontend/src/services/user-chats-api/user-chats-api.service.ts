import { HttpMethod, UserChatsApiPath } from '@/common/enums/enums';
import {
  type UserChatCreateRequestDto,
  type UserChatCreateResponseDto,
  type UserChatGetResponseDto,
} from '@/common/types/types';
import { AbstractApi } from '@/services/abstract-api/abstract-api.service';

import { type Http } from '../http/http.service';

class UserChatsApi extends AbstractApi {
  public constructor(baseUrl: string, path: string, http: Http) {
    super(baseUrl, path, http);
  }

  public async create(
    payload: UserChatCreateRequestDto
  ): Promise<UserChatCreateResponseDto> {
    const response = await this.http.load(
      `${this.baseUrl}${this.path}${UserChatsApiPath.INDEX}`,
      {
        method: HttpMethod.POST,
        hasAuth: true,
        payload: JSON.stringify(payload),
      }
    );

    return response.json<UserChatCreateResponseDto>();
  }

  public async getAll(): Promise<UserChatGetResponseDto[]> {
    const response = await this.http.load(
      `${this.baseUrl}${this.path}${UserChatsApiPath.INDEX}`,
      {
        method: HttpMethod.GET,
        hasAuth: true,
      }
    );

    return response.json<UserChatGetResponseDto[]>();
  }

  public async getOne(chatId: string): Promise<UserChatGetResponseDto> {
    const response = await this.http.load(
      `${this.baseUrl}${this.path}/${chatId}`,
      {
        method: HttpMethod.GET,
        hasAuth: true,
      }
    );
    return response.json<UserChatGetResponseDto>();
  }

  public async joinOne(chatId: string): Promise<UserChatGetResponseDto> {
    const response = await this.http.load(
      `${this.baseUrl}${this.path}/${chatId}`,
      {
        method: HttpMethod.POST,
        hasAuth: true,
      }
    );

    return response.json<UserChatGetResponseDto>();
  }
}

export { UserChatsApi };
