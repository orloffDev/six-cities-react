import {createReducer} from '@reduxjs/toolkit';
import {
  setActiveCityName,
  setOffers,
  setOffersDataLoadingStatus,
  setOfferItem,
  setOfferItemDataLoadingStatus,
  setFavoriteOffers,
  setFavoriteOffersDataLoadingStatus,
  requireAuthorization,
  setUserData
} from './action';
//types
import {InitialState} from '../types/InitialState';
//const
import {CITY_DEFAULT_NAME, AuthorizationStatus} from '../const';

const initialState: InitialState = {
  activeCityName: CITY_DEFAULT_NAME,
  offers: [],
  isOffersDataLoading: false,
  favoriteOffers: [],
  isFavoriteOffersDataLoading: false,
  offerItem:null,
  isOfferItemDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  userData: null
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCityName, (state, action) => {
      state.activeCityName = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOfferItem, (state, action) => {
      state.offerItem = action.payload;
    })
    .addCase(setOfferItemDataLoadingStatus, (state, action) => {
      state.isOfferItemDataLoading = action.payload;
    })
    .addCase(setFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(setFavoriteOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});
