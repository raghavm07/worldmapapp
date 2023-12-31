import { useEffect, useRef } from "react";

import { MapContainer, TileLayer, Popup, useMap, Marker } from "react-leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
const icon = L.icon({
  iconUrl: "./marker.png",
  iconSize: [38, 38],
});

const FLAG_API_BASE_URL = "https://flagcdn.com";

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
        map.flyTo([selectPosition.lat, selectPosition.lon], 7, {
          duration: 1, // Animation duration in seconds
        });
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
              <img
                src={`${FLAG_API_BASE_URL}/${selectPosition?.address?.country_code.toLowerCase()}.svg`}
                alt="Country Flag"
                style={{
                  width: 40,
                  height: 40,
                  // alignItems: "center",
                  // justifyContent: "center",
                }}
              />
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
