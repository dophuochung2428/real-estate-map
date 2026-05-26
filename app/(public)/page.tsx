import MainHeader from "@/components/layout/header/main-header";

import HeroSection from "@/components/home/hero/hero-section";

import FeaturedSection from "@/components/home/featured/featured-section";

import LocationSection from "@/components/home/location/location-section";

import MobileBottomNav from "@/components/mobile/mobile-bottom-nav";

import FloatingActions from "@/components/common/floating-actions";

import { getProperties, getProvinces } from "@/services/property.server";

import MainFooter from "@/components/layout/footer/main-footer";

export default async function HomePage() {
  const provinces = await getProvinces();

  const { data: properties } = await getProperties();

  return (
    <main className="bg-[var(--background)] pb-24 lg:pb-0">
      <MainHeader />

      <HeroSection provinces={provinces} />

      {/* <HighlightSection /> */}

      <FeaturedSection properties={properties} />

      <LocationSection properties={properties} />

      {/* <MapPreviewSection /> */}

      <FloatingActions />

      <MainFooter />

      {/* <MobileBottomNav /> */}
    </main>
  );
}
