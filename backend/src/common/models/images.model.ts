import { ModelNames } from '../enums/enums';
import { Abstract } from './abstract.model';

class ImageModel extends Abstract {
  public 'path': string;

  public static get tableName(): string {
    return ModelNames.IMAGES;
  }
}

export { ImageModel };
