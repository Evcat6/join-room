import { createBrowserRouter } from 'react-router-dom';

import { App } from '../app/app';
import { AppRoute } from '../common/enums/enums';
import { Auth } from '../pages/pages';

const router = createBrowserRouter([
  {
    path: AppRoute.ROOT,
    element: <App />,
    children: [
      {
        path: AppRoute.SIGN_IN,
        element: <Auth />,
      },
      {
        path: AppRoute.SIGN_UP,
        element: <Auth />,
      },
    ],
  },
]);

export { router };
