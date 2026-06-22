"use client";

import { useState } from "react";

export default function ValuationWorkspace() {
  const [form, setForm] = useState({
    area: "",
    ontArea: "",
    clnArea: "",

    frontageWidth: "",
    maxDepth: "",

    legalStatus: "",

    businessAdvantage: "",

    landShape: "",

    assetOnLand: "",

    source: "",

    contact: "",

    address: "",
  });

  function updateField(key: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div className="flex h-full gap-6">
      {/* LEFT */}
      <div className="w-[420px] shrink-0">
        <div
          className="
                rounded-2xl
                border
                border-[var(--border)]
                bg-[var(--card)]
                p-5
            "
        >
          <h2 className="mb-5 text-lg font-semibold">Thông tin TSTĐ</h2>

          <div className="space-y-4">
            <Field
              label="Diện tích"
              value={form.area}
              onChange={(v) => updateField("area", v)}
            />

            <Field
              label="Đất ONT"
              value={form.ontArea}
              onChange={(v) => updateField("ontArea", v)}
            />

            <Field
              label="Đất CLN"
              value={form.clnArea}
              onChange={(v) => updateField("clnArea", v)}
            />

            <Field
              label="Mặt tiền"
              value={form.frontageWidth}
              onChange={(v) => updateField("frontageWidth", v)}
            />

            <Field
              label="Chiều sâu"
              value={form.maxDepth}
              onChange={(v) => updateField("maxDepth", v)}
            />

            <Field
              label="Hình thể"
              value={form.landShape}
              onChange={(v) => updateField("landShape", v)}
            />

            <Field
              label="Tài sản trên đất"
              value={form.assetOnLand}
              onChange={(v) => updateField("assetOnLand", v)}
            />

            <Field
              label="Nguồn tin"
              value={form.source}
              onChange={(v) => updateField("source", v)}
            />

            <Field
              label="Liên hệ"
              value={form.contact}
              onChange={(v) => updateField("contact", v)}
            />

            <Field
              label="Địa chỉ"
              value={form.address}
              onChange={(v) => updateField("address", v)}
            />

            <button
              className="
                mt-4
                w-full
                rounded-xl
                bg-[var(--primary)]
                py-3
                text-white
              "
            >
              Tìm TSSS
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="min-w-0 flex-1">
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
                border-b
                border-[var(--border)]
                px-5
                py-4
            "
          >
            <h2 className="font-semibold">Preview Excel</h2>
          </div>

          <div className="overflow-auto">
            <table
              className="
                w-full
                border-collapse
                text-sm
            "
            >
              <thead>
                <tr className="hover:bg-[var(--hover)]">
                  <th
                    className="
                        border
                        border-[var(--border)]
                        bg-[var(--hover)]
                        p-3
                        text-left
                        font-semibold
                        text-[var(--foreground)]
                    "
                  >
                    Đặc điểm
                  </th>

                  <th
                    className="
                        border
                        border-[var(--border)]
                        bg-[var(--hover)]
                        p-3
                        text-left
                        font-semibold
                        text-[var(--foreground)]
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
                        text-left
                        font-semibold
                        text-[var(--foreground)]
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
                        text-left
                        font-semibold
                        text-[var(--foreground)]
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
                        text-left
                        font-semibold
                        text-[var(--foreground)]
                    "
                  >
                    TSSS 3
                  </th>
                </tr>
              </thead>

              <tbody>
                <PreviewRow label="Nguồn tin" value={form.source} />

                <PreviewRow label="Liên hệ" value={form.contact} />

                <PreviewRow label="Địa chỉ" value={form.address} />

                <PreviewRow label="Diện tích" value={form.area} />

                <PreviewRow label="Đất ONT" value={form.ontArea} />

                <PreviewRow label="Đất CLN" value={form.clnArea} />

                <PreviewRow label="Mặt tiền" value={form.frontageWidth} />

                <PreviewRow label="Chiều sâu" value={form.maxDepth} />

                <PreviewRow label="Hình thể" value={form.landShape} />

                <PreviewRow label="Tài sản trên đất" value={form.assetOnLand} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
            h-11
            w-full
            rounded-xl
            border
            border-[var(--border)]
            bg-[var(--background)]
            px-3
            text-[var(--foreground)]
            outline-none

            focus:border-[var(--primary)]
        "
      />
    </div>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="hover:bg-[var(--hover)]">
      <td
        className="
            border
            border-[var(--border)]
            p-3
            text-[var(--foreground)]
            font-medium
        "
      >
        {label}
      </td>

      <td
        className="
            border
            border-[var(--border)]
            p-3
            text-[var(--foreground)]
        "
      >
        {value}
      </td>

      <td
        className="
            border
            border-[var(--border)]
            p-3
            text-[var(--foreground)]
        "
      ></td>

      <td
        className="
            border
            border-[var(--border)]
            p-3
            text-[var(--foreground)]
        "
      ></td>

      <td
        className="
            border
            border-[var(--border)]
            p-3
            text-[var(--foreground)]
        "
      ></td>
    </tr>
  );
}
