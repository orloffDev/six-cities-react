import leaflet from 'leaflet';
import { layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useRef, useEffect} from 'react';
import useMap from '../../hooks/use-map';
import {MapData} from '../../types/map-data';
import {SelectedPoint} from '../../types/selected-point';
import {MarkerUrl} from '../../const';

type PlaceMapProps = {
  mapData: MapData;
  parent: 'cities' | 'offer';
  selectedPoint?: SelectedPoint;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: MarkerUrl.Default,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: MarkerUrl.Current,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
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
    <section data-testid="place-map" className={`${parent}__map map`} ref={mapRef}></section>
  );
}

export default PlaceMap;
