"use client";

import dynamic from "next/dynamic";

import { useEffect, useRef, memo } from "react";

import type { Map } from "leaflet";

import { Property } from "@/types/property";

import { Filters } from "@/types/filter";

import { useMapData } from "./hooks/use-map-data";

import { useMapGeocode } from "./hooks/use-map-geocode";

import { GeoFilter } from "@/types/geo-filter";

const MapView = dynamic(() => import("./map-view"), {
  ssr: false,
});

export default function MapWrapper({
  data: initialData,
  filters,
  geoFilter,
  setGeoFilter,
  onMapReady,
  onDataChange,
  onLoadingChange,
  onPropertySelect,
}: {
  data: Property[];

  filters: Filters;

  geoFilter: GeoFilter;

  setGeoFilter: React.Dispatch<React.SetStateAction<GeoFilter>>;

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

  const { moveToLocation, highlightGeoJson } = useMapGeocode(mapRef);

  const handleLocateUser = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setGeoFilter({
          enabled: true,
          center: [lat, lng],
          radius: 1000,
        });

        mapRef.current?.flyTo([lat, lng], 14, {
          animate: true,
        });
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      },
    );
  };

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
        highlightGeoJson={highlightGeoJson}
        geoFilter={geoFilter}
        onLocateUser={handleLocateUser}
        onRadiusChange={(radius) => {
          setGeoFilter((prev) => ({
            ...prev,
            radius,
          }));
        }}
        onDisableGeoFilter={() => {
          setGeoFilter({
            enabled: false,
            center: null,
            radius: 1000,
          });
        }}
      />
    </div>
  );
}
