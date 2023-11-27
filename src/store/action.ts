import { createAction } from '@reduxjs/toolkit';
import {CityName} from '../types/city-name';
import {Offer} from '../types/offer';
import {AuthorizationStatus} from '../const';

export const setActiveCityName = createAction('city/change', (activeCityName: CityName) => ({
  payload: activeCityName
}));

export const setOffers = createAction('offers/change', (offers: Offer[]) => ({
  payload: offers
}));

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('offers/setError');
