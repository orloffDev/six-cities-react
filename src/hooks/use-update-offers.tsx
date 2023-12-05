import {Offer} from '../types/offer';
import {OfferItem} from '../types/offer-item';

/**
 * @description Создаем новый список предложений, так как в старом поменяось значение избранного у элемента списка
 * @param {Offer[]} offers - старый список на основании которого будет создан новый
 * @param {OfferItem} offerItem - избранное предложение у которого изменился статус
 */

export const useUpdateOffers = function (offers: Offer[], offerItem: OfferItem): Offer[] {
  const newOffers: Offer[] = JSON.parse(JSON.stringify(offers)) as Offer[];
  const curItemIndex: number = newOffers.findIndex((item) => item.id === offerItem.id);
  newOffers[curItemIndex].isFavorite = offerItem.isFavorite;
  return newOffers;
};

