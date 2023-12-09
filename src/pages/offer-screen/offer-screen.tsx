import { AxiosError } from 'axios';
import {useEffect, useState} from 'react';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import PlaceMap from '../../components/place-map/place-map';
import PlaceList from '../../components/place-list/place-list';
import {useAppSelector} from '../../hooks/use-app-selector';
import {getMapData} from '../../utils/getMapData';
import {AuthorizationStatus, MAX_REVIEWS_COUNT} from '../../const';
import {MAX_NEAR_PLACES_COUNT, APIRoute, ERROR_STATUS_CODE, ERROR_ROUTE} from '../../const';
import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import {Offer} from '../../types/offer';
import {OfferItem} from '../../types/offer-item';
import {Review} from '../../types/review';
import { useParams, useNavigate } from 'react-router-dom';
import {createAPI} from '../../services/api';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import {useUpdateOffers} from '../../hooks/use-update-offers';
import {getRating} from '../../utils/index';
import {SelectedPoint} from '../../types/selected-point';
import {getAuthorizationStatus} from '../../store/user-data/selectors';

function OfferScreen(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const updateOffers = useUpdateOffers;
  const navigate = useNavigate();
  const api = createAPI();
  const id = useParams().id as string;
  const [currentOfferItem, setCurrentOfferItem] = useState<OfferItem | null>(null);
  const [offersNear, setOffersNear] = useState<Offer[]>([]);
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
  const reviewsCount = reviewsData.length;
  const mapData = currentOfferItem ? getMapData([...offersNear, currentOfferItem] as Offer[]) : null;
  const selectedPoint = currentOfferItem ? {
    id: currentOfferItem.id,
    latitude: currentOfferItem.location.latitude,
    longitude: currentOfferItem.location.longitude
  } as SelectedPoint : null;

  const onFormSuccess = function(data: Review){
    const newData = [...reviewsData, data];
    setReviewsData(newData);
  };

  const fetchOffer = async() => {
    try {
      const res = await api.get<OfferItem>(`${APIRoute.Offers}/${id}`);
      setCurrentOfferItem(res.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error?.response?.status === ERROR_STATUS_CODE) {
        navigate(ERROR_ROUTE);
      }
    }
  };

  const fetchOffersNear = async() => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    setOffersNear(data.slice(0, MAX_NEAR_PLACES_COUNT));
  };

  const fetchReviews = async() => {
    const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
    setReviewsData(data.slice(0, MAX_REVIEWS_COUNT));
  };

  const fetchAll = function(){
    fetchOffer();
    fetchOffersNear();
    fetchReviews();
  };

  const handleOfferItemToggleFavorite = function(offerItem: OfferItem){
    setCurrentOfferItem(offerItem);
  };

  const handleNearListToggle = function(offerItem: OfferItem){
    if(offersNear.length){
      const newOffersNear = updateOffers(offersNear, offerItem);
      setOffersNear(newOffersNear);
    }
  };

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
        <Header nav />
        {currentOfferItem &&
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {currentOfferItem.images.slice(0,6).map((picUrl) => (
                  <div key={picUrl} className="offer__image-wrapper">
                    <img className="offer__image" src={picUrl} alt="Photo studio" />
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {currentOfferItem.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{currentOfferItem.title}</h1>
                  <FavoriteButton
                    offer={currentOfferItem}
                    parent="offer"
                    width={31}
                    height={33}
                    onToggle={handleOfferItemToggleFavorite}
                  />
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: `${getRating(currentOfferItem.rating)}`}}/>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{currentOfferItem.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire" style={{textTransform: 'capitalize'}}>
                    {currentOfferItem.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {currentOfferItem.bedrooms} {currentOfferItem.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {currentOfferItem.maxAdults} {currentOfferItem.maxAdults > 1 ? 'adults' : 'adult'}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{currentOfferItem.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {currentOfferItem.goods.map((feature) => (
                      <li key={feature} className="offer__inside-item">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={`offer__avatar-wrapper user__avatar-wrapper ${currentOfferItem.host.isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
                      <img className="offer__avatar user__avatar" src={currentOfferItem.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">
                      {currentOfferItem.host.name}
                    </span>
                    {currentOfferItem.host.isPro &&
                      <span className="offer__user-status">
                        Pro
                      </span>}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{currentOfferItem.description}</p>
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
            {mapData && selectedPoint && <PlaceMap mapData={mapData} selectedPoint={selectedPoint} parent="offer" />}
          </section>
          {offersNear.length !== 0 &&
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <PlaceList
                offers={offersNear}
                parentClass="near-places__list"
                parent="near-places"
                onFavoriteToggle={handleNearListToggle}
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
