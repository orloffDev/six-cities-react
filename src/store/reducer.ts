import {createReducer} from '@reduxjs/toolkit';
import {setActiveCityName, setOffers, setError} from './action';
//types
import {InitialState} from '../types/InitialState';
//const
import {CITY_DEFAULT_NAME } from '../const';

const initialState: InitialState = {
  activeCityName: CITY_DEFAULT_NAME,
  offers: [],
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
    .addCase(setError, (state, action) => {
    state.error = action.payload;
  });
});
