import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeStore, makeFakeOffer } from '../../utils/mocks';
import FavoriteButton from './favorite-button';

describe('Component: FavoriteButton', () => {
  it('should render correctly', () => {
    const fakeOffer = makeFakeOffer();
    const fakeStore = makeFakeStore({});
    const { withStoreComponent } = withStore(withHistory(
      <FavoriteButton
        offer={fakeOffer}
        parent="place-card"
        width={18}
        height={19}
      />), fakeStore);

    render(withStoreComponent);

    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });
});
