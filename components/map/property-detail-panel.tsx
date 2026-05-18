"use client";

import Image from "next/image";
import { X, MapPin, Move } from "lucide-react";
import { Property } from "@/types/property";
import { useRouter } from "next/navigation";

interface PropertyDetailPanelProps {
  property: Property | null;
  onClose: () => void;
}

function formatPrice(price: number) {
  if (price >= 1000000000) {
    return `${(price / 1000000000).toFixed(1)} tỷ`;
  }
  return `${(price / 1000000).toFixed(0)} triệu`;
}

export default function PropertyDetailPanel({
  property,
  onClose,
}: PropertyDetailPanelProps) {
  if (!property) return null;

  const router = useRouter();

  return (
    <div className="fixed top-24 right-4 z-[1050] w-80 max-h-[calc(100vh-5rem)] overflow-y-auto px-1 sm:px-0">
      <div className="bg-[var(--card)]/95 backdrop-blur-xl rounded-3xl border border-[var(--border)] shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-[var(--card)]/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-[var(--hover)] transition-colors border border-[var(--border)]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image */}
        <div className="relative h-48">
          <Image
            src={
              property.images?.find((img) => img.is_thumbnail)?.image_url ||
              property.images?.[0]?.image_url ||
              "/images/hero.jpg"
            }
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Title and Price */}
          <div>
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-2 line-clamp-2">
              {property.title}
            </h3>
            <p className="text-2xl font-bold text-[var(--primary)]">
              {formatPrice(property.price)}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">
                {[property.address, property.district, property.province]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
              <div className="flex items-center gap-1">
                <Move className="w-4 h-4" />
                <span>{Number(property.area).toLocaleString()}m²</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[var(--muted-foreground)] line-clamp-3">
            {property.description || "Chưa có mô tả"}
          </p>

          {/* CTA */}
          <button
            onClick={() => router.push(`/properties/${property.id}`)}
            className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] py-3 px-4 rounded-xl font-semibold hover:bg-[var(--primary-hover)] transition-colors"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}
