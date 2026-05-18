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
      className="group overflow-hidden rounded-[30px] border border-white/10 bg-[var(--card)] transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* IMAGE */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={thumbnail}
          alt={property.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* PRICE */}
        <div className="absolute bottom-5 left-5">
          <p className="text-3xl font-extrabold tracking-tight text-white">
            {property.price?.toLocaleString()}đ
          </p>

          <div className="mt-3 flex items-center gap-4 text-sm text-white/80">
            <div className="flex items-center gap-1">
              <Move className="size-4" />
              {property.area}m²
            </div>

            {property.bedrooms ? (
              <div className="flex items-center gap-1">
                <BedDouble className="size-4" />
                {property.bedrooms}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-white transition group-hover:text-red-500">
          {property.title}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm text-white/50">
          <MapPin className="size-4 shrink-0" />
          <span className="line-clamp-1">
            {property.district || property.address}
          </span>
        </div>
      </div>
    </Link>
  );
}
