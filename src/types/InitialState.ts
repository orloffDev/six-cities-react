import {CityName} from './city-name';
import {Offer} from './offer';
import {AuthorizationStatus} from '../const';
import {UserData} from "./user-data";

export type InitialState = {
  activeCityName: CityName;
  offers: Offer[] | [];
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | null;
  userData: UserData | null;
}

