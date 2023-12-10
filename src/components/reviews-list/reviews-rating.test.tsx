import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../utils/mock-component';
import {makeFakeStore} from '../../utils/mocks';
import ReviewsRating from '../reviews-rating/reviews-rating';

describe('Component: ReviewsRating', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore({});
    const testId = 'reviews-rating';
    const { withStoreComponent } = withStore(withHistory(<ReviewsRating handleRatingChange={() => {}} />), fakeStore);

    render(withStoreComponent);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
