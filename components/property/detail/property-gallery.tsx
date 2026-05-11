"use client";

import Image from "next/image";

import { useState } from "react";

export default function PropertyGallery({ property }: { property: any }) {
  const images = property.property_images || [];

  const [selectedImage, setSelectedImage] = useState(images[0]?.image_url);

  return (
    <div>
      {/* MAIN */}
      <div className="overflow-hidden rounded-[32px]">
        <Image
          src={selectedImage || "https://placehold.co/1200x700"}
          alt={property.title}
          width={1200}
          height={700}
          className="h-[500px] w-full object-cover"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="mt-4 flex gap-4 overflow-x-auto">
        {images.map((image: any) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image.image_url)}
            className={`overflow-hidden rounded-2xl border-2 transition ${
              selectedImage === image.image_url
                ? "border-red-600"
                : "border-transparent"
            }`}
          >
            <Image
              src={image.image_url}
              alt="Thumbnail"
              width={140}
              height={100}
              className="h-[90px] w-[140px] object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
