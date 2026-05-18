import MainHeader from "@/components/layout/header/main-header";

import HorizontalPropertyCard from "@/components/listing/horizontal-property-card";

import { getFavorites } from "@/services/favorite.server";

export default async function SavedPage() {
  const favorites = await getFavorites();

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <MainHeader />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Tin đã lưu</h1>

        <div className="space-y-5">
          {favorites.map((item: any) => (
            <HorizontalPropertyCard
              key={item.property_id}
              property={item.properties}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
