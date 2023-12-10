import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../utils/mock-component';
import {makeFakeStore} from '../../utils/mocks';
import Tabs from './tabs';

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore({});
    const testId = 'tabs';
    const { withStoreComponent } = withStore(withHistory(<Tabs />), fakeStore);

    render(withStoreComponent);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
