import { createAction } from '@reduxjs/toolkit';
import {CityName} from '../types/city-name';
import {Offer} from '../types/offer';

export const setActiveCityName = createAction('city/change', (activeCityName: CityName) => {
  return {
    payload: activeCityName
  };
});

export const setOffers = createAction('offers/change', (offers: Offer[]) => {
  return {
    payload: offers
  };
});
