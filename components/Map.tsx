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

const getColorByPrice = (price: number, min: number, max: number) => {
  if (min === max) return "#22c55e";

  const ratio = (price - min) / (max - min);

  if (ratio < 0.33) return "#22c55e"; // rẻ
  if (ratio < 0.66) return "#f59e0b"; // trung
  return "#ef4444"; // đắt
};

const formatPrice = (price: number) => {
  if (price >= 1_000_000_000) {
    const ty = Math.floor(price / 1_000_000_000);
    const du = price % 1_000_000_000;

    if (du === 0) return `${ty} tỷ`;

    const tr = Math.floor(du / 100_000_000); // lấy hàng trăm triệu
    return `${ty} tỷ ${tr}`;
  }

  if (price >= 1_000_000) {
    const tr = Math.floor(price / 1_000_000);
    return `${tr}tr`;
  }

  if (price >= 1_000) {
    const k = Math.floor(price / 1_000);
    return `${k}k`;
  }

  return price.toString();
};

const createMarkerIcon = (price: number, min: number, max: number) => {
  const color = getColorByPrice(price, min, max);

  return L.divIcon({
    html: `
      <div class="marker-wrapper">
        <svg viewBox="0 0 24 24" width="40" height="50">
          <path 
            fill="${color}" 
            stroke="white"
            stroke-width="1"
            d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"
          />
          <circle cx="12" cy="9" r="3" fill="white"/>
        </svg>
        <div class="marker-price">${formatPrice(price)}</div>
      </div>
    `,
    className: "",
    iconSize: [40, 50],
    iconAnchor: [20, 50],
  });
};

const getClusterColor = (count: number) => {
  if (count < 10) return "linear-gradient(135deg, #4ade80, #22c55e)";
  if (count < 30) return "linear-gradient(135deg, #22c55e, #16a34a)";
  if (count < 70) return "linear-gradient(135deg, #facc15, #f59e0b)";
  return "linear-gradient(135deg, #f87171, #ef4444)";
};

export default function Map({ data, onMove }: MapProps) {
  const prices = data.map((item) => item.price);

  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  return (
    <MapContainer
      center={[10.0452, 105.7469]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <LayersControl position="topright">
        <BaseLayer checked name="Bản đồ">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </BaseLayer>

        <BaseLayer name="Vệ tinh">
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
        </BaseLayer>

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
          const color = getClusterColor(count);

          let size = 40;
          if (count > 50) size = 50;
          if (count > 100) size = 60;

          return L.divIcon({
            html: `
      <div 
      class="cluster-circle" 
    style="width:${size}px;height:${size}px;background:${color}"
      >
        ${count}
      </div>
    `,
            className: "",
            iconSize: [size, size],
          });
        }}
      >
        {data.map((item) => (
          <Marker
            key={item.id}
            position={[item.lat, item.lng]}
            icon={createMarkerIcon(item.price, minPrice, maxPrice)}
          >
            <Popup>
              <b>{item.title}</b>
              <br />
              Giá: {formatPrice(item.price)}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
