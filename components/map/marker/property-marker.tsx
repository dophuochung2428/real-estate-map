"use client";

import { Marker, Popup } from "react-leaflet";

import { createMarkerIcon } from "./marker-icon";

import PropertyPopup from "../popup/property-popup";

export default function PropertyMarker({ property }: { property: any }) {
  return (
    <Marker
      position={[property.lat, property.lng]}
      icon={createMarkerIcon(property.price)}
    >
      <Popup>
        <PropertyPopup property={property} />
      </Popup>
    </Marker>
  );
}
