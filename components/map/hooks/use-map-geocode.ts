import { useCallback, useRef } from "react";

import { Map as LeafletMap } from "leaflet";

export function useMapGeocode(mapRef: React.RefObject<LeafletMap | null>) {
  const cache = useRef(new Map<string, [number, number]>());

  const moveToLocation = useCallback(
    async (address: string) => {
      if (!mapRef.current) {
        throw new Error("Map not initialized");
      }

      if (cache.current.has(address)) {
        const cached = cache.current.get(address)!;
        mapRef.current.flyTo(cached, 13, { duration: 1.5 });
        return;
      }

      const query = `${address}, Việt Nam`;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=vn&limit=5&accept-language=vi`,
      );

      const results = await response.json();

      if (!results.length) {
        throw new Error("Không tìm thấy địa chỉ");
      }

      const best =
        results.find((r: { display_name: string }) =>
          r.display_name.includes("Hồ Chí Minh"),
        ) || results[0];

      const lat = parseFloat(best.lat);

      const lng = parseFloat(best.lon);

      cache.current.set(address, [lat, lng]);

      mapRef.current.flyTo([lat, lng], 13, { duration: 1.5 });
    },
    [mapRef],
  );

  return {
    moveToLocation,
  };
}
