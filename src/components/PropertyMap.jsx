import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useAppContext } from "../context/AppContext";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const PropertyMap = ({ height = 400 }) => {
  const { properties } = useAppContext();

  const center = properties.length
    ? [properties[0].lat, properties[0].lon]
    : [-14.235, -51.9253];

  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ height }}
      scrollWheelZoom={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {properties.map((p) => (
        <Marker key={p.id} position={[p.lat, p.lon]}>
          <Popup>
            <strong>{p.name}</strong>
            <br />
            {p.type}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default PropertyMap;
