import { useCallback, useRef, useState } from "react";

import type { Map as LeafletMap, Marker } from "leaflet";

export function useMapGeocode(mapRef: React.RefObject<LeafletMap | null>) {
  const cache = useRef(new Map());

  const coordinateMarkerRef = useRef<Marker | null>(null);

  const [highlightGeoJson, setHighlightGeoJson] = useState<any>(null);

  const moveToLocation = useCallback(
    async (address: string) => {
      if (!mapRef.current) {
        throw new Error("Map not initialized");
      }

      const coordinateRegex = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/;

      // =========================
      // SEARCH BY COORDINATES
      // =========================
      if (coordinateRegex.test(address)) {
        const leaflet = await import("leaflet");

        const [lat, lng] = address.split(",").map((v) => Number(v.trim()));

        coordinateMarkerRef.current?.remove();

        const markerIcon = leaflet.divIcon({
          className: "coordinate-marker",
          html: `
      <div class="relative">
        <div class="h-5 w-5 rounded-full bg-blue-500 border-4 border-white shadow-xl"></div>
        <div class="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-60"></div>
      </div>
    `,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        coordinateMarkerRef.current = leaflet
          .marker([lat, lng], {
            icon: markerIcon,
          })
          .addTo(mapRef.current).bindPopup(`
      <div>
        <b>Tọa độ đã tìm</b><br/>
        ${lat}, ${lng}
      </div>
    `);

        mapRef.current.flyTo([lat, lng], 16, {
          duration: 1.5,
        });

        return;
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
