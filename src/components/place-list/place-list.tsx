//components
import PlaceCard from '../../components/place-card/place-card';
//types
import {Offer} from '../../types/offer';
//const
import {MAX_NEAR_PLACES_COUNT} from "../../const";

type PlaceListProps = {
  offers: Offer[];
  onChangeHoverPlace?: (offer: Offer) => void;
  parentClass: string;
  parent: string;
}

function PlaceList({offers, onChangeHoverPlace, parentClass, parent}: PlaceListProps): JSX.Element {
  //const [activePlace, setActivePlace] = useState<Offer|null>(null);

  function handleEnter(offer: Offer) {
    //console.log('reactEvent', reactEvent);
    /*if(!activePlace) {
      window.console.log(12123);


    }
    setActivePlace(offer);*/
    onChangeHoverPlace && onChangeHoverPlace(offer);
  }

  //
  return (
    <div className={`${parentClass} places__list`}>
      {offers.slice(0, MAX_NEAR_PLACES_COUNT).map((offer) => (
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
