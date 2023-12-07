import {CityName} from './city-name';
import {Offer} from './offer';
import {AuthorizationStatus} from '../const';
import {UserData} from './user-data';
import {OfferItem} from "./offer-item";

export type InitialState = {
  activeCityName: CityName;
  offers: Offer[] | [];
  isOffersDataLoading: boolean;
  favoriteOffers: Offer[] | [];
  isFavoriteOffersDataLoading: boolean;
  offerItem: OfferItem | null;
  isOfferItemDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  userData: UserData | null;
}

