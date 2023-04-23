import './assets/css/index.css';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { AppRouter } from './router/router';
import { store } from './store/store';

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
