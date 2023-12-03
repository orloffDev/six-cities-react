import {useState} from 'react';
import Header from '../../components/header/header';
import PlaceList from '../../components/place-list/place-list';
import PlaceMap from '../../components/place-map/place-map';
import Tabs from '../../components/tabs/tabs';
import {useAppSelector} from '../../hooks/use-app-selector';
import {Offer} from '../../types/offer';
import {SelectedPoint} from '../../types/selected-point';
import {CityName} from '../../types/city-name';
import {getMapData} from '../../utils/getMapData';
import {Helmet} from 'react-helmet-async';
import SortingForm from '../../components/sorting-form/sorting-form';
import {useFilteredOffers} from '../../hooks/use-filtered-offers';
import {SORTING_DEFAULT_OPTION} from '../../const';

function WelcomeScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const activeCityName: CityName = useAppSelector((state) => state.activeCityName);
  const [selectedPoint, setSelectedPoint] = useState<SelectedPoint>(null);
  const mapData = getMapData(offers, activeCityName);
  const [activeOptionValue, setActiveOptionValue] = useState<string>(SORTING_DEFAULT_OPTION);
  const filteredOffersData: Offer[] = useFilteredOffers(offers, activeCityName, activeOptionValue);
  const placesFound: number = filteredOffersData.length;

  const onChangeHoverPlaceList = function(offer: Offer){
    const newSelectedPoint: SelectedPoint = {
      id: offer.id,
      latitude: offer.location.latitude,
      longitude: offer.location.longitude
    };
    setSelectedPoint(newSelectedPoint);
  };

  const onChangeOutPlaceList = function(){
    setSelectedPoint(null);
  };

  const onChangeSort = (optionValue: string) => {
    setActiveOptionValue(optionValue);
  };

  return (
    <>
      <Helmet>
        <title>Main</title>
      </Helmet>

      <div className="page page--gray page--main">
        <Header nav />
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>

          <Tabs />

          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{placesFound} places to stay in {activeCityName}</b>
                <SortingForm onChangeSort={onChangeSort} />
                <PlaceList
                  offers={filteredOffersData}
                  onChangeHoverPlace={onChangeHoverPlaceList}
                  onChangeOutPlace={onChangeOutPlaceList}
                  parentClass="cities__places-list tabs__content"
                  parent="cities"
                />

              </section>
              <div className="cities__right-section">
                {mapData && <PlaceMap mapData={mapData} selectedPoint={selectedPoint} parent="cities" />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default WelcomeScreen;
