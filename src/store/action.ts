import { createAction } from '@reduxjs/toolkit';
import {AppRoute} from '../const';

export const redirectToRoute = createAction('app/redirectToRoute', (appRoute: AppRoute) => ({
  payload: appRoute
}));
