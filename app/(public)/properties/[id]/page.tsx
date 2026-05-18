import { notFound } from "next/navigation";

import MainHeader from "@/components/layout/header/main-header";

import PropertyGallery from "@/components/property/detail/property-gallery";
import PropertyInfo from "@/components/property/detail/property-info";
import PropertySidebar from "@/components/property/detail/property-sidebar";
import PropertyMap from "@/components/property/detail/property-map";
import SimilarProperties from "@/components/property/detail/similar-properties";

import { addRecentlyViewed, getPropertyById } from "@/services/property.server";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  await addRecentlyViewed(id);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <MainHeader />

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* BREADCRUMB */}
        <div className="mb-5 text-sm text-[var(--muted-foreground)]">
          Trang chủ / Bất động sản / {property.title}
        </div>

        {/* GALLERY */}
        <PropertyGallery property={property} />

        {/* CONTENT */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* LEFT */}
          <div className="space-y-8">
            <PropertyInfo property={property} />

            <PropertyMap property={property} />

            <SimilarProperties
              propertyId={property.id}
              district={property.district}
              type={property.type}
            />
          </div>

          {/* RIGHT */}
          <PropertySidebar property={property} />
        </div>
      </div>
    </main>
  );
}
