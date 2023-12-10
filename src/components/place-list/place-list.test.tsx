import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeStore, makeFakeOffer } from '../../utils/mocks';
import PlaceList from './place-list';
import {MAX_NEAR_PLACES_COUNT} from '../../const';

describe('Component: PlaceList', () => {
  it('should render correctly', () => {
    const fakeOffersNear = [makeFakeOffer(), makeFakeOffer()];
    const fakeStore = makeFakeStore({});
    const testId = 'place-list';
    const { withStoreComponent } = withStore(withHistory(
      <PlaceList
        offers={fakeOffersNear}
        parentClass="near-places__list"
        parent="near-places"
        onFavoriteToggle={() => {}}
        maxLength={MAX_NEAR_PLACES_COUNT}
      />), fakeStore);

    render(withStoreComponent);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
