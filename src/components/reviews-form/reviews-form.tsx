//react
import {ChangeEvent, useState} from 'react';
//components
import ReviewsRating from '../reviews-rating/reviews-rating';


function ReviewsForm(): JSX.Element {
  const [form, setForm] = useState({
    rating: 0,
    review: ''
  });

  const handleReviewChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      review: event.target.value
    });
  };

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      rating: parseInt(event.target.value, 10)
    });
  };

  //
  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewsRating handleRatingChange={handleRatingChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={form['review']}
        onChange={handleReviewChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled >Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
