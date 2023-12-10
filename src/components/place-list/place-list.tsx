import PlaceCard from '../../components/place-card/place-card';
import {Offer} from '../../types/offer';
import {OfferItem} from '../../types/offer-item';

type PlaceListProps = {
  offers: Offer[];
  onChangeHoverPlace?: (offer: Offer) => void;
  onChangeOutPlace?: (offer: Offer) => void;
  parentClass: string;
  parent: string;
  maxLength?: number;
  onFavoriteToggle?: (offerItem: OfferItem) => void;
}

function PlaceList({offers, onChangeHoverPlace, onChangeOutPlace, parentClass, parent, maxLength, onFavoriteToggle}: PlaceListProps): JSX.Element {
  const sliceOffers:Offer[] = maxLength ? offers.slice(0, maxLength) : offers;

  const handleEnter = (offer: Offer) =>{
    if (onChangeHoverPlace) {
      onChangeHoverPlace(offer);
    }
  };

  const handleOut = (offer: Offer) =>{
    if (onChangeOutPlace) {
      onChangeOutPlace(offer);
    }
  };

  const handlePlaceCardFavorite = (offerItem: OfferItem) =>{
    if (onFavoriteToggle) {
      onFavoriteToggle(offerItem);
    }
  };

  //
  return (
    <div data-testid="place-list" className={`${parentClass} places__list`}>
      {sliceOffers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          parent={parent}
          onEnter={handleEnter}
          onOut={handleOut}
          onFavoriteToggle={handlePlaceCardFavorite}
        />
      ))}
    </div>
  );
}

export default PlaceList;
