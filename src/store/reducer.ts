import {createReducer} from '@reduxjs/toolkit';
import {setActiveCityName, setOffers, setOffersDataLoadingStatus, requireAuthorization, setError} from './action';
//types
import {InitialState} from '../types/InitialState';
//const
import {CITY_DEFAULT_NAME, AuthorizationStatus} from '../const';

const initialState: InitialState = {
  activeCityName: CITY_DEFAULT_NAME,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null,

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
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
