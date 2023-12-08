import {CityName} from './types/city-name';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',

}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum CitiesList {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export enum APIRoute {
  Offers = '/offers',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
}

export enum SortingOption {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum FormSettings {
  Minlength = 50,
  MaxLength = 300
}

export const enum MarkerUrl {
  Default = '/assets/pin.svg',
  Current= '/assets/pin-active.svg',
}

export enum NameSpace {
  User = 'USER',
  Offers = 'OFFERS',
  Favorites = 'FAVORITES',
  City = 'CITY',
}

export const SORTING_DEFAULT_OPTION = SortingOption.Popular;

export const CITY_DEFAULT_NAME: CityName = CitiesList.Paris;

export const MAX_NEAR_PLACES_COUNT = 3;

export const MAX_REVIEWS_COUNT = 10;

export const BACKEND_URL = 'https://14.design.pages.academy/six-cities';

export const REQUEST_TIMEOUT = 5000;

export const ERROR_STATUS_CODE = 404;
export const ERROR_ROUTE = '404';

