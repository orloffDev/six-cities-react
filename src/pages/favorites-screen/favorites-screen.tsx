import {Helmet} from 'react-helmet-async';
import FavList from '../../components/fav-list/fav-list';
import {useAppSelector} from '../../hooks/use-app-selector';
import Header from "../../components/header/header";

function FavoritesScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);

  return (
    <>
      <Helmet>
        <title>Favorites</title>
      </Helmet>

      <div className="page">
        <Header nav={true} />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavList offers={offers} />
            </section>
          </div>
        </main>
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </a>
        </footer>
      </div>
    </>
  );
}

export default FavoritesScreen;
