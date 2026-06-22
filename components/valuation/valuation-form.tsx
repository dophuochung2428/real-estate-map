"use client";

import { useState } from "react";

type FormData = {
  source: string;
  contact: string;

  address: string;

  legalStatus: string;

  businessAdvantage: string;

  trafficLocation: string;

  securityEnvironment: string;

  landArea: string;

  ontArea: string;

  clnArea: string;

  frontage: string;

  depth: string;

  shape: string;

  assetOnLand: string;
};

export default function ValuationForm() {
  const [form, setForm] = useState<FormData>({
    source: "",
    contact: "",

    address: "",

    legalStatus: "",

    businessAdvantage: "",

    trafficLocation: "",

    securityEnvironment: "",

    landArea: "",

    ontArea: "",

    clnArea: "",

    frontage: "",

    depth: "",

    shape: "",

    assetOnLand: "",
  });

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSearch() {
    console.log(form);

    // TODO:
    // gọi API tìm TSSS
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Thông tin TSTĐ</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <InputField
          label="Nguồn tin"
          value={form.source}
          onChange={(v) => updateField("source", v)}
        />

        <InputField
          label="Liên hệ"
          value={form.contact}
          onChange={(v) => updateField("contact", v)}
        />

        <InputField
          label="Địa chỉ"
          value={form.address}
          onChange={(v) => updateField("address", v)}
        />

        <InputField
          label="Tình trạng pháp lý"
          value={form.legalStatus}
          onChange={(v) => updateField("legalStatus", v)}
        />

        <InputField
          label="Lợi thế kinh doanh"
          value={form.businessAdvantage}
          onChange={(v) => updateField("businessAdvantage", v)}
        />

        <InputField
          label="Vị trí giao thông"
          value={form.trafficLocation}
          onChange={(v) => updateField("trafficLocation", v)}
        />

        <InputField
          label="An ninh môi trường"
          value={form.securityEnvironment}
          onChange={(v) => updateField("securityEnvironment", v)}
        />

        <InputField
          label="Diện tích đất (m²)"
          value={form.landArea}
          onChange={(v) => updateField("landArea", v)}
        />

        <InputField
          label="Đất ONT (m²)"
          value={form.ontArea}
          onChange={(v) => updateField("ontArea", v)}
        />

        <InputField
          label="Đất CLN (m²)"
          value={form.clnArea}
          onChange={(v) => updateField("clnArea", v)}
        />

        <InputField
          label="Mặt tiền (m)"
          value={form.frontage}
          onChange={(v) => updateField("frontage", v)}
        />

        <InputField
          label="Chiều sâu (m)"
          value={form.depth}
          onChange={(v) => updateField("depth", v)}
        />

        <InputField
          label="Hình thể"
          value={form.shape}
          onChange={(v) => updateField("shape", v)}
        />

        <InputField
          label="Tài sản trên đất"
          value={form.assetOnLand}
          onChange={(v) => updateField("assetOnLand", v)}
        />
      </div>

      <div className="mt-8">
        <button
          onClick={handleSearch}
          className="
            rounded-xl
            bg-[var(--primary)]
            px-5
            py-3
            text-white
          "
        >
          Tìm TSSS
        </button>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-11
          w-full
          rounded-xl
          border
          border-[var(--border)]
          bg-background
          px-3
          outline-none
        "
      />
    </div>
  );
}
