import { createAction } from '@reduxjs/toolkit';

export const setActiveCity = createAction('city/change', (value) => {
  return {
    payload: value
  };
});
export const setOffers = createAction('offers/change', (value) => {
  return {
    payload: value
  };
});
