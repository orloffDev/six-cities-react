//vendors
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
//react
import {useRef, useEffect} from 'react';
//hooks
import useMap from '../../hooks/useMap';
//types
import {MapData} from "../../types/map-data";

type PlaceMapProps = {
  mapData: MapData
}

function PlaceMap({mapData}: PlaceMapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, mapData.center);

  useEffect(() => {
    if (map) {
      mapData['points'].forEach((point) => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          })
          .addTo(map);
      });
    }
  }, [map]);


  return (
    <section className="cities__map map" ref={mapRef}></section>
  );
}

export default PlaceMap;
