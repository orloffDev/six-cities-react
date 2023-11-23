import {createReducer} from '@reduxjs/toolkit';
import {setActiveCity, setOffers} from "./action";
//const
import {CITY_DEFAULT_NAME } from '../const';
import {offers} from "../mocks/offers";


const initialState = {
  activeCity: CITY_DEFAULT_NAME,
  offers: offers
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});
