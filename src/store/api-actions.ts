import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../types/app-dispatch';
import {State} from '../types/state';
import {Offer} from '../types/offer';
import {OfferItem} from '../types/offer-item';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {
  setOffers,
  setOffersDataLoadingStatus,
  setFavoriteOffers,
  setFavoriteOffersDataLoadingStatus,
  requireAuthorization,
  setError,
  redirectToRoute,
  setUserData
} from './action';
import {APIRoute, AuthorizationStatus, AppRoute, TIMEOUT_SHOW_ERROR} from '../const';
import {saveToken, dropToken} from '../services/token';
import {useUpdateOffers} from '../hooks/use-update-offers';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(setOffers(data));
  },
);

export const updateOffersAction = createAsyncThunk<void, OfferItem, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/updateOffers',
  (offerItem, {dispatch, getState}) => {
    const offers = getState()['offers'];
    const newOfferList = useUpdateOffers(offers, offerItem);
    dispatch(setOffers(newOfferList));
  }
);


export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFavoriteOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Favorite);
    dispatch(setFavoriteOffersDataLoadingStatus(false));
    dispatch(setFavoriteOffers(data));
  },
);

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
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(fetchFavoriteOffersAction());
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
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
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    const token = data.token;
    const userData = data;
    saveToken(token);
    dispatch(setUserData(userData));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(fetchOffersAction());
    dispatch(fetchFavoriteOffersAction());
    dispatch(redirectToRoute(AppRoute.Main));
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
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(fetchOffersAction());
    dispatch(setFavoriteOffers([]));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const clearErrorAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/clearError',
  (_arg, {dispatch}) => {
    setTimeout(
      () => dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

