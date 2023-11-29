import { createAction } from '@reduxjs/toolkit';
import {CityName} from '../types/city-name';
import {Offer} from '../types/offer';
import {AppRoute, AuthorizationStatus} from '../const';
import {UserData} from "../types/user-data";

export const setActiveCityName = createAction('city/change', (activeCityName: CityName) => ({
  payload: activeCityName
}));

export const setOffers = createAction('offers/change', (offers: Offer[]) => ({
  payload: offers
}));

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('offers/setError');

export const redirectToRoute = createAction('app/redirectToRoute', (appRoute: AppRoute) => ({
  payload: appRoute
}));

export const setUserData = createAction('user/setData', (userData: UserData) => ({
  payload: userData
}));
