import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../utils/mock-component';
import {makeFakeStore} from '../../utils/mocks';
import SortingForm from './sorting-form';

describe('Component: SortingForm', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore({});
    const testId = 'sorting-form';
    const { withStoreComponent } = withStore(withHistory(<SortingForm onChangeSort={() => {}} />), fakeStore);

    render(withStoreComponent);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
