"use client";

import { memo } from "react";

import L from "leaflet";

import MarkerClusterGroup from "react-leaflet-cluster";

import { Property } from "@/types/property";

import MapMarkers from "./map-markers";

import { getClusterColor } from "./utils/cluster-color";

import { GeoFilter } from "@/types/geo-filter";

type Props = {
  data: Property[];
  onPropertySelect?: (property: Property) => void;
  geoFilter: GeoFilter;
};

function MapClustersComponent({ data, onPropertySelect, geoFilter }: Props) {
  return (
    <MarkerClusterGroup
      iconCreateFunction={(cluster: { getChildCount: () => number }) => {
        const count = cluster.getChildCount();

        const color = getClusterColor(count);

        let size = 40;

        if (count > 50) {
          size = 50;
        }

        if (count > 100) {
          size = 60;
        }

        return L.divIcon({
          html: `
            <div 
              class="cluster-circle"
              style="
                width:${size}px;
                height:${size}px;
                background:${color}
              "
            >
              ${count}
            </div>
          `,
          className: "",
          iconSize: [size, size],
        });
      }}
    >
      <MapMarkers
        data={data}
        geoFilter={geoFilter}
        onPropertySelect={onPropertySelect}
      />
    </MarkerClusterGroup>
  );
}

export default memo(MapClustersComponent, (prev, next) => {
  return JSON.stringify(prev.data) === JSON.stringify(next.data);
});
