import {createReducer} from '@reduxjs/toolkit';
import {setActiveCityName, setOffers} from "./action";
//const
import {CITY_DEFAULT_NAME } from '../const';
import {offers} from "../mocks/offers";
//utils
import {getMapData} from "../utils/getMapData";

const initialState = {
  activeCityName: CITY_DEFAULT_NAME,
  offers: offers,
  offersFromCity: getMapData
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
