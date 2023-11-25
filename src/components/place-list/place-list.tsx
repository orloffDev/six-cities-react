//components
import PlaceCard from '../../components/place-card/place-card';
//types
import {Offer} from '../../types/offer';

type PlaceListProps = {
  offers: Offer[];
  onChangeHoverPlace?: (offer: Offer) => void;
  onChangeOutPlace?: (offer: Offer) => void;
  parentClass: string;
  parent: string;
  maxLength?: number;
}

function PlaceList({offers, onChangeHoverPlace, onChangeOutPlace, parentClass, parent, maxLength}: PlaceListProps): JSX.Element {
  const sliceOffers:Offer[] = maxLength ? offers.slice(0, maxLength) : offers;

  const handleEnter = (offer: Offer) =>{
    if (onChangeHoverPlace) {
      onChangeHoverPlace(offer);
    }
  }

  const handleOut = (offer: Offer) =>{
    if (onChangeOutPlace) {
      onChangeOutPlace(offer);
    }
  }

  //
  return (
    <div className={`${parentClass} places__list`}>
      {sliceOffers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          parent={parent}
          onEnter={handleEnter}
          onOut={handleOut}
        />
      ))}
    </div>
  );
}

export default PlaceList;
