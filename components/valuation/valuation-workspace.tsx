"use client";

import { useState } from "react";
import { ValuationSearchForm } from "@/types/valuation";
import { Property } from "@/types/property";

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

  const [comparables, setComparables] = useState<Property[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  async function handleSearch() {
    const response = await fetch("/api/valuation/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    setComparables(result);

    console.log(result);
    console.log("Comparables:", comparables.length);
  }

  function updateField(key: string, value: string) {
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
            className="
              rounded-xl
              bg-[var(--primary)]
              px-4
              py-2
              text-white
            "
            onClick={handleSearch}
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
                TSSS 1
              </th>

              <th
                className="
                  border
                  border-[var(--border)]
                  bg-[var(--hover)]
                  p-3
                "
              >
                TSSS 2
              </th>

              <th
                className="
                  border
                  border-[var(--border)]
                  bg-[var(--hover)]
                  p-3
                "
              >
                TSSS 3
              </th>
            </tr>
          </thead>

          <tbody>
            <EditableInputRow
              stt="1"
              label="Nguồn tin"
              value={form.source}
              onChange={(v) => updateField("source", v)}
            />

            <EditableInputRow
              stt="2"
              label="Liên hệ"
              value={form.contact}
              onChange={(v) => updateField("contact", v)}
            />

            <EditableInputRow
              stt="3"
              label="Tình trạng giao dịch / Thời điểm"
              value={form.appraisalDate}
              onChange={(v) => updateField("appraisalDate", v)}
            />

            <EditableInputRow
              stt="4"
              label="Địa chỉ"
              value={form.address}
              onChange={(v) => updateField("address", v)}
            />

            <EditableSelectRow
              stt="5"
              label="Tình trạng pháp lý"
              value={form.legalStatus}
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
              onChange={(v) => updateField("trafficLocation", v)}
            />

            <EditableInputRow
              stt="8"
              label="An ninh, môi trường sống"
              value={form.environment}
              onChange={(v) => updateField("environment", v)}
            />

            <EditableInputRow
              stt="9"
              label="Diện tích thửa đất (m²)"
              value={form.area}
              onChange={(v) => updateField("area", v)}
            />

            <EditableSelectRow
              stt="10"
              label="Mục đích sử dụng đất"
              value={form.landAreaType}
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
              onChange={(v) => updateField("landArea", v)}
            />

            <EditableInputRow
              stt="12"
              label="Chiều rộng mặt tiền tiếp giáp đường chính (m)"
              value={form.frontageWidth}
              onChange={(v) => updateField("frontageWidth", v)}
            />

            <EditableInputRow
              stt="13"
              label="Chiều sâu dài nhất (m)"
              value={form.maxDepth}
              onChange={(v) => updateField("maxDepth", v)}
            />

            <EditableInputRow
              stt="14"
              label="Hình thể thửa đất"
              value={form.landShape}
              onChange={(v) => updateField("landShape", v)}
            />

            <EditableInputRow
              stt="15"
              label="Tài sản trên đất"
              value={form.assetOnLand}
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
  onChange,
}: {
  stt: string;
  label: string;
  value: string;
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

      <td className="border border-[var(--border)] p-3"></td>
      <td className="border border-[var(--border)] p-3"></td>
      <td className="border border-[var(--border)] p-3"></td>
    </tr>
  );
}

function EditableSelectRow({
  stt,
  label,
  value,
  onChange,
  options,
}: {
  stt: string;
  label: string;
  value: string;
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

      <td className="border border-[var(--border)] p-3"></td>
      <td className="border border-[var(--border)] p-3"></td>
      <td className="border border-[var(--border)] p-3"></td>
    </tr>
  );
}
