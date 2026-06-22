"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DIRECTION_LABEL, PROPERTY_TYPE_LABEL } from "@/constants/property";
import { formatPrice } from "@/components/map/utils/price-format";

import { updateAppraisal } from "@/services/property.service";

export default function PropertyAppraisalForm({ property }: { property: any }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    contact_name: property.contact_name ?? "",

    contact_phone: property.contact_phone ?? "",

    legal_status: property.legal_status,

    business_advantage: property.business_advantage,

    environment: property.environment ?? "",

    land_area_type: property.land_area_type ?? null,
    land_area: String(property.land_area ?? ""),

    frontage_width: String(property.frontage_width ?? ""),

    max_depth: String(property.max_depth ?? ""),

    land_shape: property.land_shape ?? "",

    asset_on_land: property.asset_on_land ?? "",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await updateAppraisal(property.id, form);

      toast.success("Cập nhật thẩm định thành công");

      setTimeout(() => {
        router.back();
      }, 1000);
    } catch (err) {
      console.error(err);

      toast.error("Không thể cập nhật thẩm định");
    } finally {
      setLoading(false);
    }
  };

  const thumbnail =
    property.property_images?.find((img: any) => img.is_thumbnail)?.image_url ||
    property.property_images?.[0]?.image_url;

  const InfoRow = ({ label, value }: { label: string; value: any }) => (
    <div className="flex items-start justify-between gap-3 border-b border-white/5 py-3">
      <span className="text-sm text-[var(--muted)]">{label}</span>

      <span className="max-w-[60%] text-right text-sm font-medium">
        {value || "-"}
      </span>
    </div>
  );

  return (
    <main className="min-h-screen bg-[var(--background)] p-6">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="
      rounded-xl border border-[var(--border)]
      px-4 py-2
      hover:bg-white/5
    "
          >
            ← Quay lại
          </button>

          <div>
            <h1 className="text-4xl font-bold">Thông tin thẩm định</h1>

            <p className="mt-2 text-[var(--muted)]">{property.title}</p>

            <p
              className={`mt-2 text-sm ${
                property.appraisal_completed_at
                  ? "text-green-400"
                  : "text-yellow-400 font-medium"
              }`}
            >
              {property.appraisal_completed_at
                ? "✓ Bất động sản đã được thẩm định. Bạn có thể cập nhật nếu cần."
                : "⏳ Bất động sản chưa được thẩm định. Vui lòng nhập thông tin để hoàn tất."}
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* LEFT */}
          <div className="rounded-3xl bg-[var(--card)] p-6">
            {/* IMAGE */}
            {thumbnail && (
              <div className="mb-6 overflow-hidden rounded-2xl">
                <img
                  src={thumbnail}
                  alt={property.title}
                  className="h-56 w-full object-cover"
                />
              </div>
            )}

            {/* STATUS */}
            <div
              className={`
      rounded-2xl border p-4
      ${
        property.appraisal_completed_at
          ? "border-green-500/20 bg-green-500/10"
          : "border-yellow-500/20 bg-yellow-500/10"
      }
    `}
            >
              <p className="text-sm text-[var(--muted)]">
                Trạng thái thẩm định
              </p>

              <p
                className={`mt-2 font-semibold ${
                  property.appraisal_completed_at
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {property.appraisal_completed_at
                  ? "✓ Đã thẩm định"
                  : "⏳ Chưa thẩm định"}
              </p>
            </div>

            {/* PROPERTY INFO */}
            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Thông tin bất động sản
              </h3>

              <InfoRow label="Tiêu đề" value={property.title} />

              <InfoRow
                label="Giá"
                value={formatPrice(Number(property.price))}
              />

              <InfoRow label="Diện tích" value={`${property.area} m²`} />

              <InfoRow
                label="Loại"
                value={
                  PROPERTY_TYPE_LABEL[
                    property.type as keyof typeof PROPERTY_TYPE_LABEL
                  ]
                }
              />

              <InfoRow
                label="Hướng"
                value={
                  property.direction
                    ? DIRECTION_LABEL[
                        property.direction as keyof typeof DIRECTION_LABEL
                      ]
                    : "-"
                }
              />

              <InfoRow label="Tỉnh / Thành" value={property.province} />

              <InfoRow label="Quận / Huyện" value={property.district} />

              <InfoRow label="Địa chỉ" value={property.address} />
            </div>

            {/* SYSTEM */}
            <div className="mt-8">
              <h3 className="mb-3 text-lg font-semibold">Thông tin hệ thống</h3>

              <InfoRow
                label="Ngày tạo"
                value={
                  property.created_at
                    ? new Date(property.created_at).toLocaleDateString("vi-VN")
                    : "-"
                }
              />

              <InfoRow
                label="Ngày thẩm định"
                value={
                  property.appraisal_completed_at
                    ? new Date(
                        property.appraisal_completed_at,
                      ).toLocaleDateString("vi-VN")
                    : "-"
                }
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-3xl bg-[var(--card)] p-6">
            <h2 className="mb-6 text-2xl font-bold">Dữ liệu thẩm định</h2>

            <div className="grid gap-5">
              {/* CONTACT NAME */}
              <div>
                <label className="mb-2 block font-medium">Tên liên hệ</label>

                <input
                  value={form.contact_name}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      contact_name: e.target.value,
                    }))
                  }
                  className="h-12 w-full rounded-2xl border border-[var(--border)] bg-transparent px-4 outline-none"
                />
              </div>

              {/* CONTACT PHONE */}
              <div>
                <label className="mb-2 block font-medium">Số điện thoại</label>

                <input
                  value={form.contact_phone}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      contact_phone: e.target.value,
                    }))
                  }
                  className="h-12 w-full rounded-2xl border border-[var(--border)] bg-transparent px-4 outline-none"
                />
              </div>

              {/* LEGAL */}
              <div>
                <label className="mb-2 block font-medium">
                  Tình trạng pháp lý
                </label>

                <select
                  value={
                    form.legal_status === null ? "" : String(form.legal_status)
                  }
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      legal_status:
                        e.target.value === ""
                          ? null
                          : e.target.value === "true",
                    }))
                  }
                  className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4"
                >
                  <option value="">Chưa chọn</option>

                  <option value="true">Có sổ</option>

                  <option value="false">Không có sổ</option>
                </select>
              </div>

              {/* BUSINESS ADVANTAGE */}
              <div>
                <label className="mb-2 block font-medium">
                  Lợi thế kinh doanh
                </label>

                <select
                  value={
                    form.business_advantage === null
                      ? ""
                      : String(form.business_advantage)
                  }
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      business_advantage:
                        e.target.value === ""
                          ? null
                          : e.target.value === "true",
                    }))
                  }
                  className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4"
                >
                  <option value="">Chưa chọn</option>

                  <option value="true">Có</option>

                  <option value="false">Không</option>
                </select>
              </div>

              {/* ENVIRONMENT */}
              <div>
                <label className="mb-2 block font-medium">
                  An ninh - môi trường
                </label>

                <textarea
                  rows={4}
                  value={form.environment}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      environment: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-[var(--border)] bg-transparent p-4 outline-none"
                />
              </div>

              {/* LAND AREA */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium">
                    Loại diện tích
                  </label>

                  <select
                    value={form.land_area_type ?? ""}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        land_area_type: e.target.value || null,
                      }))
                    }
                    className="h-12 w-full rounded-2xl border border-[var(--border)] px-4"
                  >
                    <option value="">Chọn loại diện tích</option>
                    <option value="ONT">ONT</option>
                    <option value="CLN">CLN</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-medium">Diện tích</label>

                  <input
                    value={form.land_area}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        land_area: e.target.value.replace(/[^\d.]/g, ""),
                      }))
                    }
                    placeholder="Nhập diện tích"
                    className="h-12 w-full rounded-2xl border border-[var(--border)] px-4"
                  />
                </div>
              </div>

              {/* DIMENSIONS */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium">
                    Chiều rộng mặt tiền
                  </label>

                  <input
                    value={form.frontage_width}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        frontage_width: e.target.value.replace(/[^\d.]/g, ""),
                      }))
                    }
                    className="h-12 w-full rounded-2xl border border-[var(--border)] px-4"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    Chiều sâu lớn nhất
                  </label>

                  <input
                    value={form.max_depth}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        max_depth: e.target.value.replace(/[^\d.]/g, ""),
                      }))
                    }
                    className="h-12 w-full rounded-2xl border border-[var(--border)] px-4"
                  />
                </div>
              </div>

              {/* SHAPE */}
              <div>
                <label className="mb-2 block font-medium">
                  Hình thể thửa đất
                </label>

                <select
                  value={form.land_shape}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      land_shape: e.target.value,
                    }))
                  }
                  className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4"
                >
                  <option value="">Chọn hình thể</option>

                  <option value="square">Vuông</option>

                  <option value="rectangle">Chữ nhật</option>

                  <option value="expanding_back">Nở hậu</option>

                  <option value="narrowing_back">Tóp hậu</option>

                  <option value="irregular">Không đều</option>
                </select>
              </div>

              {/* ASSET */}
              <div>
                <label className="mb-2 block font-medium">
                  Tài sản trên đất
                </label>

                <textarea
                  rows={4}
                  value={form.asset_on_land}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      asset_on_land: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-[var(--border)] bg-transparent p-4 outline-none"
                />
              </div>

              {/* BUTTON */}
              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="
                        h-12 rounded-2xl
                        border border-green-500/20
                        bg-green-500/10
                        px-6
                        font-semibold
                        text-green-400
                        transition
                        hover:bg-green-500/20
                        disabled:opacity-60
                        "
                >
                  {loading ? "Đang lưu..." : "Lưu thông tin thẩm định"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
