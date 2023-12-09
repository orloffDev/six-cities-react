import { render, screen} from '@testing-library/react';
import {createMemoryHistory } from 'history';
import {Provider} from 'react-redux';
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
