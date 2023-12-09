import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {cityData} from './city-data/city-data';
import {favoritesData} from './favorites-data/favorites-data';
import {offersData} from './offers-data/offers-data';
import {userData} from './user-data/user-data';

export const rootReducer = combineReducers({
  [NameSpace.User]: userData.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.Favorites]: favoritesData.reducer,
  [NameSpace.City]: cityData.reducer,
});
