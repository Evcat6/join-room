import { Model } from 'objection';

import { ModelNames } from '../enums/enums';

class ImageModel extends Model {
  public static get tableName(): string {
    return ModelNames.IMAGES;
  }
}

export { ImageModel };
