import MainHeader from "@/components/layout/header/main-header";

import HeroSection from "@/components/home/hero/hero-section";

import HighlightSection from "@/components/home/featured/highlight-section";

import FeaturedSection from "@/components/home/featured/featured-section";

import LocationSection from "@/components/home/location/location-section";

import MapPreviewSection from "@/components/home/map-preview-section";

import MobileBottomNav from "@/components/mobile/mobile-bottom-nav";

import FloatingActions from "@/components/common/floating-actions";

export default function HomePage() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  console.log("APP_URL:", process.env.NEXT_PUBLIC_APP_URL);
  return (
    <main className="bg-[var(--background)] pb-24 lg:pb-0">
      <MainHeader />

      <HeroSection />

      <HighlightSection />

      <FeaturedSection />

      <LocationSection />

      <MapPreviewSection />

      <FloatingActions />

      <MobileBottomNav />
    </main>
  );
}
