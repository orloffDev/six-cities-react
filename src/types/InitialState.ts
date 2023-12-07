import {CityName} from './city-name';
import {Offer} from './offer';
import {AuthorizationStatus} from '../const';
import {UserData} from './user-data';

export type InitialState = {
  activeCityName: CityName;
  offers: Offer[] | [];
  isOffersDataLoading: boolean;
  favoriteOffers: Offer[] | [];
  isFavoriteOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
}

