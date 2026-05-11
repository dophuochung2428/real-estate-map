import Container from "@/components/layout/container";

import MainHeader from "@/components/layout/header/main-header";

import PropertyGallery from "@/components/property/property-gallery";

import PropertyInfo from "@/components/property/property-info";

import ContactSidebar from "@/components/property/contact-sidebar";

import AmenitiesSection from "@/components/property/amenities-section";

import SimilarProperties from "@/components/property/similar-properties";

import MortgageCalculator from "@/components/property/mortgage-calculator";

import type { Property } from "@/types/property";

export default function PropertyDetailPage() {
  const property: Property = {
    id: "1",
    title: "Test Property",

    price: 1000,
    area: 120,

    lat: 10.0452,
    lng: 105.7469,

    province: "Can Tho",
    district: "Ninh Kieu",
    address: "123 Test Street",

    type: "house_private",
    direction: "north",

    images: [],
  };
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <MainHeader />

      <section className="py-8">
        <Container>
          {/* GALLERY */}
          <div className="mb-8">
            <PropertyGallery property={property} />
          </div>

          {/* CONTENT */}
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* LEFT */}
            <div className="space-y-8">
              <PropertyInfo property={property} />

              <AmenitiesSection />

              <MortgageCalculator />

              <SimilarProperties />
            </div>

            {/* RIGHT */}
            <div>
              <ContactSidebar />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
