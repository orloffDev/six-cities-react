import {Location} from './location';
import {MapPoint} from './map-point';

export type MapData = {
  center: Location | undefined;
  points: MapPoint[];
  selectedPoint?: MapPoint;
}



