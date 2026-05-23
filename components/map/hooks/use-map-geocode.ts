import { useCallback, useRef, useState } from "react";

import { Map as LeafletMap } from "leaflet";

export function useMapGeocode(mapRef: React.RefObject<LeafletMap | null>) {
  const cache = useRef(new Map());

  const [highlightGeoJson, setHighlightGeoJson] = useState<any>(null);

  const moveToLocation = useCallback(
    async (address: string) => {
      if (!mapRef.current) {
        throw new Error("Map not initialized");
      }

      // clear old highlight
      setHighlightGeoJson(null);

      /**
       * CACHE
       */
      if (cache.current.has(address)) {
        const cached = cache.current.get(address);

        setHighlightGeoJson(cached.geojson);

        // nếu có boundary -> fitBounds
        if (cached.boundingbox) {
          const bounds = [
            [Number(cached.boundingbox[0]), Number(cached.boundingbox[2])],
            [Number(cached.boundingbox[1]), Number(cached.boundingbox[3])],
          ];

          mapRef.current.fitBounds(bounds as any, {
            padding: [40, 40],
          });
        } else {
          mapRef.current.flyTo([cached.lat, cached.lng], 13, {
            duration: 1.5,
          });
        }

        return;
      }

      /**
       * FETCH
       */
      const response = await fetch(
        `/api/geocode?address=${encodeURIComponent(address)}`,
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      cache.current.set(address, result);

      setHighlightGeoJson(result.geojson);

      // nếu có boundary -> zoom đúng vùng
      if (result.boundingbox) {
        const bounds = [
          [Number(result.boundingbox[0]), Number(result.boundingbox[2])],
          [Number(result.boundingbox[1]), Number(result.boundingbox[3])],
        ];

        mapRef.current.fitBounds(bounds as any, {
          padding: [40, 40],
        });
      } else {
        mapRef.current.flyTo([result.lat, result.lng], 13, {
          duration: 1.5,
        });
      }
    },
    [mapRef],
  );

  return {
    moveToLocation,
    highlightGeoJson,
  };
}
