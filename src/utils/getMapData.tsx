//types
import {Offer} from '../types/offer';
import {MapData} from '../types/map-data';
import {MapPoint} from "../types/map-point";

const getMapData = function(offers: Offer[], city:Offer['city']['name']): MapData{
  const offer = offers.find((offer)=>{
    return offer['city']['name'] === city;
  });

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
    center: offer['city']['location'],
    points: points
  }
}

export {getMapData}
