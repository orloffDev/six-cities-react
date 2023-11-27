import {CityName} from './city-name';
import {Offer} from './offer';
import {AuthorizationStatus} from '../const';

export type InitialState = {
  activeCityName: CityName;
  offers: Offer[] | [];
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | null;
}

