import { Navigate } from 'react-router-dom';

import { AppRoute, DataStatus, StorageKey } from '@/common/enums/enums';
import { useAppSelector } from '@/common/hooks/hooks';
import { storageService } from '@/services/services';

type Properties = {
  children: JSX.Element;
};

const PublicRoute = ({ children }: Properties): JSX.Element => {
  const { isUserLoaded, dataStatus } = useAppSelector((state) => state.auth);
  const token = storageService.get(StorageKey.TOKEN);
  if (!isUserLoaded && dataStatus === DataStatus.PENDING) {
    return <h1>Loading...</h1>;
  }

  if (isUserLoaded && token) {
    return <Navigate to={AppRoute.HOME} replace />;
  }

  return children;
};

export { PublicRoute };
