import { Navigate } from 'react-router-dom';

import { AppRoute, DataStatus } from '@/common/enums/enums';
import { useAppSelector } from '@/common/hooks/hooks';

type Properties = {
  children: JSX.Element;
};

const PublicRoute = ({ children }: Properties): JSX.Element => {
  const { isUserLoaded, dataStatus } = useAppSelector((state) => state.auth);
  if (!isUserLoaded && dataStatus === DataStatus.PENDING) {
    return <h1>Loading...</h1>;
  }

  if (isUserLoaded) {
    return <Navigate to={AppRoute.HOME} replace />;
  }

  return children;
};

export { PublicRoute };
