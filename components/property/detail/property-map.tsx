"use client";

import dynamic from "next/dynamic";

import { MapPin } from "lucide-react";

const PropertyMapClient = dynamic(() => import("./property-map-client"), {
  ssr: false,
});

export default function PropertyMap({ property }: { property: any }) {
  if (property.lat == null || property.lng == null) {
    return null;
  }

  return (
    <div className="rounded-3xl bg-[var(--card)] p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <MapPin className="text-red-600" />

        <h2 className="text-2xl font-bold">Vị trí bất động sản</h2>
      </div>

      <PropertyMapClient
        latitude={Number(property.lat)}
        longitude={Number(property.lng)}
      />
    </div>
  );
}
