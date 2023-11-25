//types
import {Offer} from '../types/offer';
import {MapData} from '../types/map-data';
import {MapPoint} from '../types/map-point';
import {CityName} from "../types/city-name";

const getMapData = function(offers: Offer[], city: CityName): MapData{
  const centerOffer = offers.find((offer) => offer['city']['name'] === city);

  if(!centerOffer) {
    throw new Error();
  } //TODO ??

  const points = offers.reduce((acc: MapPoint[], offer) => {
    if(offer['city']['name'] === city){
      acc.push({
        id: offer['id'],
        latitude: offer['location']['latitude'],
        longitude: offer['location']['longitude']
      });
    }
    return acc;
  }, []);

  return {
    center: centerOffer['city']['location'],
    points: points
  };
};

export {getMapData};
