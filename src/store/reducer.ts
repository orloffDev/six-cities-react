import {createReducer} from '@reduxjs/toolkit';
import {setActiveCityName, setOffers} from "./action";
//const
import {CITY_DEFAULT_NAME } from '../const';
import {offers} from "../mocks/offers";

const initialState = {
  activeCityName: CITY_DEFAULT_NAME,
  offers: offers
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCityName, (state, action) => {
      state.activeCityName = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});
