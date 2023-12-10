//react
import {Link} from 'react-router-dom';
//components
import PlaceCard from '../../components/place-card/place-card';
//types
import {Offer} from '../../types/offer';

type FavoriteListProps = {
  offers: Offer[];
}

function FavoriteList({offers}: FavoriteListProps): JSX.Element {
  const list = offers.reduce<Record<string, Offer[]>>((acc, offer) => {
    acc[offer.city.name] = [...(acc[offer.city.name] ?? []), offer];
    return acc;
  }, {});

  //
  return (
    <ul data-testid="favorite-list" className="favorites__list">
      {Object.entries(list).map(([cityName, cityOffers]) => (
        <li key={cityName} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#">
                <span>{cityName}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {cityOffers.map((cityOffer) => (
              <PlaceCard
                key={cityOffer.id}
                offer={cityOffer}
                parent="favorites"
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoriteList;
