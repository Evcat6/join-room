import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
};

export { App };
