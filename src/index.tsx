import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const data = {
  placesFound: 12233255
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesFound={data.placesFound} />
  </React.StrictMode>
);
