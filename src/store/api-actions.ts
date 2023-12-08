import axios, {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../types/app-dispatch';
import {State} from '../types/state';
import {Offer} from '../types/offer';
import {OfferItem} from '../types/offer-item';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {redirectToRoute} from './action';

import {setUserData} from './user-data/user-data';
import {setFavoriteOffers, setFavoriteOffersDataLoadingStatus} from './favorites-data/favorites-data';
import {setOffers, setOffersDataLoadingStatus} from './offers-data/offers-data';

import {APIRoute, AuthorizationStatus, AppRoute} from '../const';
import {saveToken, dropToken} from '../services/token';
import {useUpdateOffers} from '../hooks/use-update-offers';
import {ValidationError} from '../types/index';
import {toast} from 'react-toastify';

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(setUserData(data));
      dispatch(fetchFavoriteOffersAction());
    } catch {
      dispatch(setFavoriteOffers([]));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      const token = data.token;
      const userData = data;
      saveToken(token);
      dispatch(setUserData(userData));
      dispatch(fetchOffersAction());
      dispatch(fetchFavoriteOffersAction());
      dispatch(redirectToRoute(AppRoute.Main));
    } catch (error: unknown) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error) && error.code !== 'ERR_CANCELED') {
        const errorText: string | undefined = error.response?.data?.message;
        if (errorText) {
          toast.error(errorText);
        }
      }
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setUserData(null));
    dispatch(fetchOffersAction());
    dispatch(setFavoriteOffers([]));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetch',
  async (_arg, {dispatch, getState, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const updateOffersAction = createAsyncThunk<void, OfferItem, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/update',
  (offerItem, {dispatch, getState}) => {
    const offers = getState()['OFFERS']['offers'];
    const newOfferList = useUpdateOffers(offers, offerItem);
    dispatch(setOffers(newOfferList));
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorite/fetch',
  async (_arg, {dispatch, getState, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorite);
    return data;
  },
);
