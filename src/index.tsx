//react
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
//components
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
//store
import {store} from './store/index';
//actions
import {fetchOffersAction} from './store/api-actions';

store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>
);
