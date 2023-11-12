import PlaceCard from '../../components/place-card/place-card';
import {Offer} from "../../types/offer";

type PlaceListProps = {
  offers: Offer[]
}

function PlaceList({offers}: PlaceListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => (
        <PlaceCard offer={offer} />
      ))}
    </>
  );
}

export default PlaceList;
