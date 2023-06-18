import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  useMap,
  Marker,
  GeoJSON,
} from "react-leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
const icon = L.icon({
  iconUrl: "./marker.png",
  iconSize: [38, 38],
});

const Map = (props) => {
  const { selectPosition } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
  const markerRef = useRef(null);
  const popupRef = useRef(null);

  const handleMarkerMouseOver = () => {
    if (markerRef.current && popupRef.current) {
      markerRef.current.openPopup();
    }
  };

  const handleMarkerMouseOut = () => {
    if (markerRef.current && popupRef.current) {
      markerRef.current.closePopup();
    }
  };

  function ResetCenterView(props) {
    const { selectPosition } = props;
    const map = useMap();

    useEffect(() => {
      if (markerRef.current && popupRef.current) {
        markerRef.current.openPopup();
      }
    }, []);

    useEffect(() => {
      if (selectPosition) {
        console.log(selectPosition);
        map.setView(
          L.latLng(selectPosition?.lat, selectPosition?.lon),
          map.getZoom(),
          {
            animate: true,
          }
        );
      }
    }, [selectPosition, map]);

    return null;
  }

  return (
    <>
      <MapContainer center={[28.7, 77.1]} zoom={2} scrollWheelZoom={false}>
        <TileLayer url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=qqzfBx2XgGGoSibOKTp1" />

        {selectPosition && (
          <Marker
            position={locationSelection}
            icon={icon}
            ref={markerRef}
            eventHandlers={{
              mouseover: handleMarkerMouseOver,
              mouseout: handleMarkerMouseOut,
            }}
          >
            <Popup className="popup" ref={popupRef}>
              <h5>Country Name: {selectPosition.address.country}</h5>
              <h5>Country Code: {selectPosition.address.country_code}</h5>
              <h5> State: {selectPosition.address.state}</h5>
              <h5> Region: {selectPosition.address.region}</h5>
            </Popup>
          </Marker>
        )}
        <ResetCenterView selectPosition={selectPosition} />
      </MapContainer>
    </>
  );
};

export default Map;
