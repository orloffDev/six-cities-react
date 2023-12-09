import {Helmet} from 'react-helmet-async';
import FavoriteList from '../../components/favorite-list/favorite-list';
import {useAppSelector} from '../../hooks/use-app-selector';
import Header from '../../components/header/header';
import {Offer} from '../../types/offer';
import {Link} from 'react-router-dom';
import {getOffers} from '../../store/offers-data/selectors';

function FavoritesScreen(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const favoriteOffers:Offer[] = offers.filter((offer) => offer.isFavorite);

  return (
    <>
      <Helmet>
        <title>Favorites</title>
      </Helmet>

      <div className="page">
        <Header nav />
        <main className="page__main page__main--favorites">
          <div className="visually-hidden">FavoritesScreen</div>
          <div className="page__favorites-container container">

            {favoriteOffers.length !== 0 &&
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <FavoriteList offers={favoriteOffers} />
              </section>}

            {favoriteOffers.length === 0 &&
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
              </section>}
          </div>
        </main>
        <footer className="footer container">

          <Link className="footer__logo-link" to="/">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </Link>
        </footer>
      </div>
    </>
  );
}

export default FavoritesScreen;
