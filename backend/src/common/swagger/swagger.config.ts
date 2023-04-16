import { type Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { swaggerDefinition } from './swagger-defer';

const options = {
  swaggerDefinition,
  apis: ['src/api/*.api.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerOptions = (app: Application): void => {
  app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export { swaggerOptions };
