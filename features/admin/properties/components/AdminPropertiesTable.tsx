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

const propertyTypeMap: Record<string, string> = {
  house_private: "Nhà riêng",
  apartment: "Căn hộ",
  hotel_motel: "Khách sạn / Nhà nghỉ",
  land_private: "Đất riêng",
  land_project: "Đất dự án",
  land_residential: "Đất ở",
  land_agriculture: "Đất nông nghiệp",
  farm: "Trang trại",
  warehouse_factory: "Kho / Nhà xưởng",
  other: "Khác",
};

const landTypeMap: Record<string, string> = {
  ODT: "Đất ở tại đô thị",
  ONT: "Đất ở tại nông thôn",
  LUC: "Đất chuyên trồng lúa nước",
  BHK: "Đất bằng trồng cây hàng năm khác",
  CLN: "Đất trồng cây lâu năm",
  NTS: "Đất nuôi trồng thủy sản",
  HNK: "Đất trồng cây hàng năm khác",
};

const landShapeMap: Record<string, string> = {
  square: "Vuông",
  rectangle: "Chữ nhật",
  expanding_back: "Nở hậu",
  narrowing_back: "Tóp hậu",
  irregular: "Không đều",
};

const formatNumber = (value: number | string | null | undefined) => {
  if (value === null || value === undefined || value === "") {
    return "Chưa cập nhật";
  }

  if (typeof value === "number") {
    return value.toLocaleString("vi-VN");
  }

  return value;
};

const formatDate = (value: string | null | undefined) => {
  if (!value) return "Chưa cập nhật";

  return new Date(value).toLocaleDateString("vi-VN");
};

