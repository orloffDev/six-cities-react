import {useAppSelector} from './use-app-selector';
import {getFavoriteOffers} from '../store/favorites-data/selectors';

export const useFavoriteCount = function () {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  return favoriteOffers.length;
};

