import { type Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { swaggerDefinition } from './swagger-defer.js';

const options = {
  swaggerDefinition,
  apis: ['src/api/*.api.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerOptions = (app: Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export { swaggerOptions };
