"use client";

import ImageUploadSection from "./image-upload-section";

import BasicInfoSection from "./sections/basic-info-section";

import PricingSection from "./sections/pricing-section";

import AmenitiesSelector from "./sections/amenities-selector";

import DescriptionSection from "./sections/description-section";

export default function CreatePropertyForm() {
  return (
    <div className="space-y-8">
      {/* IMAGES */}
      <ImageUploadSection />

      {/* BASIC */}
      <BasicInfoSection />

      {/* PRICE */}
      <PricingSection />

      {/* AMENITIES */}
      <AmenitiesSelector />

      {/* DESCRIPTION */}
      <DescriptionSection />

      {/* ACTIONS */}
      <div className="flex flex-wrap justify-end gap-4">
        <button className="rounded-2xl border px-6 py-4 font-semibold">
          Lưu nháp
        </button>

        <button className="rounded-2xl bg-red-600 px-6 py-4 font-semibold text-white">
          Đăng tin
        </button>
      </div>
    </div>
  );
}
