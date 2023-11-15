//react
import {useState} from 'react';
//components
import PlaceCard from '../../components/place-card/place-card';
//types
import {Offer} from "../../types/offer";

type PlaceListProps = {
  offers: Offer[]
}

function PlaceList({offers}: PlaceListProps): JSX.Element {
  const [activePlace, setActivePlace] = useState<Offer|null>(null);

  function handleEnter(offer) {
    //console.log('reactEvent', reactEvent);
    if(!activePlace) console.log(12123);
    setActivePlace(offer);
  }

  //
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          parent="cities"
          handleEnter={handleEnter}
        />
      ))}
    </div>
  );
}

export default PlaceList;
