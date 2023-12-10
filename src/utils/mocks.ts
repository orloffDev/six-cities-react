import { name, internet, lorem, datatype, random, image} from 'faker';
import {Offer} from '../types/offer';
import {City} from '../types/city';
import {Location} from '../types/location';
import {User} from '../types/user';
import {State } from '../types/state';
import {UserData} from '../types/user-data';
import {AuthorizationStatus, CITY_DEFAULT_NAME} from '../const';
import { Action } from 'redux';
import {createAPI} from '../services/api';
import { ThunkDispatch } from 'redux-thunk';
import {MapPoint} from '../types/map-point';
import {MapData} from '../types/map-data';
import {Review} from '../types/review';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const makeFakeOfferId = (): string => datatype.string(20);

export const makeFakeUserData = (): UserData => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number({ min: 1, max: 100 }),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.uuid(),
} as UserData);

export const makeFakeLocation = (): Location => ({
  latitude: datatype.number({ min: -90, max: 90, precision: 0.000001 }),
  longitude: datatype.number({ min: -180, max: 180, precision: 0.000001 }),
  zoom: datatype.number({ min: 1, max: 17 }),
} as Location);

export const makeFakeCity = (): City => ({
  location: makeFakeLocation(),
  name: random.word(),
} as City);

export const makeFakeHost = (): User => ({
  avatarUrl: internet.avatar(),
  id: datatype.number({ min: 1, max: 100 }),
  isPro: datatype.boolean(),
  name: name.firstName(),
} as User);

export const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number({ min: 1, max: 10 }),
  city: makeFakeCity(),
  description: lorem.lines(1),
  goods: datatype.array(5),
  host: makeFakeHost(),
  id: datatype.string(20),
  images: [
    image.imageUrl(260, 200),
    image.imageUrl(260, 200),
    image.imageUrl(260, 200),
    image.imageUrl(260, 200),
  ],
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: makeFakeLocation(),
  maxAdults: datatype.number({ min: 1, max: 10 }),
  previewImage: image.imageUrl(300, 300),
  price: datatype.number({ min: 1, max: 999 }),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
  title: lorem.lines(1),
  type: lorem.word(),
} as Offer);

export const makeFakeStore = (newStateData?: Partial<State>): State => ({
  USER: { userData: makeFakeUserData(), authorizationStatus: AuthorizationStatus.Auth},
  CITY: { activeCityName: CITY_DEFAULT_NAME},
  OFFERS: {
    offers: [makeFakeOffer(), makeFakeOffer()],
    isOffersDataLoading: false
  },
  FAVORITES: {
    favoriteOffers: [makeFakeOffer(), makeFakeOffer()],
    isFavoriteOffersDataLoading: false
  },
  ...newStateData ?? {},
});

export const makeFakeMapPoint = (): MapPoint => ({
  id: datatype.string(20),
  latitude: datatype.number({ min: -90, max: 90, precision: 0.000001 }),
  longitude: datatype.number({ min: -180, max: 180, precision: 0.000001 }),
} as MapPoint);

export const makeFakeMapData = (): MapData => ({
  center: makeFakeLocation(),
  points: [makeFakeMapPoint(), makeFakeMapPoint()],
} as MapData);

export const makeFakeReview = (): Review => ({
  id: datatype.string(20),
  date: datatype.string(10),
  user: makeFakeUserData() as User,
  comment: datatype.string(100),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
} as Review);
