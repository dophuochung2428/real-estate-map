"use client";

import { useEffect, useRef, memo } from "react";

import { useMap } from "react-leaflet";

import { Bounds } from "./types";

type Props = {
  onMove: (bounds: Bounds) => void;
};

function MapEventsComponent({ onMove }: Props) {
  const map = useMap();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMove = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const bounds = map.getBounds();

        onMove({
          minLat: bounds.getSouth(),
          maxLat: bounds.getNorth(),
          minLng: bounds.getWest(),
          maxLng: bounds.getEast(),
        });
      }, 300);
    };

    map.on("moveend", handleMove);

    return () => {
      map.off("moveend", handleMove);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [map, onMove]);

  return null;
}

export default memo(MapEventsComponent);
