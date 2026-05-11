"use client";

import Image from "next/image";

import { Property } from "@/types/property";

export default function PropertyGallery({ property }: { property: Property }) {
  const images = property.images || [];

  return (
    <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
      {/* MAIN */}
      <div className="relative h-[500px] overflow-hidden rounded-3xl">
        <Image
          src={images[0]?.image_url || "/placeholder.jpg"}
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>

      {/* SIDE */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
        {images.slice(1, 3).map((img) => (
          <div
            key={img.id}
            className="relative h-[244px] overflow-hidden rounded-3xl"
          >
            <Image src={img.image_url} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
