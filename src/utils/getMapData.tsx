//types
import {Offer} from '../types/offer';
import {MapData} from '../types/map-data';
import {MapPoint} from '../types/map-point';
import {CityName} from '../types/city-name';

const getMapData = function(offers: Offer[] | null, city?: CityName): MapData | null{

  if(!offers || !offers.length) {
    return null;
  }

  const centerOffer = city ? offers.find((offer) => offer['city']['name'] === city) : offers[0];

  if(!centerOffer) {
    return null;
  }

  const points = offers.reduce((acc: MapPoint[], offer) => {
    if(!city || offer['city']['name'] === city){
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
