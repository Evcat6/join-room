import 'react-toastify/dist/ReactToastify.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { icons } from '@/common/config/icons';
import { StorageKey } from '@/common/enums/storage-key.enum';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '@/common/hooks/hooks';
import { storageService } from '@/services/services';
import { authActions } from '@/store/actions';

library.add(icons);

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isUserLoaded } = useAppSelector((state) => state.auth);
  const token = storageService.get(StorageKey.TOKEN);

  useEffect(() => {
    if (!isUserLoaded && token) {
      void dispatch(authActions.loadUser());
    }
  }, [dispatch, isUserLoaded, token]);
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
};

export { App };
