import { AxiosError } from 'axios';
import {useEffect, useState} from 'react';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import PlaceMap from '../../components/place-map/place-map';
import PlaceList from '../../components/place-list/place-list';
import {useAppSelector} from '../../hooks/use-app-selector';
import {getMapData} from '../../utils/getMapData';
import {AuthorizationStatus} from '../../const';
import {MAX_NEAR_PLACES_COUNT, APIRoute, ERROR_STATUS_CODE, ERROR_ROUTE} from '../../const';
import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import {Offer} from '../../types/offer';
import {OfferItem} from '../../types/offer-item';
import {Review} from '../../types/review';
import { useParams, useNavigate } from 'react-router-dom';
import {createAPI} from '../../services/api';
import FavoriteButton from '../../components/favorite-button/favorite-button';


function OfferScreen(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const offers = useAppSelector((state) => state.offers);


  const navigate = useNavigate();
  const api = createAPI();
  const id = useParams().id as string;
  const [offerItem, setOfferItem] = useState<OfferItem | null>(null);
  const [offersNear, setOffersNear] = useState<Offer[] | null>(null);
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
  const reviewsCount = reviewsData.length;
  const mapData = getMapData(offersNear);

  const onFormSuccess = function(data: Review){
    const newData = [...reviewsData, data];
    setReviewsData(newData);
  };

  const fetchOffer = async() => {
    try {
      const res = await api.get<OfferItem>(`${APIRoute.Offers}/${id}`);
      setOfferItem(res.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error?.response?.status === ERROR_STATUS_CODE) {
        navigate(ERROR_ROUTE);
      }
    }
  };

  const fetchOffersNear = async() => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    setOffersNear(data.slice(0, 3));
  };

  const fetchReviews = async() => {
    const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
    setReviewsData(data);
  };

  const fetchAll = function(){
    fetchOffer();
    fetchOffersNear();
    fetchReviews();
  };

  useEffect(() => {
    fetchAll();
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Helmet>
        <title>Offer</title>
      </Helmet>
      <div className="page">
        <Header nav />
        {offerItem &&
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offerItem.images.slice(0,6).map((picUrl) => (
                  <div key={picUrl} className="offer__image-wrapper">
                    <img className="offer__image" src={picUrl} alt="Photo studio" />
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {offerItem.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{offerItem.title}</h1>
                  <FavoriteButton offer={offerItem} parent="offer" width={31} height={33} />
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: `${offerItem.rating * 100 / 5}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offerItem.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {offerItem.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offerItem.bedrooms} {offerItem.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {offerItem.maxAdults} {offerItem.maxAdults > 1 ? 'adults' : 'adult'}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{offerItem.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offerItem.goods.map((feature) => (
                      <li key={feature} className="offer__inside-item">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={`offer__avatar-wrapper user__avatar-wrapper ${offerItem.host.isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
                      <img className="offer__avatar user__avatar" src={offerItem.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">
                      {offerItem.host.name}
                    </span>
                    {offerItem.host.isPro &&
                      <span className="offer__user-status">
                        Pro
                      </span>}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{offerItem.description}</p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  {reviewsCount !== 0 &&
                  <>
                    <h2 className="reviews__title">Reviews &middot;
                      <span className="reviews__amount">{reviewsCount}</span>
                    </h2>
                    <ReviewsList reviewsData={reviewsData} />
                  </>}
                  {authorizationStatus === AuthorizationStatus.Auth && <ReviewsForm onSuccess={onFormSuccess} id={id} />}
                </section>
              </div>
            </div>
            {mapData && <PlaceMap mapData={mapData} parent="offer" />}
          </section>
          {offersNear &&
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <PlaceList
                offers={offers}
                parentClass="near-places__list"
                parent="near-places"
                maxLength={MAX_NEAR_PLACES_COUNT}
              />
            </section>
          </div>}
        </main>}
      </div>
    </>
  );
}

export default OfferScreen;
