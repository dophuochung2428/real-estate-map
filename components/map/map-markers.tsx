"use client";

import { memo, useMemo } from "react";

import { Marker, Popup } from "react-leaflet";

import { Property } from "@/types/property";

import { createMarkerIcon } from "./utils/marker-icon";

import { formatPrice } from "./utils/price-format";
import { GeoFilter } from "@/types/geo-filter";
import { isPointWithinRadius } from "geolib";

type Props = {
  data: Property[];
  geoFilter: GeoFilter;
  onPropertySelect?: (property: Property) => void;
};

function MapMarkersComponent({ data, geoFilter, onPropertySelect }: Props) {
  const isInsideRadius = (property: Property) => {
    if (!geoFilter.enabled || !geoFilter.center) {
      return true;
    }

    return isPointWithinRadius(
      {
        latitude: property.lat,
        longitude: property.lng,
      },
      {
        latitude: geoFilter.center[0],
        longitude: geoFilter.center[1],
      },
      geoFilter.radius,
    );
  };
  const prices = data.map((item) => item.price);

  const minPrice = prices.length ? Math.min(...prices) : 0;

  const maxPrice = prices.length ? Math.max(...prices) : 0;

  const markerIcons = useMemo(() => {
    const map = new Map();

    data.forEach((item) => {
      map.set(item.id, createMarkerIcon(item.price, minPrice, maxPrice));
    });

    return map;
  }, [data, minPrice, maxPrice]);

  return (
    <>
      {data.map((item) => {
        const inside = isInsideRadius(item);

        return (
          <Marker
            key={item.id}
            position={[item.lat, item.lng]}
            icon={markerIcons.get(item.id)}
            opacity={inside ? 1 : 0.25}
            eventHandlers={{
              click: () => {
                if (!inside) return;

                onPropertySelect?.(item);
              },
            }}
          >
            <Popup>
              <div className="space-y-2">
                <h3 className="font-bold">{item.title}</h3>

                <p className="text-red-600">{formatPrice(item.price)}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default memo(MapMarkersComponent, (prev, next) => {
  return (
    JSON.stringify(prev.data) === JSON.stringify(next.data) &&
    JSON.stringify(prev.geoFilter) === JSON.stringify(next.geoFilter)
  );
});
