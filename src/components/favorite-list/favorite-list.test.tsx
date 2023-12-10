import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeStore, makeFakeOffer } from '../../utils/mocks';
import FavoriteList from './favorite-list';

describe('Component: FavoriteList', () => {
  it('should render correctly', () => {
    const fakeFavoriteOffers = [makeFakeOffer(), makeFakeOffer()];
    const fakeStore = makeFakeStore({});
    const testId = 'favorite-list';
    const { withStoreComponent } = withStore(withHistory(<FavoriteList offers={fakeFavoriteOffers} />), fakeStore);

    render(withStoreComponent);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
