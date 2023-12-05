import { useMemo } from 'react';
import ReviewsItem from '../reviews-item/reviews-item';
import {Review} from '../../types/review';
type ReviewsListProps = {
  reviewsData: Review[];
}
import {MAX_REVIEWS_COUNT} from "../../const";


function ReviewsList({reviewsData}: ReviewsListProps): JSX.Element {
  const memoReviewsData = useMemo(() => {
    const sortedReviewsData = reviewsData.sort((a: Review, b: Review) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
    return sortedReviewsData.slice(0, MAX_REVIEWS_COUNT);
  }, [reviewsData]);

  //
  return (
    <ul className="reviews__list">
      {memoReviewsData.map((review) => (
        <ReviewsItem
          key={review.id}
          reviewData={review}
        />
      ))}
    </ul>
  );
}

export default ReviewsList;
