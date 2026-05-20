"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice } from "../map/utils/price-format";

export default function PropertyCard({ property }: { property: any }) {
  const router = useRouter();
  const thumbnail =
    property.property_images?.find((img: any) => img.is_thumbnail)?.image_url ||
    property.property_images?.[0]?.image_url;

  return (
    <div
      onClick={() => router.push(`/properties/${property.id}`)}
      className="
        group
        cursor-pointer
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-[var(--card)]
        transition-all duration-300
        hover:border-white/20
        hover:bg-white/[0.07]
        hover:shadow-2xl
        hover:-translate-y-1
      "
    >
      <div className="flex flex-col gap-6 p-5 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT */}
        <div className="min-w-0 flex flex-1 gap-4">
          {/* THUMBNAIL */}
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-white/5">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={property.title}
                fill
                className="
                  object-cover
                  transition duration-300
                  group-hover:scale-105
                "
              />
            ) : (
              <div
                className="
                  flex h-full w-full items-center justify-center
                  bg-gradient-to-br
                  from-red-500/20
                  to-blue-500/20
                  text-xs text-gray-500
                "
              >
                No image
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="min-w-0 flex-1">
            {/* TITLE */}
            <h2
              className="
                line-clamp-2
                text-xl
                font-bold
                leading-snug
                text-white
                transition
                group-hover:text-red-400
              "
            >
              {property.title}
            </h2>

            {/* ADDRESS */}
            <p className="mt-2 line-clamp-1 text-sm text-gray-400">
              {property.address}
            </p>

            {/* META */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span>{property.area} m²</span>

              <span>•</span>

              <span>{property.views || 0} lượt xem</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="
            flex
            flex-row
            items-center
            justify-between
            gap-5

            lg:min-w-[220px]
            lg:flex-col
            lg:items-end
          "
        >
          {/* TOP */}
          <div className="flex flex-col items-end gap-3">
            {/* PRICE */}
            <p className="text-2xl font-bold text-red-400">
              {formatPrice(property.price)}
            </p>

            {/* STATUS */}
            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                property.status === "active"
                  ? "border-green-500/20 bg-green-500/10 text-green-400"
                  : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
              }`}
            >
              {property.status === "active" ? "Đang hiển thị" : "Chờ duyệt"}
            </span>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-2">
            <Link
              onClick={(e) => e.stopPropagation()}
              href={`/dashboard/properties/${property.id}/edit`}
              className="
                rounded-xl
                border border-white/10
                px-4 py-2
                text-sm
                text-gray-300
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              Sửa
            </Link>

            <button
              onClick={(e) => e.stopPropagation()}
              className="
                rounded-xl
                border border-red-500/20
                px-4 py-2
                text-sm
                text-red-400
                transition
                hover:bg-red-500/10
              "
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
