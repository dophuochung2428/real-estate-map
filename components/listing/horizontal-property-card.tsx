"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice } from "../map/utils/price-format";

import { BedDouble, MapPin, Move } from "lucide-react";
import FavoriteButton from "@/components/favorite/favorite-button";
import { PropertyImage } from "@/types/property";

type InlineCardProps = {
  title: string;
  image: string;
  location: string;
  price: string;
  href?: string;
};

type PropertyCardProps = {
  property: {
    id: string;
    title: string;
    images?: PropertyImage[];
    address?: string;
    location?: string;
    price: number | string;
    area?: number;
  };
};

type Props = InlineCardProps | PropertyCardProps;

export default function HorizontalPropertyCard(props: Props) {
  const router = useRouter();

  // =========================
  // INLINE CARD MODE
  // =========================
  if (!("property" in props)) {
    const { title, image, location, price, href } = props;

    const areaLabel = "120m²";

    return (
      <Link href={href ?? "/listing/1"}>
        <div className="group overflow-hidden rounded-3xl bg-[var(--card)] shadow-sm transition hover:shadow-xl border border-[var(--border)]">
          <div className="flex flex-col lg:flex-row">
            {/* IMAGE */}
            <div className="relative h-[280px] w-full overflow-hidden lg:w-[360px]">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* CONTENT */}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h2 className="mb-4 text-2xl font-bold group-hover:text-[var(--primary)]">
                  {title}
                </h2>

                <div className="mb-5 flex flex-wrap gap-5 text-sm text-[var(--muted-foreground)]">
                  <div className="flex items-center gap-2">
                    <Move className="size-4" />
                    {areaLabel}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    {location}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-[var(--primary)]">
                  {price}
                </span>

                <button className="rounded-2xl bg-[var(--primary)] px-6 py-3 font-semibold text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)]">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // =========================
  // PROPERTY MODE
  // =========================
  const property = props.property;

  const image =
    property.images?.find((img) => img.is_thumbnail)?.image_url ||
    property.images?.[0]?.image_url ||
    "/images/hero.jpg";

  const location =
    property.address ?? property.location ?? "Vị trí không xác định";

  const price =
    typeof property.price === "number"
      ? formatPrice(property.price)
      : property.price;
  const areaLabel = property.area ? `${property.area}m²` : "120m²";

  const href = `/listing/${property.id}`;

  return (
    <Link href={href}>
      <div className="group overflow-hidden rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-sm transition hover:shadow-xl">
        <div className="flex flex-col lg:flex-row">
          {/* IMAGE */}
          <div className="relative h-[280px] w-full overflow-hidden lg:w-[360px]">
            <Image
              src={image}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Favorite Button Overlay */}
            <div
              className="absolute right-3 top-3 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <FavoriteButton propertyId={property.id} />
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-[var(--accent-foreground)]">
                  VIP
                </span>

                <span className="text-sm text-[var(--muted-foreground)]">
                  Đăng hôm nay
                </span>
              </div>

              <h2 className="mb-4 text-2xl font-bold transition group-hover:text-[var(--primary)]">
                {property.title}
              </h2>

              <div className="mb-5 flex flex-wrap gap-5 text-sm text-[var(--muted-foreground)]">
                <div className="flex items-center gap-2">
                  <BedDouble className="size-4" />3 PN
                </div>

                <div className="flex items-center gap-2">
                  <Move className="size-4" />
                  {areaLabel}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  {location}
                </div>
              </div>

              <p className="line-clamp-3 text-[var(--muted-foreground)]">
                Căn hộ cao cấp vị trí trung tâm, thiết kế hiện đại, đầy đủ nội
                thất, phù hợp đầu tư hoặc an cư lâu dài.
              </p>
            </div>

            <div className="flex items-center justify-between mt-6">
              <span className="text-3xl font-bold text-[var(--primary)]">
                {price}
              </span>

              <button
                onClick={() => router.push(href)}
                className="rounded-2xl bg-[var(--primary)] px-6 py-3 font-semibold text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)]"
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
