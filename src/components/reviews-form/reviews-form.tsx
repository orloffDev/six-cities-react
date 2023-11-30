import { toast } from 'react-toastify';
import {AxiosError, AxiosResponse, AxiosRequestConfig} from "axios";
import {ChangeEvent, useEffect, useRef, useState} from 'react';
import ReviewsRating from '../reviews-rating/reviews-rating';
import {FormData} from "../../types/form-data";
import {Review} from "../../types/review";
import {createAPI} from "../../services/api";
import {APIRoute} from "../../const";
import {MutableRefObject} from "../../types/index";
import './reviews-form.css';

type ReviewsFormProps = {
  onSuccess: (formData: FormData) => Promise<void>;
  id: Review['id'];
}

function ReviewsForm({onSuccess, id}: ReviewsFormProps): JSX.Element {
  const controllerRef:MutableRefObject<AbortController> = useRef(null);
  const api = createAPI();

  const [formData, setFormData] = useState({
    rating: 0,
    comment: ''
  });

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
    controller && controller.abort();
  }

  const resetForm = (formTag: HTMLFormElement)=>{
    formTag.reset();
    formTag.classList.remove('form--disabled');
  }

  useEffect(() => {
    return()=>{
      cancelFetch();
    }
  }, []);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formTag = evt.currentTarget;
    formTag.classList.add('form--disabled');

    cancelFetch();
    controllerRef.current = new AbortController();
    const config: AxiosRequestConfig = {data: undefined, string: undefined};
    config.signal = controllerRef.current.signal as AbortSignal;

    api.post<FormData>(`${APIRoute.Reviews}/${id}`, formData, config)
      .then(({data})=>{
        onSuccess(data);
      })
      .catch((error: unknown)=>{
        if (error instanceof AxiosError && error.code !== "ERR_CANCELED") {
          const errorText: string | undefined = error?.message;
          if (errorText) {
            console.log(errorText);
            toast.error(errorText);
          }
        }
      })
      .finally(()=>{
        resetForm(formTag);
      })
  };

  //
  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewsRating handleRatingChange={handleRatingChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData['review']}
        onChange={handleReviewChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" >Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
