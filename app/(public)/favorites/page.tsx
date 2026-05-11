"use client";

import { useMemo } from "react";

import MainHeader from "@/components/layout/header/main-header";

import HorizontalPropertyCard from "@/components/listing/horizontal-property-card";

import { useFavorites } from "@/hooks/use-favorites";

import { Property } from "@/types/property";

const mockData: Property[] = [
  {
    id: "1",

    title: "Căn hộ cao cấp",

    price: 3200000000,

    area: 120,

    lat: 10.0452,

    lng: 105.7469,

    province: "Cần Thơ",

    district: "Ninh Kiều",

    address: "Ninh Kiều",

    type: "apartment",

    direction: "east",
  },

  {
    id: "2",

    title: "Nhà phố hiện đại",

    price: 5800000000,

    area: 200,

    lat: 10.0333,

    lng: 105.78,

    province: "Cần Thơ",

    district: "Cái Răng",

    address: "Cái Răng",

    type: "house_private",

    direction: "south",
  },
];

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const properties = useMemo(() => {
    return mockData.filter((property) => favorites.includes(property.id));
  }, [favorites]);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <MainHeader />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Tin đã lưu</h1>

          <p className="mt-2 text-gray-500">{properties.length} bất động sản</p>
        </div>

        <div className="grid gap-5">
          {properties.map((property) => (
            <HorizontalPropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
}
