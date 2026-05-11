"use client";

import { memo, useEffect } from "react";

import { useMap } from "react-leaflet";

import L from "leaflet";

function MapInitComponent({
  onMapLoad,
}: {
  onMapLoad?: (map: L.Map) => void;
}) {
  const map = useMap();

  useEffect(() => {
    if (onMapLoad) {
      onMapLoad(map);
    }
  }, [map, onMapLoad]);

  return null;
}

export default memo(MapInitComponent);
