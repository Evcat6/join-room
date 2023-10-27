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
import { userActions } from '@/store/actions';

library.add(icons);

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isUserLoaded } = useAppSelector((state) => state.user);
  const token = storageService.get(StorageKey.TOKEN);

  useEffect(() => {
    if (!isUserLoaded && token) {
      void dispatch(userActions.load());
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
