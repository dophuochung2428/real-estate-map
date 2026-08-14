import { formatDirection } from "@/utils/property-format";
import { PROPERTY_TYPE_LABEL } from "@/constants/property";

const LAND_SHAPE_LABELS: Record<string, string> = {
  square: "Vuông",
  rectangle: "Chữ nhật",
  expanding_back: "Nở hậu",
  narrowing_back: "Tóp hậu",
  irregular: "Không đều",
};

export default function PropertyAppraisalSummary({
  property,
}: {
  property: any;
}) {
  const formatBoolean = (value: boolean | null | undefined) => {
    if (value === true) return "Có";
    if (value === false) return "Không";
    return "Chưa cập nhật";
  };

  const formatValue = (value: any, unit = "") => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    return `${value}${unit}`;
  };

  return (
    <div className="overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--card)] shadow-xl">
      <div className="border-b border-[var(--border)] p-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              Thông tin thẩm định
            </h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Thông tin thẩm định được lưu cùng bất động sản và hiển thị ở chế
              độ chỉ đọc.
            </p>
          </div>

          <span
            className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
              property.appraisal_completed_at
                ? "bg-green-500/10 text-green-300"
                : "bg-yellow-500/10 text-yellow-300"
            }`}
          >
            {property.appraisal_completed_at
              ? "Đã thẩm định"
              : "Chưa thẩm định"}
          </span>
        </div>
      </div>

      <div className="grid gap-5 p-8 lg:grid-cols-2">
        <SummaryRow
          label="Ngày thẩm định"
          value={formatValue(
            property.appraisal_completed_at
              ? new Date(property.appraisal_completed_at).toLocaleDateString(
                  "vi-VN",
                )
              : "-",
          )}
        />
        <SummaryRow
          label="Tên liên hệ"
          value={formatValue(property.contact_name)}
        />
        <SummaryRow
          label="Số điện thoại"
          value={formatValue(property.contact_phone)}
        />
        <SummaryRow
          label="Tình trạng pháp lý"
          value={formatBoolean(property.legal_status)}
        />
        <SummaryRow
          label="Lợi thế kinh doanh"
          value={formatBoolean(property.business_advantage)}
        />
        <SummaryRow
          label="Môi trường"
          value={formatValue(property.environment)}
        />
        <div className="lg:col-span-2">
          <p className="mb-3 text-sm text-[var(--muted-foreground)]">
            Thông tin đất
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {(property.landAreas ?? []).map((item: any, index: number) => (
              <div
                key={`${item.type}-${index}`}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5"
              >
                <p className="text-sm text-[var(--muted-foreground)]">
                  Loại đất
                </p>

                <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                  {item.type}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Diện tích
                    </p>

                    <p className="mt-1 font-semibold">
                      {formatValue(item.area, " m²")}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Đơn giá
                    </p>

                    <p className="mt-1 font-semibold">
                      {item.unit_price != null
                        ? `${Number(item.unit_price).toLocaleString("vi-VN")} đồng/m²`
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <SummaryRow
          label="Chiều rộng mặt tiền"
          value={formatValue(property.frontage_width, " m")}
        />
        <SummaryRow
          label="Chiều sâu lớn nhất"
          value={formatValue(property.max_depth, " m")}
        />
        <SummaryRow
          label="Hình thể thửa đất"
          value={formatValue(
            LAND_SHAPE_LABELS[property.land_shape] ?? property.land_shape,
          )}
        />
        <SummaryRow
          label="Tài sản trên đất"
          value={formatValue(property.asset_on_land)}
        />
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="text-sm text-[var(--muted-foreground)]">{label}</p>
      <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">
        {value}
      </p>
    </div>
  );
}
