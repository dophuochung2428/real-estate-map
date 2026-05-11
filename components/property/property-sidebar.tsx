"use client";

import { Phone, Heart } from "lucide-react";

import FavoriteButton from "@/components/favorite/favorite-button";

import { Property } from "@/types/property";

export default function PropertySidebar({ property }: { property: Property }) {
  return (
    <div className="sticky top-24 rounded-3xl bg-[var(--card)] p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-600">
          A
        </div>

        <div>
          <p className="font-semibold">Nguyễn Văn A</p>

          <p className="text-sm text-gray-500">Môi giới chuyên nghiệp</p>
        </div>
      </div>

      <button className="mb-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-red-600 font-semibold text-white transition hover:bg-red-700">
        <Phone size={18} />
        Liên hệ ngay
      </button>

      <div className="mb-5 flex justify-end">
        <FavoriteButton propertyId={property.id} />
      </div>
    </div>
  );
}
