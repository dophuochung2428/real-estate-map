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
    className: "border-green-200 bg-green-50 text-green-800",
  },

  pending: {
    label: "Chờ duyệt",
    className: "border-yellow-200 bg-yellow-50 text-yellow-800",
  },

  rejected: {
    label: "Bị từ chối",
    className: "border-red-200 bg-red-50 text-red-800",
  },

  deleted: {
    label: "Đã xóa",
    className: "border-slate-200 bg-slate-50 text-slate-700",
  },

  sold: {
    label: "Đã bán",
    className: "border-blue-200 bg-blue-50 text-blue-800",
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
    className: "border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)]",
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
          border border-[var(--border)] bg-[var(--card)]
          transition-all duration-300
          hover:border-[var(--border-strong)] hover:bg-[var(--hover)]
          hover:shadow-2xl hover:-translate-y-1
        "
      >
        <div className="flex flex-col gap-6 p-5 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}
          <div className="flex flex-1 gap-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-[var(--surface)]">
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt={property.title}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-[var(--muted-foreground)]">
                  No image
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="line-clamp-2 text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)]">
                {property.title}
              </h2>

              <p className="mt-2 line-clamp-1 text-sm text-[var(--muted-foreground)]">
                {property.address}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-5 lg:flex-col lg:items-end">
            <div className="flex flex-col items-end gap-2">
              <p className="text-2xl font-bold text-[var(--primary)]">
                {formatPrice(property.price)}
              </p>

              <span
                className={`rounded-full border px-3 py-1 text-xs ${status.className}`}
              >
                {status.label}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">
              {["active", "pending", "rejected"].includes(property.status) && (
                <>
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
              ? "border-blue-300 bg-blue-50 text-blue-800 opacity-70"
              : "border-[var(--border)] text-slate-700 hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
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
          rounded-xl border border-red-200
          px-4 py-2 text-sm text-red-700
          transition hover:bg-red-50
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
      rounded-xl border border-green-200
      px-4 py-2 text-sm text-green-700
      transition hover:bg-green-50
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[90%] max-w-sm rounded-2xl border border-[var(--border)] bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">Xác nhận xóa</h3>

            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Bạn có chắc muốn xóa bất động sản này không?
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-xl px-4 py-2 text-sm text-slate-700 hover:bg-[var(--surface)]"
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
                      ? "bg-red-200 text-red-800 cursor-not-allowed"
                      : "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
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
