import { type Http } from '../http/http.service';

class AbstractApi {
  private _baseUrl: string;

  private _path: string;

  private _http: Http;

  public constructor(baseUrl: string, path: string, http: Http) {
    this._baseUrl = baseUrl;
    this._http = http;
    this._path = path;
  }

  protected get baseUrl(): string {
    return this._baseUrl;
  }

  protected get path(): string {
    return this._path;
  }

  protected get http(): Http {
    return this._http;
  }
}

export { AbstractApi };
