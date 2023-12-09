import { render, screen} from '@testing-library/react';
import {createMemoryHistory } from 'history';
import {AppRoute} from '../../const';
import { makeFakeStore } from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import App from './app';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import React from 'react';


const mockStore = configureMockStore();

const store = mockStore(makeFakeStore());

const history = createMemoryHistory();

const fakeApp = (
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);

describe('Application Routing', () => {

  it('should render "WelcomeScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);
    expect(screen.getByText('WelcomeScreen')).toBeInTheDocument();
  });

  it('should render "favoritesScreen" when user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);
    render(fakeApp);
    expect(screen.getByText('FavoritesScreen')).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);
    render(fakeApp);
    expect(screen.getByText('LoginScreen')).toBeInTheDocument();
  });


});
