"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import { Property } from "../types/property";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import MarkerClusterGroup from "react-leaflet-cluster";

// fix icon path
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const { BaseLayer } = LayersControl;

type Bounds = {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
};
type MapProps = {
  data: Property[];
  onMove: (bounds: Bounds) => void;
};

function MapEvents({ onMove }: { onMove: (bounds: Bounds) => void }) {
  const map = useMap();

  useEffect(() => {
    const handleMove = () => {
      const bounds = map.getBounds();

      onMove({
        minLat: bounds.getSouth(),
        maxLat: bounds.getNorth(),
        minLng: bounds.getWest(),
        maxLng: bounds.getEast(),
      });
    };

    map.on("moveend", handleMove);

    return () => {
      map.off("moveend", handleMove);
    };
  }, [map, onMove]);

  return null;
}

export default function Map({ data, onMove }: MapProps) {
  return (
    <MapContainer
      center={[10.0452, 105.7469]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <LayersControl position="topright">
        {/* 🗺️ Map thường */}
        <BaseLayer checked name="Bản đồ">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </BaseLayer>

        {/* 🛰️ Vệ tinh */}
        <BaseLayer name="Vệ tinh">
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
        </BaseLayer>

        {/* 🛣️ Giao thông */}
        <BaseLayer name="Đường đi">
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
        </BaseLayer>
      </LayersControl>

      <MapEvents onMove={onMove} />
      <MarkerClusterGroup
        iconCreateFunction={(cluster: any) => {
          const count = cluster.getChildCount();

          return L.divIcon({
            html: `
        <div class="cluster-img">
          <img src="https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png" />
          <span>${count}</span>
        </div>
      `,
            className: "cluster-wrapper",
            iconSize: [30, 50],
            iconAnchor: [15, 50],
          });
        }}
      >
        {data.map((item) => (
          <Marker key={item.id} position={[item.lat, item.lng]}>
            <Popup>
              <b>{item.title}</b>
              <br />
              Giá: {item.price}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
