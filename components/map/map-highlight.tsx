"use client";

import { GeoJSON } from "react-leaflet";

type Props = {
  data: any;
};

export default function MapHighlight({ data }: Props) {
  if (!data) return null;

  return (
    <GeoJSON
      data={data}
      style={() => ({
        color: "#ef4444",
        weight: 4,
        fillColor: "#ef4444",
        fillOpacity: 0.15,
      })}
    />
  );
}
