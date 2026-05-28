"use client";

import { useState } from "react";

import PropertyCard from "@/components/property/property-card";

import { usePropertiesRealtime } from "@/hooks/use-properties-realtime";

export default function MyPropertiesList({
  initialProperties,
}: {
  initialProperties: any[];
}) {
  const [properties, setProperties] = useState(initialProperties);

  usePropertiesRealtime((payload) => {
    const { eventType, new: newRow, old } = payload;

    // INSERT
    if (eventType === "INSERT") {
      setProperties((prev) => [newRow, ...prev]);
    }

    // UPDATE
    if (eventType === "UPDATE") {
      setProperties((prev) =>
        prev.map((item) =>
          item.id === newRow.id
            ? {
                ...item,
                ...newRow,
              }
            : item,
        ),
      );
    }

    // DELETE
    if (eventType === "DELETE") {
      setProperties((prev) => prev.filter((item) => item.id !== old.id));
    }
  });

  if (properties.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-gray-400">
        Chưa có tin đăng nào
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {properties.map((property: any) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
