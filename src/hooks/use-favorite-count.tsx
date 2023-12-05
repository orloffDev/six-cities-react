import {useAppSelector} from './use-app-selector';

export const useFavoriteCount = function () {
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);
  return favoriteOffers.length;
};

