import { createAction } from '@reduxjs/toolkit';
import {CityName} from '../types/city-name';
import {Offer} from '../types/offer';
import {AppRoute, AuthorizationStatus} from '../const';
import {UserData} from '../types/user-data';

export const setActiveCityName = createAction('city/change', (activeCityName: CityName) => ({
  payload: activeCityName
}));

export const setOffers = createAction('offers/change', (offers: Offer[]) => ({
  payload: offers
}));

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setFavoriteOffers = createAction('favoriteOffers/change', (favoriteOffers: Offer[]) => ({
  payload: favoriteOffers
}));

export const setFavoriteOffersDataLoadingStatus = createAction<boolean>('data/setFavoriteOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction('app/redirectToRoute', (appRoute: AppRoute) => ({
  payload: appRoute
}));

export const setUserData = createAction('user/setData', (userData: UserData | null) => ({
  payload: userData
}));
