"use client";

import dynamic from "next/dynamic";

import { useEffect, useRef, memo } from "react";

import type { Map } from "leaflet";

import { Property } from "@/types/property";

import { Filters } from "@/types/filter";

import { useMapData } from "./hooks/use-map-data";

import { useMapGeocode } from "./hooks/use-map-geocode";

const MapView = dynamic(() => import("./map-view"), {
  ssr: false,
});

export default function MapWrapper({
  data: initialData,
  filters,
  onMapReady,
  onDataChange,
  onLoadingChange,
  onPropertySelect,
}: {
  data: Property[];

  filters: Filters;

  onMapReady?: (controls: {
    moveToLocation: (address: string) => Promise<void>;
  }) => void;

  onDataChange?: (data: Property[]) => void;

  onLoadingChange?: (loading: boolean) => void;

  onPropertySelect?: (property: Property) => void;
}) {
  const mapRef = useRef<Map | null>(null);

  const { data, isInitialLoading, isFetching, fetchData } = useMapData(
    initialData,
    filters,
  );

  const { moveToLocation } = useMapGeocode(mapRef);

  // Refetch when filters change
  useEffect(() => {
    fetchData();
  }, [filters, fetchData]);

  useEffect(() => {
    onDataChange?.(data);
  }, [data, onDataChange]);

  // Only report initial loading state (for skeleton), not background fetches
  useEffect(() => {
    onLoadingChange?.(isInitialLoading || isFetching);
  }, [isInitialLoading, onLoadingChange]);

  useEffect(() => {
    if (onMapReady) {
      onMapReady({
        moveToLocation,
      });
    }
  }, [moveToLocation, onMapReady, fetchData]);

  return (
    <div className="relative h-full">
      <MapView
        data={data}
        onMove={fetchData}
        onMapLoad={(map) => (mapRef.current = map)}
        onPropertySelect={onPropertySelect}
      />
    </div>
  );
}
