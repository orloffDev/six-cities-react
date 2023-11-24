//components
import PlaceCard from '../../components/place-card/place-card';
//types
import {Offer} from '../../types/offer';

type PlaceListProps = {
  offers: Offer[];
  onChangeHoverPlace?: (offer: Offer) => void;
  parentClass: string;
  parent: string;
  maxLength?: number;
}

function PlaceList({offers, onChangeHoverPlace, parentClass, parent, maxLength}: PlaceListProps): JSX.Element {
  const sliceOffers:Offer[] = maxLength ? offers.slice(0, maxLength) : offers;

  function handleEnter(offer: Offer) {
    if (onChangeHoverPlace) {
      onChangeHoverPlace(offer);
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
          handleEnter={handleEnter}
        />
      ))}
    </div>
  );
}

export default PlaceList;