const getValue = (value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === "") {
    return "Chưa cập nhật";
  }

  return value;
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
    deleteProperty,
    isDeleting,
  } = useAdminProperties(properties);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );

  const [deletingId, setDeletingId] = useState<string | null>(null);

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
              <th className="w-[320px] px-4 py-4 text-right">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {data.map((property) => {
              const thumbnail =
                property.property_images?.find((img) => img.is_thumbnail)
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
                      <button
                        type="button"
                        onClick={() => setSelectedProperty(property)}
                        className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm font-semibold transition hover:bg-[var(--muted)]"
                      >
                        Xem
                      </button>

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

                      <button
                        type="button"
                        disabled={deletingId !== null}
                        onClick={async () => {
                          const confirmed = window.confirm(
                            `Bạn có chắc chắn muốn xóa vĩnh viễn bài đăng "${property.title}"?\n\n` +
                              "Bài đăng, hình ảnh và dữ liệu liên quan sẽ bị xóa và không thể khôi phục.",
                          );

                          if (!confirmed) return;

                          try {
                            setDeletingId(property.id);

                            await deleteProperty(property.id);

                            setSelectedIds((prev) =>
                              prev.filter((id) => id !== property.id),
                            );
                          } catch (error) {
                            console.error("Delete property error:", error);

                            window.alert(
                              error instanceof Error
                                ? error.message
                                : "Không thể xóa bài đăng",
                            );
                          } finally {
                            setDeletingId(null);
                          }
                        }}
                        className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === property.id ? "Đang xóa..." : "Xóa"}
                      </button>
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
      {selectedProperty && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedProperty(null)}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] px-6 py-4">
              <div>
                <h2 className="text-lg font-bold">Chi tiết bài đăng</h2>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  Thông tin chi tiết của bất động sản
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProperty(null)}
                className="rounded-lg px-3 py-1 text-2xl leading-none text-[var(--muted-foreground)] transition hover:bg-[var(--muted)]"
              >
                ×
              </button>
            </div>

            {/* CONTENT */}
            <div className="overflow-y-auto">
              <div className="space-y-6 p-6">
                {/* IMAGES */}
                {selectedProperty.property_images &&
                  selectedProperty.property_images.length > 0 && (
                    <section>
                      <h3 className="mb-3 text-base font-bold">Hình ảnh</h3>

                      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                        {selectedProperty.property_images.map(
                          (image, index) => (
                            <div
                              key={`${image.image_url}-${index}`}
                              className="relative aspect-video overflow-hidden rounded-xl bg-[var(--muted)]"
                            >
                              <Image
                                src={image.image_url}
                                alt={`${selectedProperty.title} - ảnh ${index + 1}`}
                                fill
                                className="object-cover"
                              />

                              {image.is_thumbnail && (
                                <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white">
                                  Ảnh đại diện
                                </span>
                              )}
                            </div>
                          ),
                        )}
                      </div>
                    </section>
                  )}

                {/* BASIC INFO */}
                <section>
                  <h3 className="mb-4 text-base font-bold">Thông tin cơ bản</h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InfoItem label="Tiêu đề" value={selectedProperty.title} />

                    <InfoItem
                      label="Giá"
                      value={`${formatNumber(selectedProperty.price)} VNĐ`}
                      highlight
                    />

                    <InfoItem
                      label="Loại bất động sản"
                      value={
                        propertyTypeMap[selectedProperty.type || ""] ||
                        getValue(selectedProperty.type)
                      }
                    />

                    <InfoItem
                      label="Hướng"
                      value={getValue(selectedProperty.direction)}
                    />

                    <InfoItem
                      label="Tỉnh / Thành phố"
                      value={getValue(selectedProperty.province)}
                    />

                    <InfoItem
                      label="Quận / Huyện"
                      value={getValue(selectedProperty.district)}
                    />

                    <div className="md:col-span-2">
                      <InfoItem
                        label="Địa chỉ"
                        value={selectedProperty.address}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <InfoItem
                        label="Mô tả"
                        value={getValue(selectedProperty.description)}
                      />
                    </div>
                  </div>
                </section>

                {/* LAND INFO */}
                <section>
                  <h3 className="mb-4 text-base font-bold">Thông tin đất</h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InfoItem
                      label="Mặt tiền"
                      value={
                        selectedProperty.frontage_width !== null &&
                        selectedProperty.frontage_width !== undefined
                          ? `${formatNumber(selectedProperty.frontage_width)} m`
                          : "Chưa cập nhật"
                      }
                    />

                    <InfoItem
                      label="Chiều sâu"
                      value={
                        selectedProperty.max_depth !== null &&
                        selectedProperty.max_depth !== undefined
                          ? `${formatNumber(selectedProperty.max_depth)} m`
                          : "Chưa cập nhật"
                      }
                    />

                    <InfoItem
                      label="Hình dạng"
                      value={
                        landShapeMap[selectedProperty.land_shape || ""] ||
                        getValue(selectedProperty.land_shape)
                      }
                    />
                  </div>

                  {selectedProperty.property_land_areas &&
                    selectedProperty.property_land_areas.length > 0 && (
                      <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
                        <table className="w-full text-sm">
                          <thead className="bg-[var(--muted)]/40">
                            <tr>
                              <th className="px-4 py-3 text-left">Loại đất</th>
                              <th className="px-4 py-3 text-right">
                                Diện tích
                              </th>
                              <th className="px-4 py-3 text-right">Đơn giá</th>
                            </tr>
                          </thead>

                          <tbody>
                            {selectedProperty.property_land_areas.map(
                              (land, index) => (
                                <tr
                                  key={`${land.land_type}-${index}`}
                                  className="border-t border-[var(--border)]"
                                >
                                  <td className="px-4 py-3">
                                    {landTypeMap[land.land_type] ||
                                      land.land_type}
                                  </td>

                                  <td className="px-4 py-3 text-right">
                                    {formatNumber(land.area)} m²
                                  </td>

                                  <td className="px-4 py-3 text-right">
                                    {formatNumber(land.unit_price)} VNĐ/m²
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                </section>

                {/* ASSET INFO */}
                <section>
                  <h3 className="mb-4 text-base font-bold">Tài sản trên đất</h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InfoItem
                      label="Tài sản trên đất"
                      value={getValue(selectedProperty.asset_on_land)}
                    />

                    <InfoItem
                      label="Kết cấu"
                      value={getValue(selectedProperty.structure)}
                    />

                    <InfoItem
                      label="Số tầng"
                      value={getValue(selectedProperty.floors)}
                    />

                    <InfoItem
                      label="Diện tích sử dụng"
                      value={
                        selectedProperty.usable_floor_area !== null &&
                        selectedProperty.usable_floor_area !== undefined
                          ? `${formatNumber(
                              selectedProperty.usable_floor_area,
                            )} m²`
                          : "Chưa cập nhật"
                      }
                    />

                    <InfoItem
                      label="Tỷ lệ giá trị còn lại"
                      value={
                        selectedProperty.remaining_value_ratio !== null &&
                        selectedProperty.remaining_value_ratio !== undefined
                          ? `${formatNumber(
                              selectedProperty.remaining_value_ratio,
                            )}%`
                          : "Chưa cập nhật"
                      }
                    />

                    <InfoItem
                      label="Đơn giá xây dựng"
                      value={
                        selectedProperty.construction_unit_price !== null &&
                        selectedProperty.construction_unit_price !== undefined
                          ? `${formatNumber(
                              selectedProperty.construction_unit_price,
                            )} VNĐ/m²`
                          : "Chưa cập nhật"
                      }
                    />
                  </div>
                </section>

                {/* APPRAISAL INFO */}
                <section>
                  <h3 className="mb-4 text-base font-bold">
                    Thông tin thẩm định
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InfoItem
                      label="Tình trạng pháp lý"
                      value={getValue(selectedProperty.legal_status)}
                    />

                    <InfoItem
                      label="Lợi thế kinh doanh"
                      value={getValue(selectedProperty.business_advantage)}
                    />

                    <InfoItem
                      label="Vị trí giao thông"
                      value={getValue(selectedProperty.traffic_location)}
                    />

                    <InfoItem
                      label="Môi trường"
                      value={getValue(selectedProperty.environment)}
                    />

                    <InfoItem
                      label="Nguồn"
                      value={getValue(selectedProperty.source)}
                    />

                    <InfoItem
                      label="Giá đất theo nghị quyết"
                      value={getValue(selectedProperty.resolution_land_price)}
                    />

                    <InfoItem
                      label="Người liên hệ"
                      value={getValue(selectedProperty.contact_name)}
                    />

                    <InfoItem
                      label="Số điện thoại"
                      value={getValue(selectedProperty.contact_phone)}
                    />

                    <InfoItem
                      label="Ngày hoàn thành thẩm định"
                      value={formatDate(
                        selectedProperty.appraisal_completed_at,
                      )}
                    />
                  </div>
                </section>

                {/* POST INFO */}
                <section>
                  <h3 className="mb-4 text-base font-bold">
                    Thông tin bài đăng
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InfoItem
                      label="Trạng thái"
                      value={
                        statusMap[selectedProperty.status]?.label ||
                        selectedProperty.status
                      }
                    />

                    <InfoItem
                      label="Ngày đăng"
                      value={formatDate(selectedProperty.created_at)}
                    />
                  </div>
                </section>

                {/* OWNER */}
                <section>
                  <h3 className="mb-4 text-base font-bold">Người đăng</h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InfoItem
                      label="Họ tên"
                      value={getValue(selectedProperty.owner?.full_name)}
                    />

                    <InfoItem
                      label="Email"
                      value={getValue(selectedProperty.owner?.email)}
                    />
                  </div>
                </section>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex shrink-0 justify-end border-t border-[var(--border)] px-6 py-4">
              <button
                type="button"
                onClick={() => setSelectedProperty(null)}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 py-2 text-sm font-semibold transition hover:bg-[var(--muted)]"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type InfoItemProps = {
  label: string;
  value: string | number;
  highlight?: boolean;
};

function InfoItem({ label, value, highlight = false }: InfoItemProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/20 px-4 py-3">
      <p className="text-xs font-medium text-[var(--muted-foreground)]">
        {label}
      </p>

      <p
        className={`mt-1 break-words text-sm font-medium ${
          highlight ? "text-base font-bold text-[var(--primary)]" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
