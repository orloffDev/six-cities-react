//react
import {ChangeEvent} from 'react';
import * as React from 'react';

type ReviewsRatingProps = {
  handleRatingChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function ReviewsRating({handleRatingChange}: ReviewsRatingProps): JSX.Element {
  const data = [
    {
      value: 5,
      title: 'perfect'
    },{
      value: 4,
      title: 'good'
    },{
      value: 3,
      title: 'not bad'
    },{
      value: 2,
      title: 'badly'
    },{
      value: 1,
      title: 'terribly'
    },
  ];

  //
  return (
    <div data-testid="reviews-rating" className="reviews__rating-form form__rating">
      {data.map(({title, value}) => (
        <React.Fragment key={value}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={value} id={`${value}-stars`}
            type="radio"
            onChange={handleRatingChange}
          />
          <label
            htmlFor={`${value}-stars`}
            className="reviews__rating-label form__rating-label"
            title={title}
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>
        </React.Fragment>
      ))}
    </div>
  );
}

export default ReviewsRating;
