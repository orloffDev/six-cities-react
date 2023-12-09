import { render, screen} from '@testing-library/react';
import {createMemoryHistory } from 'history';
import {AppRoute} from '../../const';
import { makeFakeStore } from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import App from './app';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import React from 'react';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});
