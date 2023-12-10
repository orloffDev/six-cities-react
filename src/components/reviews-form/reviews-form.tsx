import { useMemo } from 'react';
import { toast } from 'react-toastify';
import axios, {AxiosRequestConfig} from 'axios';
import {ChangeEvent, useEffect, useRef, useState} from 'react';
import ReviewsRating from '../reviews-rating/reviews-rating';
import {FormData} from '../../types/form-data';
import {Review} from '../../types/review';
import {createAPI} from '../../services/api';
import {APIRoute, FormSettings} from '../../const';
import {MutableRefObject, ValidationError} from '../../types/index';
import './reviews-form.css';


type ReviewsFormProps = {
  onSuccess: (data: Review) => void;
  id: Review['id'];
}

function ReviewsForm({onSuccess, id}: ReviewsFormProps): JSX.Element {
  const controllerRef:MutableRefObject<AbortController> = useRef(null);
  const api = createAPI();

  const [formData, setFormData] = useState({
    rating: 0,
    comment: ''
  } as FormData);

  const isFormValid = useMemo(
    () => formData.rating > 0 && formData.comment.length >= (FormSettings.Minlength as number) && formData.comment.length <= (FormSettings.MaxLength as number),
    [formData]
  );

  const handleReviewChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      comment: event.target.value
    });
  };

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      rating: parseInt(event.target.value, 10)
    });
  };

  const cancelFetch = ()=>{
    const controller = controllerRef.current;
    if(controller) {
      controller.abort();
    }
  };

  const resetForm = (formTag: HTMLFormElement)=>{
    formTag.reset();
    setFormData({
      rating: 0,
      comment: ''
    });
  };

  useEffect(() => cancelFetch(), []);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formTag = evt.currentTarget;
    formTag.classList.add('form--disabled');

    cancelFetch();
    controllerRef.current = new AbortController();
    const signal:AbortSignal = controllerRef.current.signal;
    const config = {
      signal: signal
    } as AxiosRequestConfig;

    api.post<Review>(`${APIRoute.Reviews}/${id}`, formData, config)
      .then(({data})=>{
        resetForm(formTag);
        toast.success('Ваш коментарий успешно добавлен');
        onSuccess(data);
      })
      .catch((error: unknown)=>{
        if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error) && error.code !== 'ERR_CANCELED') {
          const errorText: string | undefined = error.response?.data?.message;
          if (errorText) {
            toast.error(errorText);
          }
        }
      })
      .finally(()=>{
        formTag.classList.remove('form--disabled');
      });
  };

  //
  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
      data-testid="reviews-form"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewsRating handleRatingChange={handleRatingChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData['comment']}
        onChange={handleReviewChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
