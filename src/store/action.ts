import { createAction } from '@reduxjs/toolkit';

export const setActiveCityName = createAction('city/change', (value) => {
  return {
    payload: value
  };
});

export const setOffers = createAction('offers/change', (value) => {
  return {
    payload: value
  };
});
