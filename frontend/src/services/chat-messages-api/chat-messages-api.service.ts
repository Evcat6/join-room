import { ChatMessageApiPath, HttpMethod } from '@/common/enums/enums';
import {
  type ChatMessageCreateRequestDto,
  type ChatMessageCreateResponseDto,
} from '@/common/types/types';

import { AbstractApi } from '../abstract-api/abstract-api.service';
import { type Http } from '../http/http.service';

class ChatMessagesApi extends AbstractApi {
  public constructor(baseUrl: string, path: string, http: Http) {
    super(baseUrl, path, http);
  }

  public async create(
    payload: ChatMessageCreateRequestDto
  ): Promise<ChatMessageCreateResponseDto> {
    const response = await this.http.load(
      `${this.baseUrl}${this.path}${ChatMessageApiPath.INDEX}`,
      {
        method: HttpMethod.POST,
        hasAuth: true,
        payload: JSON.stringify(payload),
      }
    );

    return response.json<ChatMessageCreateResponseDto>();
  }

  public async loadAll(
    chatId: string
  ): Promise<ChatMessageCreateResponseDto[]> {
    const response = await this.http.load(
      `${this.baseUrl}${this.path}/${chatId}`,
      {
        method: HttpMethod.GET,
        hasAuth: true,
      }
    );

    return response.json<ChatMessageCreateResponseDto[]>();
  }
}

export { ChatMessagesApi };
