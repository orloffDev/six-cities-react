import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeStore, makeFakeOffer } from '../../utils/mocks';
import PlaceCard from './place-card';

describe('Component: PlaceCard', () => {
  it('should render correctly', () => {
    const fakeCityOffer = makeFakeOffer();
    const fakeStore = makeFakeStore({});
    const testId = 'place-card';
    const { withStoreComponent } = withStore(withHistory(<PlaceCard offer={fakeCityOffer} parent="favorites" />), fakeStore);

    render(withStoreComponent);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
