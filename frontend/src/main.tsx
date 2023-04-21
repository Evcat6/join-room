import './assets/css/index.css';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { router } from './router/routes';
import { store } from './store/store';

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
