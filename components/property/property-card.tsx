"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatPrice } from "../map/utils/price-format";
import { deleteProperty } from "@/services/property.service";

import { restoreProperty } from "@/services/property.service";

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  active: {
    label: "Đang hiển thị",
    className: "border-green-500/20 bg-green-500/10 text-green-400",
  },

  pending: {
    label: "Chờ duyệt",
    className: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
  },

  rejected: {
    label: "Bị từ chối",
    className: "border-red-500/20 bg-red-500/10 text-red-400",
  },

  deleted: {
    label: "Đã xóa",
    className: "border-gray-500/20 bg-gray-500/10 text-gray-400",
  },

  sold: {
    label: "Đã bán",
    className: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  },
};

export default function PropertyCard({ property }: { property: any }) {
  const router = useRouter();

  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const thumbnail =
    property.property_images?.find((img: any) => img.is_thumbnail)?.image_url ||
    property.property_images?.[0]?.image_url;

  const handleDelete = async () => {
    setLoadingDelete(true);

    try {
      await deleteProperty(property.id);

      setShowConfirm(false);

      router.refresh(); // reload list
    } catch (err) {
      console.error(err);
      alert("Xóa thất bại");
    } finally {
      setLoadingDelete(false);
    }
  };

  const status = STATUS_CONFIG[property.status] ?? {
    label: property.status,
    className: "border-white/10 bg-white/5 text-white/60",
  };

  const handleRestore = async (e: any) => {
    e.stopPropagation();

    try {
      setLoadingEdit(true);
      await restoreProperty(property.id);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Khôi phục thất bại");
    } finally {
      setLoadingEdit(false);
    }
  };

  return (
    <>
      <div
        onClick={() => router.push(`/properties/${property.id}`)}
        className="
          group cursor-pointer overflow-hidden rounded-3xl
          border border-white/10 bg-[var(--card)]
          transition-all duration-300
          hover:border-white/20 hover:bg-white/[0.07]
          hover:shadow-2xl hover:-translate-y-1
        "
      >
        <div className="flex flex-col gap-6 p-5 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}
          <div className="flex flex-1 gap-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-white/5">
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt={property.title}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">
                  No image
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="line-clamp-2 text-xl font-bold text-white group-hover:text-red-400">
                {property.title}
              </h2>

              <p className="mt-2 line-clamp-1 text-sm text-gray-400">
                {property.address}
              </p>

              <div className="mt-4 flex gap-3 text-sm text-gray-500">
                <span>{property.area} m²</span>
                <span>•</span>
                <span>{property.views || 0} lượt xem</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-between gap-5 lg:flex-col lg:items-end">
            <div className="flex flex-col items-end gap-2">
              <p className="text-2xl font-bold text-red-400">
                {formatPrice(property.price)}
              </p>

              <span
                className={`rounded-full border px-3 py-1 text-xs ${status.className}`}
              >
                {status.label}
              </span>

              <span
                className={`rounded-full border px-3 py-1 text-xs ${
                  property.appraisal_completed_at
                    ? "border-green-500/20 bg-green-500/10 text-green-400"
                    : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                }`}
              >
                {property.appraisal_completed_at
                  ? "✓ Đã thẩm định"
                  : "⏳ Chưa thẩm định"}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">
              {["active", "pending", "rejected"].includes(property.status) && (
                <>
                  {/* APPRAISAL */}
                  <Link
                    href={`/dashboard/properties/${property.id}/appraisal`}
                    onClick={(e) => e.stopPropagation()}
                    className="
    rounded-xl border border-purple-500/20
    px-4 py-2 text-sm text-purple-400
    transition hover:bg-purple-500/10
  "
                  >
                    {property.appraisal_completed_at
                      ? "Xem thẩm định"
                      : "Thẩm định"}
                  </Link>

                  {/* EDIT */}
                  <Link
                    href={`/dashboard/properties/${property.id}/edit`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLoadingEdit(true);
                      alert("Sau khi chỉnh sửa, bài sẽ được gửi lại để duyệt");
                    }}
                    className={`
          rounded-xl border px-4 py-2 text-sm transition
          ${
            loadingEdit
              ? "border-blue-400 bg-blue-500/20 text-white opacity-70"
              : "border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
          }
        `}
                  >
                    {loadingEdit ? "Đang mở..." : "Sửa"}
                  </Link>

                  {/* DELETE */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowConfirm(true);
                    }}
                    className="
          rounded-xl border border-red-500/20
          px-4 py-2 text-sm text-red-400
          transition hover:bg-red-500/10
        "
                  >
                    Xóa
                  </button>
                </>
              )}

              {property.status === "deleted" && (
                <button
                  onClick={handleRestore}
                  disabled={loadingEdit}
                  className="
      rounded-xl border border-green-500/20
      px-4 py-2 text-sm text-green-400
      transition hover:bg-green-500/10
      disabled:opacity-60
    "
                >
                  {loadingEdit ? "Đang khôi phục..." : "Khôi phục"}
                </button>
              )}

              {/* sold: không render gì */}
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-[90%] max-w-sm rounded-2xl bg-[#111] p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white">Xác nhận xóa</h3>

            <p className="mt-2 text-sm text-gray-400">
              Bạn có chắc muốn xóa bất động sản này không?
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-xl px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
              >
                Hủy
              </button>

              <button
                onClick={handleDelete}
                disabled={loadingDelete}
                className={`
                  rounded-xl px-4 py-2 text-sm
                  ${
                    loadingDelete
                      ? "bg-red-500/30 text-white cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }
                `}
              >
                {loadingDelete ? "Đang xóa..." : "Xóa"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
