import {Offer} from "../types/offer";
import {CityName} from "../types/city-name";
import {SortingOption} from "../const";

export const useFilteredOffers = function (offers: Offer[], cityName: CityName, optionName?: string) {
  const byCity = offers.filter((offer) => offer.city.name === cityName);
  const byField = (byCity: Offer[]) => {
    switch (SortingOption[optionName]) {
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

  return !optionName ? byCity : byField(byCity);
}

