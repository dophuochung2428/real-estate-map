import { useCallback, useRef, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import { Property } from "@/types/property";

import { Filters } from "@/types/filter";

import { Bounds } from "../types";

export function useMapData(initialData: Property[], filters: Filters) {
  const [data, setData] = useState(initialData);

  const [isInitialLoading, setIsInitialLoading] = useState(
    initialData.length === 0,
  );

  const [isFetching, setIsFetching] = useState(false);

  const lastBoundsRef = useRef<Bounds | null>(null);

  const fetchData = useCallback(
    async (bounds?: Bounds) => {
      // Skip if bounds haven't changed significantly (within ~0.0001 degrees ~10m)
      if (lastBoundsRef.current && bounds) {
        const latDiff =
          Math.abs(bounds.maxLat - lastBoundsRef.current.maxLat) +
          Math.abs(bounds.minLat - lastBoundsRef.current.minLat);

        const lngDiff =
          Math.abs(bounds.maxLng - lastBoundsRef.current.maxLng) +
          Math.abs(bounds.minLng - lastBoundsRef.current.minLng);
        if (latDiff < 0.0001 && lngDiff < 0.0001) {
          return;
        }
      }
      lastBoundsRef.current = bounds ?? null;

      setIsFetching(true);

      try {
        const supabase = await createClient();
        let query = supabase.from("properties").select("*");

        if (filters.type) {
          query = query.eq("type", filters.type);
        }

        if (filters.direction) {
          query = query.eq("direction", filters.direction);
        }

        if (filters.minPrice) {
          query = query.gte("price", filters.minPrice);
        }

        if (filters.maxPrice) {
          query = query.lte("price", filters.maxPrice);
        }

        if (filters.minArea) {
          query = query.gte("area", filters.minArea);
        }

        if (filters.maxArea) {
          query = query.lte("area", filters.maxArea);
        }

        if (filters.keyword) {
          query = query.or(
            `title.ilike.%${filters.keyword}%,address.ilike.%${filters.keyword}%`,
          );
        }

        if (filters.location) {
          query = query.ilike("address", `%${filters.location}%`);
        }

        if (bounds) {
          query = query
            .gte("lat", bounds.minLat)
            .lte("lat", bounds.maxLat)
            .gte("lng", bounds.minLng)
            .lte("lng", bounds.maxLng);
        }

        const { data: result } = await query.limit(500);

        setData(result || []);
        setIsInitialLoading(false);
      } finally {
        setIsFetching(false);
      }
    },
    [filters],
  );

  return {
    data,
    isInitialLoading,
    isFetching,
    fetchData,
  };
}
