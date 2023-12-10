import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeStore, makeFakeMapData } from '../../utils/mocks';
import PlaceMap from './place-map';

describe('Component: PlaceMap', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore({});
    const fakeMapData = makeFakeMapData();
    const testId = 'place-map';
    const { withStoreComponent } = withStore(withHistory(
      <PlaceMap
        mapData={fakeMapData}
        parent="cities"
      />), fakeStore);

    render(withStoreComponent);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
