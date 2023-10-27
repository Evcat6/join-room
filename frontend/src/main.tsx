import './assets/css/index.css';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { SocketContext } from '@/context/context';

import { socket } from './context/socket.context';
import { AppRouter } from './router/router';
import { store } from './store/store';

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <SocketContext.Provider value={socket}>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </SocketContext.Provider>
);
