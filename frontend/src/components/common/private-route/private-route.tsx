import { Navigate } from 'react-router-dom';

import { AppRoute, DataStatus, StorageKey } from '@/common/enums/enums';
import { useAppSelector } from '@/common/hooks/hooks';
import { storageService } from '@/services/services';

type Properties = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: Properties): JSX.Element => {
  const { isUserLoaded, dataStatus } = useAppSelector((state) => state.auth);
  if (!isUserLoaded && dataStatus === DataStatus.PENDING) {
    return <h1>Loading...</h1>;
  }
  const token = storageService.get(StorageKey.TOKEN);

  if (!token) {
    return <Navigate to={AppRoute.SIGN_IN} replace />;
  }

  return children;
};

export { PrivateRoute };
