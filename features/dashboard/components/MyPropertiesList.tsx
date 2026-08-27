"use client";

import { useEffect, useState } from "react";

import PropertyCard from "@/components/property/property-card";

import { usePropertiesRealtime } from "@/hooks/use-properties-realtime";

export default function MyPropertiesList({
  initialProperties,
}: {
  initialProperties: any[];
}) {
  const [properties, setProperties] = useState<any[]>(initialProperties);

  useEffect(() => {
    setProperties(initialProperties);
  }, [initialProperties]);

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
      <div className="rounded-2xl border border-[var(--border)] bg-white p-10 text-center text-[var(--muted-foreground)]">
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
