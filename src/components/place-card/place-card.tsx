//react
import {Link} from 'react-router-dom';

//types
import {Offer} from '../../types/offer';
import {OfferHandleEnter} from '../../types/offer';

type PlaceCardProps = {
  offer: Offer;
  handleEnter?: OfferHandleEnter;
  parent: 'cities' | 'favorites';
}

function PlaceCard({offer, handleEnter, parent}: PlaceCardProps): JSX.Element {
  const {
    id,
    title,
    isFavorite,
    isPremium,
    rating,
    type,
    price,
    previewImage
  } = offer;
  const linkTo = `/offer/${id}`;

  //
  return (
    <article
      className={`${parent}__card place-card`}
      onPointerEnter={()=>{
        if (handleEnter) {
          handleEnter(offer);
        }
      }}
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

          <button className={`place-card__bookmark-button button ${isFavorite && 'place-card__bookmark-button--active'}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
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
