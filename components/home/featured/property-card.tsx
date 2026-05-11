"use client";

import Image from "next/image";
import { BedDouble, MapPin, Move } from "lucide-react";

interface Props {
  title: string;
  price: string;
  location: string;
  image: string;
}

export default function PropertyCard({ title, price, location, image }: Props) {
  return (
    <div className="group overflow-hidden rounded-3xl bg-[var(--card)] shadow-sm transition hover:-translate-y-1 hover:shadow-xl border border-[var(--border)]">
      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
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
        <div className="mb-3 flex items-center gap-2">
          <span className="text-2xl font-bold text-[var(--primary)]">{price}</span>
        </div>

        <h3 className="mb-3 line-clamp-2 text-lg font-bold transition group-hover:text-[var(--primary)]">
          {title}
        </h3>

        <div className="mb-4 flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
          <div className="flex items-center gap-1">
            <BedDouble className="size-4" />3 PN
          </div>

          <div className="flex items-center gap-1">
            <Move className="size-4" />
            120m²
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
          <MapPin className="size-4" />
          {location}
        </div>
      </div>
    </div>
  );
}
