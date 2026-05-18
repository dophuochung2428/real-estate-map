"use client";

import Image from "next/image";

import Link from "next/link";

import { BedDouble, MapPin, Move } from "lucide-react";

type Props = {
  property: any;
};

export default function PropertyCard({ property }: Props) {
  const thumbnail =
    property.property_images?.find((img: any) => img.is_thumbnail)?.image_url ||
    property.property_images?.[0]?.image_url ||
    "https://placehold.co/600x400";

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={thumbnail}
          alt={property.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        {/* TAG */}
        <div className="absolute left-4 top-4 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-[var(--primary-foreground)]">
          Nổi bật
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* PRICE */}
        <div className="mb-3">
          <span className="text-2xl font-bold text-[var(--primary)]">
            {property.price?.toLocaleString()}đ
          </span>
        </div>

        {/* TITLE */}
        <h3 className="mb-3 line-clamp-2 text-lg font-bold transition group-hover:text-[var(--primary)]">
          {property.title}
        </h3>

        {/* FEATURES */}
        <div className="mb-4 flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
          <div className="flex items-center gap-1">
            <BedDouble className="size-4" />
            {property.bedrooms || 0} PN
          </div>

          <div className="flex items-center gap-1">
            <Move className="size-4" />
            {property.area}m²
          </div>
        </div>

        {/* LOCATION */}
        <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
          <MapPin className="size-4" />

          {property.district || property.address}
        </div>
      </div>
    </Link>
  );
}
