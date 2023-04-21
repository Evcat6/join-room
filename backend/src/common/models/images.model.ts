import { ModelNames } from '../enums/enums.js';
import { Abstract } from './abstract.model.js';

class ImageModel extends Abstract {
  public 'path': string;

  public static get tableName(): string {
    return ModelNames.IMAGES;
  }
}

export { ImageModel };
