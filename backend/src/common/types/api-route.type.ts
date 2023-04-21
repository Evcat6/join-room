import { type Router } from 'express';

type ApiRoute = {
  path: string;
  router: Router;
};

export { type ApiRoute };
