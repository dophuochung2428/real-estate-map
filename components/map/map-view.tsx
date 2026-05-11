"use client";

import { memo } from "react";

import { MapContainer } from "react-leaflet";

import L from "leaflet";

import "leaflet.markercluster/dist/MarkerCluster.css";

import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import MapInit from "./map-init";

import MapEvents from "./map-events";

import MapControls from "./map-controls";

import MapClusters from "./map-clusters";

import { MapViewProps } from "./types";

delete (
  L.Icon.Default.prototype as unknown as {
    _getIconUrl?: string;
  }
)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapViewComponent({ data, onMove, onMapLoad, onPropertySelect }: MapViewProps) {
  return (
    <MapContainer
      center={[10.0452, 105.7469]}
      zoom={13}
      className="h-full w-full"
    >
      <MapInit onMapLoad={onMapLoad} />

      <MapEvents onMove={onMove} />

      <MapControls />

      <MapClusters data={data} onPropertySelect={onPropertySelect} />
    </MapContainer>
  );
}

export default memo(MapViewComponent);
