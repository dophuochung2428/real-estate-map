"use client";

import { memo } from "react";

import { LayersControl, TileLayer } from "react-leaflet";

const { BaseLayer } = LayersControl;

function MapControlsComponent() {
  return (
    <LayersControl position="topright">
      {/* <BaseLayer checked name="Bản đồ">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </BaseLayer> */}
      <BaseLayer checked name="Bản đồ">
        <TileLayer
          url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />
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
  );
}

export default memo(MapControlsComponent);
