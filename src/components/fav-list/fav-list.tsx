//react
import {Link} from 'react-router-dom';
//components
import PlaceCard from '../../components/place-card/place-card';
//types
import {Offer} from "../../types/offer";

type FavListProps = {
  offers: Offer[]
}

function FavList({offers}: FavListProps): JSX.Element {
  const favOffers = offers
    .filter((offer) => offer.isFavorite)
    .reduce((acc, offer) => {
      acc[offer.city.name] = [...(acc[offer.city.name] ?? []), offer];
      return acc;
    }, {});

  //
  return (
    <ul className="favorites__list">
      {Object.entries(favOffers).map(([name, offers]) => (
        <li key={name} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#">
                <span>{name}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {offers.map((offer) => (
              <PlaceCard
                key={offer.id}
                offer={offer}
                parent="favorites"
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavList;
