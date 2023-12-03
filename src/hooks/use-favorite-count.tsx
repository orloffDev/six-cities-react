import {useAppSelector} from './use-app-selector';

export const useFavoriteCount = function () {
  const offers = useAppSelector((state) => state.offers);
  return offers.filter((offer) => offer.isFavorite).length;
};

