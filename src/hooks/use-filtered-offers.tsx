import {Offer} from '../types/offer';
import {CityName} from '../types/city-name';
import {SortingOption} from '../const';

export const useFilteredOffers = function (offers: Offer[], cityName: CityName, optionValue?: string): Offer[] {
  const newFilteredOffer: Offer[] = offers.filter((offer) => offer.city.name === cityName);
  if(optionValue){
    switch (optionValue) {
      case SortingOption.PriceLowToHigh:
        newFilteredOffer.sort((a: Offer, b: Offer) => a.price - b.price);
        break;
      case SortingOption.PriceHighToLow:
        newFilteredOffer.sort((a: Offer, b: Offer) => b.price - a.price);
        break;
      case SortingOption.TopRatedFirst:
        newFilteredOffer.sort((a: Offer, b: Offer) => b.rating - a.rating);
        break;
    }
  }

  return newFilteredOffer;
};

