//react
import {useState} from 'react';
//components
import Logo from '../../components/logo/logo';
import PlaceList from '../../components/place-list/place-list';
import PlaceMap from '../../components/place-map/place-map';
import Tabs from "../../components/tabs/tabs";
//hooks
import {useAppDispatch} from "../../hooks/use-app-dispatch";
import {useAppSelector} from "../../hooks/use-app-selector";
//types
import {Offer} from '../../types/offer';
import {MapData} from '../../types/map-data';
import {CityName} from "../../types/city-name";
//utils
import {getMapData} from '../../utils/getMapData';


function WelcomeScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const activeCityName: CityName =  useAppSelector((state) => state.activeCityName);
  const offersFromCity = offers.filter((offer) => offer.city.name === activeCityName);
  const [mapData, setMapData] = useState<MapData>(getMapData(offers, activeCityName));
  const placesFound: number = offersFromCity.length;


  const onChangeHoverPlaceList = function(offer: Offer){
    const selectedPoint = {
      id: offer.id,
      latitude: offer.location.latitude,
      longitude: offer.location.longitude
    };

    setMapData({
      ...mapData,
      selectedPoint: selectedPoint
    });
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              {<Logo pageName="welcome"></Logo>}
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <Tabs />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesFound} places to stay in {activeCityName}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>

              <PlaceList
                offers={offersFromCity}
                onChangeHoverPlace={onChangeHoverPlaceList}
                parentClass="cities__places-list tabs__content"
                parent="cities"
              />

            </section>
            <div className="cities__right-section">
              {mapData.center !== undefined ? <PlaceMap mapData={mapData} parent="cities" /> : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WelcomeScreen;
