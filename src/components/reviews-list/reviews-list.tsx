//components
import ReviewsItem from '../reviews-item/reviews-item';
//types
import {Review} from '../../types/review';
//props
type ReviewsListProps = {
  reviewsData: Review[];
}


function ReviewsList({reviewsData}: ReviewsListProps): JSX.Element {

  //
  return (
    <ul className="reviews__list">
      {reviewsData.map((review) => (
        <ReviewsItem
          key={review.id}
          reviewData={review}
        />
      ))}
    </ul>
  );
}

export default ReviewsList;
