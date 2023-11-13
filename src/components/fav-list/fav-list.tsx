//react
import {useState} from 'react';
//components
import PlaceCard from '../../components/place-card/place-card';
//types
import {Offer} from "../../types/offer";

type PlaceListProps = {
  offers: Offer[]
}

function FavList({offers}: PlaceListProps): JSX.Element {
  const [activePlace, setActivePlace] = useState<Offer|null>(null);

  function handleEnter(reactEvent) {
    console.log('reactEvent', reactEvent);
    //setActivePlace(offer);
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard key={offer.id} parentClass={} offer={offer} handleEnter={handleEnter} />
      ))}
    </div>
  );
}

export default FavList;