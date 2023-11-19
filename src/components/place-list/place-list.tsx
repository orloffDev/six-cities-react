//react
//import {ChangeEvent, useState} from 'react';
//components
import PlaceCard from '../../components/place-card/place-card';
//types
import {Offer} from '../../types/offer';

type PlaceListProps = {
  offers: Offer[];
  onChangeHoverPlace: (offer: Offer) => void;
}

function PlaceList({offers, onChangeHoverPlace}: PlaceListProps): JSX.Element {
  //const [activePlace, setActivePlace] = useState<Offer|null>(null);

  function handleEnter(offer: Offer) {
    //console.log('reactEvent', reactEvent);
    /*if(!activePlace) {
      window.console.log(12123);


    }
    setActivePlace(offer);*/
    onChangeHoverPlace(offer);
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
