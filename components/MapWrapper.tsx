"use client";

import dynamic from "next/dynamic";
import { supabase } from "../lib/supabase";
import { Property } from "@/types/property";
import { useState, useEffect, useRef } from "react";
import { Filters } from "@/types/filter";

const Map = dynamic(() => import("./Map"), { ssr: false });

type Bounds = {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
};

export default function MapWrapper({
  data: initialData,
  filters,
  onMapReady,
}: {
  data: Property[];
  filters: Filters;
  onMapReady?: (controls: {
    moveToLocation: (address: string) => Promise<void>;
  }) => void;
}) {
  const mapRef = useRef<L.Map | null>(null);

  const [data, setData] = useState<Property[]>(initialData);
  const [searchLocation, setSearchLocation] = useState<string>("");

  const moveToLocation = async (address: string) => {
    setSearchLocation(address);
    if (!mapRef.current) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
          `format=json&q=${encodeURIComponent(address)}&` +
          `countrycodes=vn&limit=1&accept-language=vi`,
      );
      const results = await response.json();

      if (results.length > 0) {
        const { lat, lon } = results[0];
        mapRef.current.setView([parseFloat(lat), parseFloat(lon)], 14); // ✅ Correct Leaflet API
        console.log(`✅ Moved to "${address}": ${lat}, ${lon}`);
      }
    } catch (error) {
      console.error("📍 Not found:", address);
    }
  };

  const fetchData = async (bounds?: Bounds) => {
    let query = supabase.from("properties").select("*");

    // FILTER
    if (filters.type) query = query.eq("type", filters.type);
    if (filters.direction) query = query.eq("direction", filters.direction);

    if (filters.minPrice) query = query.gte("price", filters.minPrice);
    if (filters.maxPrice) query = query.lte("price", filters.maxPrice);

    if (filters.minArea) query = query.gte("area", filters.minArea);
    if (filters.maxArea) query = query.lte("area", filters.maxArea);

    if (filters.keyword) query = query.eq("id", filters.keyword);

    if (filters.location) {
      query = query.ilike("address", `%${filters.location}%`);
    }

    // nếu không filter → dùng bounds
    const hasFilter =
      filters.type ||
      filters.direction ||
      filters.minPrice ||
      filters.maxPrice ||
      filters.minArea ||
      filters.maxArea ||
      filters.keyword ||
      filters.location;

    if (!hasFilter && bounds) {
      query = query
        .gte("lat", bounds.minLat)
        .lte("lat", bounds.maxLat)
        .gte("lng", bounds.minLng)
        .lte("lng", bounds.maxLng);
    }

    const { data, error } = await query.limit(500);

    if (!error) setData(data || []);
  };

  useEffect(() => {
    if (mapRef.current && onMapReady) {
      onMapReady({ moveToLocation });
    }
  }, [onMapReady, moveToLocation]);

  // khi filter đổi
  useEffect(() => {
    fetchData();
  }, [filters]);

  return (
    <Map
      data={data}
      onMove={fetchData}
      onMapLoad={(map) => (mapRef.current = map)}
    />
  );
}
