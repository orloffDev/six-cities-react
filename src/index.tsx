//react
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
//mocks
import {offers} from './mocks/offers';
import {Provider} from "react-redux";
//store
import {store} from "./store/index";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={offers} />
    </Provider>
  </React.StrictMode>
);
