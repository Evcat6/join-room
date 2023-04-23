import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { PrivateRoute, PublicRoute } from '@/components/components';

import { App } from '../app/app';
import { AppRoute } from '../common/enums/enums';
import { Auth, Home } from '../pages/pages';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route
            path={AppRoute.SIGN_IN}
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />
          <Route
            path={AppRoute.SIGN_UP}
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />
          <Route
            path={AppRoute.HOME}
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.ROOT}
            element={<Navigate to={AppRoute.HOME} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRouter };
