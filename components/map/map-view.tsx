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

import MapHighlight from "./map-highlight";

import { Circle, Marker } from "react-leaflet";
import MapRadiusFilter from "./map-radius-filter";

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

function MapViewComponent({
  data,
  onMove,
  onMapLoad,
  onPropertySelect,
  highlightGeoJson,
  geoFilter,
  onLocateUser,
  showRadiusPanel,
  onHideRadiusPanel,
  onRadiusChange,
}: MapViewProps) {
  return (
    <MapContainer
      center={[10.0125, 105.0809]}
      zoom={12}
      className="h-full w-full"
    >
      <MapInit onMapLoad={onMapLoad} />

      <MapEvents onMove={onMove} />

      <MapControls />

      <MapHighlight data={highlightGeoJson} />

      <MapRadiusFilter
        enabled={geoFilter.enabled}
        radius={geoFilter.radius}
        showPanel={showRadiusPanel}
        onLocateUser={onLocateUser}
        onRadiusChange={onRadiusChange}
        onHidePanel={onHideRadiusPanel}
      />

      {geoFilter.enabled && geoFilter.center && (
        <>
          <Marker position={geoFilter.center} />

          <Circle
            center={geoFilter.center}
            radius={geoFilter.radius}
            pathOptions={{
              color: "#2563eb",
              fillColor: "#3b82f6",
              fillOpacity: 0.15,
            }}
          />
        </>
      )}

      <MapClusters
        key={`${geoFilter.enabled}-${geoFilter.radius}`}
        data={data}
        geoFilter={geoFilter}
        onPropertySelect={onPropertySelect}
      />
    </MapContainer>
  );
}

export default memo(MapViewComponent);
