import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { StorageKey } from '@/common/enums/storage-key.enum';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '@/common/hooks/hooks';
import { storageService } from '@/services/services';
import { authActions } from '@/store/actions';

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
