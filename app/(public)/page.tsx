import MainHeader from "@/components/layout/header/main-header";

import HeroSection from "@/components/home/hero/hero-section";

import FeaturedSection from "@/components/home/featured/featured-section";

import LocationSection from "@/components/home/location/location-section";

import MobileBottomNav from "@/components/mobile/mobile-bottom-nav";

import FloatingActions from "@/components/common/floating-actions";

import { getProvinces } from "@/services/property.server";

export default async function HomePage() {
  const provinces = await getProvinces();

  return (
    <main className="bg-[var(--background)] pb-24 lg:pb-0">
      <MainHeader />

      <HeroSection provinces={provinces} />

      {/* <HighlightSection /> */}

      <FeaturedSection />

      <LocationSection />

      {/* <MapPreviewSection /> */}

      <FloatingActions />

      <MobileBottomNav />
    </main>
  );
}
