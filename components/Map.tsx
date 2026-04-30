"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";

const { BaseLayer } = LayersControl;

export default function Map({ data }: any) {
  return (
    <MapContainer
      center={[10.0452, 105.7469]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
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

      {data.map((item: any) => (
        <Marker key={item.id} position={[item.lat, item.lng]}>
          <Popup>
            <b>{item.title}</b>
            <br />
            Giá: {item.price}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
