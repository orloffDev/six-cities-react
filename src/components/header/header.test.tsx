import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import Header from './header';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore({});
    const testId = 'header';
    const { withStoreComponent } = withStore(withHistory(<Header />), fakeStore);

    render(withStoreComponent);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
