import {Offer} from '../types/offer';
import {MapData} from '../types/map-data';

const getMapData = function(offers: Offer[], city:string): MapData{
  const offer: Offer = offers.find((offer)=>{
    return offer['city']['name'] === city;
  });

  const points = offers.reduce((acc, offer) => {
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
