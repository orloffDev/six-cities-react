import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offer} from '../../types/offer';

export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.Favorites].favoriteOffers;
export const isFavoriteOffersDataLoading = (state: State): boolean => state[NameSpace.Favorites].isFavoriteOffersDataLoading;
