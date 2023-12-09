import { store } from '../store/index';
import {AuthorizationStatus} from '../const';
import {Offer} from './offer';
import {CityName} from './city-name';
import {UserData} from './user-data';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type OffersProcess = {
  offers: Offer[];
  isOffersDataLoading: boolean;
};

export type FavoriteOffersProcess = {
  favoriteOffers: Offer[];
  isFavoriteOffersDataLoading: boolean;
};

export type CityData = {
  activeCityName: CityName;
};

export type State = ReturnType<typeof store.getState>;
