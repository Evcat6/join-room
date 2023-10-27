import { Navigate, useLocation } from 'react-router-dom';

import { AppRoute, DataStatus, StorageKey } from '@/common/enums/enums';
import { useAppSelector } from '@/common/hooks/hooks';
import { storageService } from '@/services/services';

type Properties = {
  children: JSX.Element;
};

const PrivateRoute: React.FC<Properties> = ({ children }) => {
  const {
    isUserLoaded,
    dataStatus,
    user: { isFullyRegistered },
  } = useAppSelector((state) => state.user);

  const { pathname } = useLocation();

  const token = storageService.get(StorageKey.TOKEN);

  if (!token) {
    return <Navigate to={AppRoute.SIGN_IN} replace />;
  }

  if (!isUserLoaded && dataStatus === DataStatus.PENDING) {
    return <h1>Loading...</h1>;
  }

  if (
    !isFullyRegistered &&
    (pathname as AppRoute) !== AppRoute.USER_PROFILE &&
    dataStatus === DataStatus.FULFILLED
  ) {
    return <Navigate to={AppRoute.USER_PROFILE} replace />;
  }

  return children;
};

export { PrivateRoute };
