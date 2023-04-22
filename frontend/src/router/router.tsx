import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { App } from '../app/app';
import { AppRoute } from '../common/enums/enums';
import { Auth } from '../pages/pages';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path={AppRoute.SIGN_IN} element={<Auth />} />
          <Route path={AppRoute.SIGN_UP} element={<Auth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRouter };
