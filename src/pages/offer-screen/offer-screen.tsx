import { AxiosError } from 'axios';
import {useEffect, useState} from 'react';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import PlaceMap from '../../components/place-map/place-map';
import PlaceList from '../../components/place-list/place-list';
import {useAppSelector} from '../../hooks/use-app-selector';
import {getMapData} from '../../utils/getMapData';
import {AuthorizationStatus, CITY_DEFAULT_NAME} from '../../const';
import {MAX_NEAR_PLACES_COUNT, APIRoute, AppRoute, ERROR_STATUS_CODE, ERROR_ROUTE} from '../../const';
import {Helmet} from 'react-helmet-async';
import Header from "../../components/header/header";
import {Offer} from "../../types/offer";
import {Review} from "../../types/review";
import { useParams, useNavigate } from 'react-router-dom';
import {createAPI} from "../../services/api";


function OfferScreen(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const offers = useAppSelector((state) => state.offers);


  const navigate = useNavigate();
  const api = createAPI();
  const id = useParams()?.id;
  const [offer, setOffer] = useState<Offer | null>(null);
  const [offersNear, setOffersNear] = useState<Offer[] | null>(null);
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
  const reviewsCount = reviewsData ? reviewsData.length : null;
  const mapData = getMapData(offersNear);

  const onFormSuccess = function(data){
    const reviewData = data.data;
    const newData = [...reviewsData, reviewData];
    setReviewsData(newData);
  };

  const toggleFavorite = async (favoriteOffer: Offer) => {
    if (authorizationStatus !== authorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    const { isFavorite } = favoriteOffer;
    if (isFavorite) {
      console.log('remove') //TODO
    } else {
      console.log('add'); //TODO
    }
    fetchOffer();
  };

  const fetchOffer = async() => {
    try {
      const res = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      setOffer(res.data);
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
    const { data } = await api.get<Comment[]>(`${APIRoute.Reviews}/${id}`);
    setReviewsData(data);
  };

  const fetchAll = function(){
    fetchOffer();
    fetchOffersNear();
    fetchReviews();
  }

  useEffect(() => {
    fetchAll();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <Helmet>
        <title>Offer</title>
      </Helmet>
      <div className="page">
        <Header nav={true} />
        {offer && <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offer.images.slice(0,6).map((picUrl) => (
                  <div key={picUrl} className="offer__image-wrapper">
                    <img className="offer__image" src={picUrl} alt="Photo studio" />
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {offer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{offer.title}</h1>
                  <button
                    className={`offer__bookmark-button button ${offer.isFavorite && authorizationStatus === authorizationStatus.Auth ? 'offer__bookmark-button--active' : ''}`}
                    type="button"
                    onClick={ () => {
                      toggleFavorite(offer);
                    }}
                  >
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: `${offer.rating * 100 / 5}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {offer.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms} {offer.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {offer.maxAdults} {offer.maxAdults > 1 ? 'adults' : 'adult'}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{offer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((feature) => (
                      <li key={feature} className="offer__inside-item">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={`offer__avatar-wrapper user__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
                      <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">
                      {offer.host.name}
                    </span>
                    {offer.host.isPro && <span className="offer__user-status">
                      Pro
                    </span>}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{offer.description}</p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  {reviewsCount !== 0 && <><h2 className="reviews__title">Reviews &middot;
                  <span className="reviews__amount">{reviewsCount}</span></h2>
                  <ReviewsList reviewsData={reviewsData} /></>}
                  {authorizationStatus === AuthorizationStatus.Auth && <ReviewsForm onSuccess={onFormSuccess} id={id} />}
                </section>
              </div>
            </div>
            {mapData && <PlaceMap mapData={mapData} parent="offer" />}
          </section>
          {offersNear && <div className="container">
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
