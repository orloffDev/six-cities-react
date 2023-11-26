//react
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
//components
import App from './components/app/app';
//store
import {store} from './store/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
