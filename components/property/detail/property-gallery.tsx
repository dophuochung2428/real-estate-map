"use client";

import Image from "next/image";

import { useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PropertyGallery({ property }: { property: any }) {
  const images = property.property_images || [];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedImage =
    images[selectedIndex]?.image_url || "https://placehold.co/1200x700";

  const next = () => {
    if (selectedIndex >= images.length - 1) {
      setSelectedIndex(0);
      return;
    }

    setSelectedIndex(selectedIndex + 1);
  };

  const prev = () => {
    if (selectedIndex <= 0) {
      setSelectedIndex(images.length - 1);
      return;
    }

    setSelectedIndex(selectedIndex - 1);
  };

  return (
    <div>
      {/* MAIN */}
      <div className="relative overflow-hidden rounded-[32px]">
        <div className="relative h-[550px] w-full overflow-hidden rounded-[32px] bg-black">
          <Image
            src={selectedImage}
            alt={property.title}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>

        {/* NAV */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-5 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={next}
              className="absolute right-5 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur"
            >
              <ChevronRight />
            </button>
          </>
        )}

        {/* COUNT */}
        <div className="absolute bottom-5 right-5 rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* THUMBNAILS */}
      <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
        {images.map((image: any, index: number) => (
          <button
            key={image.id}
            onClick={() => setSelectedIndex(index)}
            className={`relative h-[100px] w-[160px] overflow-hidden rounded-2xl border-2 transition ${
              selectedIndex === index ? "border-red-600" : "border-transparent"
            }`}
          >
            <Image
              src={image.image_url}
              alt="Thumbnail"
              fill
              sizes="160px"
              className="object-contain bg-black p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
