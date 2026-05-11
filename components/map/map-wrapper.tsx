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
    refetchData: () => Promise<void>;
  }) => void;

  onDataChange?: (data: Property[]) => void;

  onLoadingChange?: (loading: boolean) => void;

  onPropertySelect?: (property: Property) => void;
}) {
  const mapRef = useRef<Map | null>(null);

  const { data, isInitialLoading, isFetching, fetchData } = useMapData(initialData, filters);

  const { moveToLocation } = useMapGeocode(mapRef);

  useEffect(() => {
    if (isInitialLoading) {
      fetchData();
    }
  }, [isInitialLoading, fetchData]);

  // Refetch when filters change
  useEffect(() => {
    fetchData();
  }, [filters, fetchData]);

  useEffect(() => {
    onDataChange?.(data);
  }, [data, onDataChange]);

  // Only report initial loading state (for skeleton), not background fetches
  useEffect(() => {
    onLoadingChange?.(isInitialLoading);
  }, [isInitialLoading, onLoadingChange]);

  useEffect(() => {
    if (onMapReady) {
      onMapReady({
        moveToLocation,
        refetchData: () => Promise.resolve(fetchData()),
      });
    }
  }, [moveToLocation, onMapReady, fetchData]);

  return (
    <div className="relative h-full">
      {/* Only show loading overlay on initial load when NO data exists */}
      {isInitialLoading && data.length === 0 && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-[var(--surface)]/80 backdrop-blur-sm">
          <div className="rounded-2xl bg-[var(--card)] border border-[var(--border)] px-6 py-4 shadow-xl text-[var(--foreground)]">
            Loading map...
          </div>
        </div>
      )}

      <MapView
        data={data}
        onMove={fetchData}
        onMapLoad={(map) => (mapRef.current = map)}
        onPropertySelect={onPropertySelect}
      />
    </div>
  );
}
