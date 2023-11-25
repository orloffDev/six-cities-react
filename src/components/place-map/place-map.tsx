//vendors
import leaflet from 'leaflet';
import { layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
//react
import {useRef, useEffect} from 'react';
//hooks
import useMap from '../../hooks/use-map';
//types
import {MapData} from '../../types/map-data';
import {SelectedPoint} from '../../types/selected-point';
//const
import {URL_MARKER_CURRENT} from '../../const';
import {URL_MARKER_DEFAULT} from '../../const';

type PlaceMapProps = {
  mapData: MapData;
  parent: 'cities' | 'offer';
  selectedPoint: SelectedPoint;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function PlaceMap({mapData, parent, selectedPoint}: PlaceMapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, mapData.center);

  useEffect(() => {
    if (map && mapData['points']) {
      const markerLayer = layerGroup().addTo(map);
      mapData['points'].forEach((point) => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: (point.id === selectedPoint?.id)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, mapData, selectedPoint]);


  return (
    <section className={`${parent}__map map`} ref={mapRef}></section>
  );
}

export default PlaceMap;
