import MainHeader from "@/components/layout/header/main-header";

import PropertyGallery from "@/components/property/detail/property-gallery";

import PropertyInfo from "@/components/property/detail/property-info";

import PropertySidebar from "@/components/property/detail/property-sidebar";

import PropertyMap from "@/components/property/detail/property-map";

import SimilarProperties from "@/components/property/detail/similar-properties";

import { getPropertyById } from "@/services/property.service";

export default async function PropertyDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const property = await getPropertyById(params.id);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <MainHeader />

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* GALLERY */}
        <PropertyGallery property={property} />

        {/* CONTENT */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* LEFT */}
          <div className="space-y-8">
            <PropertyInfo property={property} />

            <PropertyMap property={property} />

            <SimilarProperties />
          </div>

          {/* RIGHT */}
          <PropertySidebar property={property} />
        </div>
      </div>
    </main>
  );
}
