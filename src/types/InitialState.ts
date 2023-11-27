import {CityName} from './city-name';
import {Offer} from './offer';

export type InitialState = {
  activeCityName: CityName;
  offers: Offer[] | [];
}

