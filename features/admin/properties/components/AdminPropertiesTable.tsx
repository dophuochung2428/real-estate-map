"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAdminProperties } from "../hooks/use-admin-properties";
import { Property } from "../types/property.type";
import { usePropertiesRealtime } from "@/hooks/use-properties-realtime";
import { useRef } from "react";

import { useRouter, useSearchParams } from "next/navigation";

const statusMap: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  pending: {
    label: "Chờ duyệt",
    className: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  },
  active: {
    label: "Đang hiển thị",
    className: "bg-green-100 text-green-700 border border-green-200",
  },
  rejected: {
    label: "Từ chối",
    className: "bg-red-100 text-red-700 border border-red-200",
  },
  sold: {
    label: "Đã bán",
    className: "bg-blue-100 text-blue-700 border border-blue-200",
  },
};

type Props = {
  properties: Property[];
  totalPages: number;
  currentPage: number;
};

export default function AdminPropertiesTable({
  properties,
  totalPages,
  currentPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "all";
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const {
    properties: data,
    changeStatus,
    isUpdating,
  } = useAdminProperties(properties);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  usePropertiesRealtime((payload) => {
    const { eventType } = payload;

    if (
      eventType === "UPDATE" ||
      eventType === "INSERT" ||
      eventType === "DELETE"
    ) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        router.refresh();
      }, 200);
    }
  });

  // reset selection when data changes
  useEffect(() => {
    setSelectedIds([]);
  }, [data]);

  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map((property) => property.id));
    }
  };

  const isAllSelected =
    data.length > 0 &&
    data.every((property) => selectedIds.includes(property.id));

  const selectedProperties = data.filter((p: Property) =>
    selectedIds.includes(p.id),
  );

  const allSameStatus =
    selectedProperties.length > 0 &&
    selectedProperties.every(
      (p: Property) => p.status === selectedProperties[0].status,
    );

  const selectedStatus = selectedProperties[0]?.status;

  const canBulkApprove =
    allSameStatus &&
    (selectedStatus === "pending" || selectedStatus === "rejected");

  const canBulkReject = allSameStatus && selectedStatus === "pending";

  // BULK ACTIONS
  const bulkApprove = async () => {
    await Promise.all(
      selectedIds.map((id) =>
        changeStatus({
          id,
          status: "active",
        }),
      ),
    );

    setSelectedIds([]);
  };

  const bulkReject = async () => {
    await Promise.all(
      selectedIds.map((id) =>
        changeStatus({
          id,
          status: "rejected",
        }),
      ),
    );

    setSelectedIds([]);
  };

  return (
    <div>
      {/* BULK ACTION BAR */}
      {selectedIds.length > 0 && (
        <div className="mb-4 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              Đã chọn <span className="font-bold">{selectedIds.length}</span>{" "}
              bài đăng
            </p>

            <div className="flex gap-2">
              <button
                onClick={bulkApprove}
                disabled={isUpdating || !canBulkApprove}
                className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Duyệt
              </button>
              <button
                onClick={bulkReject}
                disabled={isUpdating || !canBulkReject}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Từ chối
              </button>

              <button
                onClick={() => setSelectedIds([])}
                className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--muted)]"
              >
                Bỏ chọn
              </button>
            </div>
          </div>

          {!allSameStatus && (
            <p className="mt-2 text-sm text-red-500">
              Chỉ có thể thao tác với các bài cùng trạng thái
            </p>
          )}
        </div>
      )}

      <div className="mb-5 flex flex-col gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm bài đăng..."
            defaultValue={searchParams.get("search") || ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const params = new URLSearchParams(searchParams);

                params.set("search", e.currentTarget.value);
                params.set("page", "1");

                router.push(`?${params.toString()}`);
              }
            }}
            className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-4 pr-10 outline-none transition focus:border-[var(--primary)]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { value: "all", label: "Tất cả" },
            { value: "pending", label: "Chờ duyệt" },
            { value: "active", label: "Đang hiển thị" },
            { value: "rejected", label: "Từ chối" },
            { value: "sold", label: "Đã bán" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => {
                const params = new URLSearchParams(searchParams);

                if (item.value === "all") {
                  params.delete("status");
                } else {
                  params.set("status", item.value);
                }

                params.set("page", "1");

                router.push(`?${params.toString()}`);
              }}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                currentStatus === item.value
                  ? "bg-[var(--primary)] text-white"
                  : "border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
        <table className="w-full table-fixed">
          <thead className="border-b border-[var(--border)] bg-[var(--muted)]/40">
            <tr>
              <th className="w-[50px] px-4 py-4 text-left">
                <div className="flex justify-center">
                  <label className="flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleAll}
                      className="peer sr-only"
                    />

                    <div className="h-4 w-4 rounded border border-gray-300 bg-white transition peer-checked:border-blue-600 peer-checked:bg-blue-600" />
                  </label>
                </div>
              </th>

              <th className="w-[320px] px-4 py-4 text-left">Bài đăng</th>
              <th className="w-[220px] px-4 py-4 text-left">Người đăng</th>
              <th className="w-[140px] px-4 py-4 text-left">Trạng thái</th>
              <th className="w-[140px] px-4 py-4 text-left">Ngày đăng</th>
              <th className="w-[200px] px-4 py-4 text-right">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {data.map((property) => {
              const thumbnail =
                property.property_images?.find((img: any) => img.is_thumbnail)
                  ?.image_url || property.property_images?.[0]?.image_url;

              const isSelected = selectedIds.includes(property.id);

              return (
                <tr
                  key={property.id}
                  className={`border-b border-[var(--border)] last:border-0 transition ${
                    isSelected ? "bg-blue-50/50" : "hover:bg-[var(--muted)]/30"
                  }`}
                >
                  {/* CHECKBOX */}
                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <label className="flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleItem(property.id)}
                          className="peer sr-only"
                        />

                        <div className="h-4 w-4 rounded border border-gray-300 bg-white transition peer-checked:border-blue-600 peer-checked:bg-blue-600" />
                      </label>
                    </div>
                  </td>

                  {/* PROPERTY */}
                  <td className="px-4 py-4">
                    <div className="flex gap-4">
                      <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-[var(--muted)]">
                        {thumbnail && (
                          <Image
                            src={thumbnail}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">
                          {property.title}
                        </p>

                        <p className="mt-1 truncate text-sm text-[var(--muted-foreground)]">
                          {property.address}
                        </p>

                        <p className="mt-2 whitespace-nowrap font-bold text-[var(--primary)]">
                          {property.price?.toLocaleString()} VNĐ
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* OWNER */}
                  <td className="px-4 py-4">
                    <p className="truncate font-medium">
                      {property.owner?.full_name || "Chưa cập nhật"}
                    </p>
                    <p className="truncate text-sm text-[var(--muted-foreground)]">
                      {property.owner?.email || "Không có email"}
                    </p>
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                        statusMap[property.status]?.className
                      }`}
                    >
                      {statusMap[property.status]?.label || property.status}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="px-4 py-4 text-sm text-[var(--muted-foreground)]">
                    {new Date(property.created_at).toLocaleDateString("vi-VN")}
                  </td>

                  {/* ACTION */}
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2 whitespace-nowrap">
                      {property.status === "pending" && (
                        <>
                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              changeStatus({
                                id: property.id,
                                status: "active",
                              })
                            }
                            className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                          >
                            Duyệt
                          </button>

                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              changeStatus({
                                id: property.id,
                                status: "rejected",
                              })
                            }
                            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                          >
                            Từ chối
                          </button>
                        </>
                      )}

                      {property.status === "active" && (
                        <button
                          disabled={isUpdating}
                          onClick={() =>
                            changeStatus({
                              id: property.id,
                              status: "sold",
                            })
                          }
                          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                          Đã bán
                        </button>
                      )}

                      {property.status === "sold" && (
                        <button
                          disabled={isUpdating}
                          onClick={() =>
                            changeStatus({
                              id: property.id,
                              status: "active",
                            })
                          }
                          className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                        >
                          Đăng lại
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-sm text-[var(--muted-foreground)]"
                >
                  Không tìm thấy bài đăng phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-center gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            const params = new URLSearchParams(searchParams);

            params.set("page", String(currentPage - 1));

            router.push(`?${params.toString()}`);
          }}
          className="rounded-lg border px-4 py-2 disabled:opacity-40"
        >
          Trước
        </button>

        <span className="flex items-center px-4">
          {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage >= totalPages}
          onClick={() => {
            const params = new URLSearchParams(searchParams);

            params.set("page", String(currentPage + 1));

            router.push(`?${params.toString()}`);
          }}
          className="rounded-lg border px-4 py-2 disabled:opacity-40"
        >
          Sau
        </button>
      </div>
    </div>
  );
}
