import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeStore, makeFakeOfferId } from '../../utils/mocks';
import ReviewsForm from './reviews-form';

describe('Component: ReviewsForm', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore({});
    const testId = 'reviews-form';
    const id = makeFakeOfferId();
    const { withStoreComponent } = withStore(withHistory(<ReviewsForm onSuccess={() => {}} id={id} />), fakeStore);

    render(withStoreComponent);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
