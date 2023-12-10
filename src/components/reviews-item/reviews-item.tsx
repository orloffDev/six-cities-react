//types
import {Review} from '../../types/review';
import {getRating} from '../../utils/index';

type ReviewsItemProps = {
  reviewData: Review;
}
function ReviewsItem({reviewData}: ReviewsItemProps): JSX.Element {
  const dateTime = new Date(reviewData.date).toLocaleString('en-US', { month: 'long', year: 'numeric' });

  //
  return (
    <li data-testid="reviews-item" className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={reviewData.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">{reviewData.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getRating(reviewData.rating)}`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{reviewData.comment}</p>
        <time className="reviews__time" dateTime={dateTime}>{dateTime}</time>
      </div>
    </li>
  );
}

export default ReviewsItem;
