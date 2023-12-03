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

export const SORTING_DEFAULT_OPTION = SortingOption.Popular;

export const CITY_DEFAULT_NAME: CityName = CitiesList.Paris;

export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const MAX_NEAR_PLACES_COUNT = 3;

export const BACKEND_URL = 'https://14.design.pages.academy/six-cities';

export const REQUEST_TIMEOUT = 5000;

export const TIMEOUT_SHOW_ERROR = 2000;

export const ERROR_STATUS_CODE = 404;
export const ERROR_ROUTE = '404';

