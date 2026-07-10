"use client";

import { useState } from "react";
import { ComparableProperty } from "@/lib/valuation/filter";
import { ValuationSearchForm } from "@/types/valuation";

type ComparablePropertyWithMeta = ComparableProperty & {
  source?: string;
  contact?: string;
  created_at?: string | null;
};

export default function ValuationWorkspace() {
  const [form, setForm] = useState<ValuationSearchForm>({
    source: "",
    contact: "",

    appraisalDate: "",

    address: "",

    legalStatus: "",

    businessAdvantage: "",

    trafficLocation: "",

    environment: "",

    area: "",

    landAreaType: "",
    landArea: "",

    frontageWidth: "",
    maxDepth: "",

    landShape: "",

    assetOnLand: "",
  });

  const [comparables, setComparables] = useState<ComparablePropertyWithMeta[]>(
    [],
  );
  const [isSearching, setIsSearching] = useState(false);

  async function handleSearch() {
    try {
      setIsSearching(true);

      const { source: _source, contact: _contact, ...searchPayload } = form;

      const response = await fetch("/api/valuation/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchPayload),
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const result = (await response.json()) as ComparablePropertyWithMeta[];

      setComparables(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  }

  function updateField(key: string, value: string) {
    if (key === "source" || key === "contact") {
      return;
    }

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--card)]
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-[var(--border)]
          px-5
          py-4
        "
      >
        <h2 className="font-semibold text-lg">Thông tin thị trường</h2>

        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="
    rounded-xl
    bg-[var(--primary)]
    px-4
    py-2
    text-white
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
          >
            {isSearching ? "Đang tìm..." : "Tìm TSSS"}
          </button>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th
                className="
                  border
                  border-[var(--border)]
                  bg-[var(--hover)]
                  p-3
                "
              >
                STT
              </th>

              <th
                className="
                  border
                  border-[var(--border)]
                  bg-[var(--hover)]
                  p-3
                  text-left
                "
              >
                Đặc điểm BĐS
              </th>

              <th
                className="
                  border
                  border-[var(--border)]
                  bg-[var(--hover)]
                  p-3
                  text-left
                "
              >
                TSTĐ
              </th>

              <th
                className="
                  border
                  border-[var(--border)]
                  bg-[var(--hover)]
                  p-3
                "
              >
                {getComparableHeaderLabel(1, comparables[0])}
              </th>

              <th
                className="
                  border
                  border-[var(--border)]
                  bg-[var(--hover)]
                  p-3
                "
              >
                {getComparableHeaderLabel(2, comparables[1])}
              </th>

              <th
                className="
                  border
                  border-[var(--border)]
                  bg-[var(--hover)]
                  p-3
                "
              >
                {getComparableHeaderLabel(3, comparables[2])}
              </th>
            </tr>
          </thead>

          <tbody>
            <ReadOnlyComparisonRow
              stt="1"
              label="Nguồn tin"
              fieldKey="source"
              comparables={comparables}
            />

            <ReadOnlyComparisonRow
              stt="2"
              label="Liên hệ"
              fieldKey="contact"
              comparables={comparables}
            />

            <EditableInputRow
              stt="3"
              label="Tình trạng giao dịch / Thời điểm"
              value={form.appraisalDate}
              fieldKey="appraisalDate"
              comparables={comparables}
              onChange={(v) => updateField("appraisalDate", v)}
            />

            <EditableInputRow
              stt="4"
              label="Địa chỉ"
              value={form.address}
              fieldKey="address"
              comparables={comparables}
              onChange={(v) => updateField("address", v)}
            />

            <EditableSelectRow
              stt="5"
              label="Tình trạng pháp lý"
              value={form.legalStatus}
              fieldKey="legalStatus"
              comparables={comparables}
              onChange={(v) => updateField("legalStatus", v)}
              options={[
                {
                  value: "true",
                  label: "Có",
                },
                {
                  value: "false",
                  label: "Không",
                },
              ]}
            />

            <EditableSelectRow
              stt="6"
              label="Vị trí khu vực, lợi thế kinh doanh"
              value={form.businessAdvantage}
              fieldKey="businessAdvantage"
              comparables={comparables}
              onChange={(v) => updateField("businessAdvantage", v)}
              options={[
                {
                  value: "true",
                  label: "Có lợi thế",
                },
                {
                  value: "false",
                  label: "Không có lợi thế",
                },
              ]}
            />

            <EditableInputRow
              stt="7"
              label="Vị trí giao thông"
              value={form.trafficLocation}
              fieldKey="trafficLocation"
              comparables={comparables}
              onChange={(v) => updateField("trafficLocation", v)}
            />

            <EditableInputRow
              stt="8"
              label="An ninh, môi trường sống"
              value={form.environment}
              fieldKey="environment"
              comparables={comparables}
              onChange={(v) => updateField("environment", v)}
            />

            <EditableInputRow
              stt="9"
              label="Diện tích thửa đất (m²)"
              value={form.area}
              fieldKey="area"
              comparables={comparables}
              onChange={(v) => updateField("area", v)}
            />

            <EditableSelectRow
              stt="10"
              label="Mục đích sử dụng đất"
              value={form.landAreaType}
              fieldKey="landAreaType"
              comparables={comparables}
              onChange={(v) => updateField("landAreaType", v)}
              options={[
                {
                  value: "ODT",
                  label: "ODT",
                },
                {
                  value: "ONT",
                  label: "ONT",
                },
                {
                  value: "LUC",
                  label: "LUC",
                },
                {
                  value: "BHK",
                  label: "BHK",
                },
                {
                  value: "CLN",
                  label: "CLN",
                },
              ]}
            />

            <EditableInputRow
              stt="11"
              label={
                form.landAreaType
                  ? `Diện tích đất ${form.landAreaType} (m²)`
                  : "Diện tích đất theo mục đích sử dụng (m²)"
              }
              value={form.landArea}
              fieldKey="landArea"
              comparables={comparables}
              onChange={(v) => updateField("landArea", v)}
            />

            <EditableInputRow
              stt="12"
              label="Chiều rộng mặt tiền tiếp giáp đường chính (m)"
              value={form.frontageWidth}
              fieldKey="frontageWidth"
              comparables={comparables}
              onChange={(v) => updateField("frontageWidth", v)}
            />

            <EditableInputRow
              stt="13"
              label="Chiều sâu dài nhất (m)"
              value={form.maxDepth}
              fieldKey="maxDepth"
              comparables={comparables}
              onChange={(v) => updateField("maxDepth", v)}
            />

            <EditableInputRow
              stt="14"
              label="Hình thể thửa đất"
              value={form.landShape}
              fieldKey="landShape"
              comparables={comparables}
              onChange={(v) => updateField("landShape", v)}
            />

            <EditableInputRow
              stt="15"
              label="Tài sản trên đất"
              value={form.assetOnLand}
              fieldKey="assetOnLand"
              comparables={comparables}
              onChange={(v) => updateField("assetOnLand", v)}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EditableInputRow({
  stt,
  label,
  value,
  fieldKey,
  comparables,
  onChange,
}: {
  stt: string;
  label: string;
  value: string;
  fieldKey: string;
  comparables: ComparablePropertyWithMeta[];
  onChange: (value: string) => void;
}) {
  return (
    <tr>
      <td
        className="
          border
          border-[var(--border)]
          p-3
          text-center
          text-[var(--foreground)]
        "
      >
        {stt}
      </td>

      <td
        className="
          border
          border-[var(--border)]
          p-3
          font-medium
          text-[var(--foreground)]
        "
      >
        {label}
      </td>

      <td
        className="
          border
          border-[var(--border)]
          p-2
        "
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            rounded-lg
            border
            border-[var(--border)]
            bg-[var(--background)]
            px-3
            py-2
            text-[var(--foreground)]
            outline-none

            focus:border-[var(--primary)]
          "
        />
      </td>

      <ComparableValueCell comparable={comparables[0]} fieldKey={fieldKey} />
      <ComparableValueCell comparable={comparables[1]} fieldKey={fieldKey} />
      <ComparableValueCell comparable={comparables[2]} fieldKey={fieldKey} />
    </tr>
  );
}

function ReadOnlyComparisonRow({
  stt,
  label,
  fieldKey,
  comparables,
}: {
  stt: string;
  label: string;
  fieldKey: string;
  comparables: ComparablePropertyWithMeta[];
}) {
  return (
    <tr>
      <td
        className="
          border
          border-[var(--border)]
          p-3
          text-center
          text-[var(--foreground)]
        "
      >
        {stt}
      </td>

      <td
        className="
          border
          border-[var(--border)]
          p-3
          font-medium
          text-[var(--foreground)]
        "
      >
        {label}
      </td>

      <td
        className="
          border
          border-[var(--border)]
          p-2
        "
      >
        <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)]/70">
          -
        </div>
      </td>

      <ComparableValueCell comparable={comparables[0]} fieldKey={fieldKey} />
      <ComparableValueCell comparable={comparables[1]} fieldKey={fieldKey} />
      <ComparableValueCell comparable={comparables[2]} fieldKey={fieldKey} />
    </tr>
  );
}

function EditableSelectRow({
  stt,
  label,
  value,
  fieldKey,
  comparables,
  onChange,
  options,
}: {
  stt: string;
  label: string;
  value: string;
  fieldKey: string;
  comparables: ComparablePropertyWithMeta[];
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
}) {
  return (
    <tr>
      <td
        className="
          border
          border-[var(--border)]
          p-3
          text-center
          text-[var(--foreground)]
        "
      >
        {stt}
      </td>

      <td
        className="
          border
          border-[var(--border)]
          p-3
          font-medium
          text-[var(--foreground)]
        "
      >
        {label}
      </td>

      <td
        className="
          border
          border-[var(--border)]
          p-2
        "
      >
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            rounded-lg
            border
            border-[var(--border)]
            bg-[var(--background)]
            px-3
            py-2
            text-[var(--foreground)]
          "
        >
          <option value="">Chọn</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </td>

      <ComparableValueCell comparable={comparables[0]} fieldKey={fieldKey} />
      <ComparableValueCell comparable={comparables[1]} fieldKey={fieldKey} />
      <ComparableValueCell comparable={comparables[2]} fieldKey={fieldKey} />
    </tr>
  );
}

function ComparableValueCell({
  comparable,
  fieldKey,
}: {
  comparable?: ComparablePropertyWithMeta;
  fieldKey: string;
}) {
  return (
    <td className="border border-[var(--border)] p-3 text-[var(--foreground)]">
      {getComparableValue(comparable, fieldKey)}
    </td>
  );
}

function getComparableHeaderLabel(
  index: number,
  comparable?: ComparablePropertyWithMeta,
) {
  if (!comparable?.score) {
    return `TSSS ${index}`;
  }

  return `TSSS ${index} (${Math.round(comparable.score)} điểm)`;
}

function getComparableValue(
  comparable: ComparablePropertyWithMeta | undefined,
  fieldKey: string,
) {
  if (!comparable) {
    return "";
  }

  switch (fieldKey) {
    case "source":
      return comparable.source ?? "";
    case "contact":
      return comparable.contact ?? "";
    case "appraisalDate":
      return comparable.created_at
        ? new Date(comparable.created_at).toLocaleDateString("vi-VN")
        : "";
    case "address":
      return comparable.address ?? "";
    case "legalStatus":
      return comparable.legal_status === undefined
        ? ""
        : comparable.legal_status
          ? "Có"
          : "Không";
    case "businessAdvantage":
      return comparable.business_advantage === undefined
        ? ""
        : comparable.business_advantage
          ? "Có lợi thế"
          : "Không có lợi thế";
    case "trafficLocation":
      return comparable.traffic_location ?? "";
    case "environment":
      return comparable.environment ?? "";
    case "area":
      return comparable.area ? `${comparable.area} m²` : "";
    case "landAreaType":
      return comparable.land_area_type ?? "";
    case "landArea":
      return comparable.land_area !== undefined
        ? `${comparable.land_area}`
        : "";
    case "frontageWidth":
      return comparable.frontage_width !== undefined
        ? `${comparable.frontage_width} m`
        : "";
    case "maxDepth":
      return comparable.max_depth !== undefined
        ? `${comparable.max_depth} m`
        : "";
    case "landShape":
      return comparable.land_shape ?? "";
    case "assetOnLand":
      return comparable.asset_on_land ?? "";
    default:
      return "";
  }
}
