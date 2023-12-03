import {Offer} from '../types/offer';
import {CityName} from '../types/city-name';
import {SortingOption} from '../const';

export const useFilteredOffers = function (offers: Offer[], cityName: CityName, optionValue?: string): Offer[] {
  const byCity = offers.filter((offer) => offer.city.name === cityName);
  const byField = (byCity: Offer[]) => {
    if(!optionValue){
      return byCity;
    }
    switch (optionValue) {
      case SortingOption.Popular:
        return byCity;
      case SortingOption.PriceLowToHigh:
        return byCity.sort((a: Offer, b: Offer) => a.price - b.price);
      case SortingOption.PriceHighToLow:
        return byCity.sort((a: Offer, b: Offer) => b.price - a.price);
      case SortingOption.TopRatedFirst:
        return byCity.sort((a: Offer, b: Offer) => b.rating - a.rating);
      default:
        return byCity;
    }
  };

  return !optionValue ? byCity : byField(byCity);
}

