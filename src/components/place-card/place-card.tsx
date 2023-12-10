//react
import {Link} from 'react-router-dom';

//types
import {Offer} from '../../types/offer';
import {OfferHandleEnter} from '../../types/offer';
import {OfferHandleOut} from '../../types/offer';
import FavoriteButton from '../favorite-button/favorite-button';
import {OfferItem} from '../../types/offer-item';

type PlaceCardProps = {
  offer: Offer;
  onEnter?: OfferHandleEnter;
  onOut?: OfferHandleOut;
  parent: string;
  onFavoriteToggle?: (offerItem: OfferItem) => void;
}

function PlaceCard({offer, onEnter, onOut, parent, onFavoriteToggle}: PlaceCardProps): JSX.Element {
  const {
    id,
    title,
    isPremium,
    rating,
    type,
    price,
    previewImage
  } = offer;
  const linkTo = `/offer/${id}`;
  const handleEnter = ()=>{
    if (onEnter) {
      onEnter(offer);
    }
  };
  const handleOut = ()=>{
    if (onOut) {
      onOut(offer);
    }
  };
  const handleFavoriteButtonToggle = (offerItem: OfferItem)=>{
    if(onFavoriteToggle) {
      onFavoriteToggle(offerItem);
    }
  };

  //
  return (
    <article
      className={`${parent}__card place-card`}
      onPointerEnter={handleEnter}
      onPointerLeave={handleOut}
      data-testid="place-card"
    >
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`${parent}__image-wrapper place-card__image-wrapper`}>
        <Link to={linkTo}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <FavoriteButton
            offer={offer}
            parent="place-card"
            width={18}
            height={19}
            onToggle={handleFavoriteButtonToggle}
          />

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * 100 / 5}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={linkTo}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
