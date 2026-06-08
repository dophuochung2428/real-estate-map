"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { PROPERTY_TYPE_LABEL } from "@/constants/property";

export default function PropertyTypePills() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const activeType = searchParams.get("type") || "";

  const handleSelect = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!type) {
      params.delete("type");
    } else {
      params.set("type", type);
      params.set("page", "1");
    }

    router.push(`/listing?${params.toString()}`);
  };

  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {/* ALL */}
      <button
        onClick={() => handleSelect("")}
        className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
          activeType === ""
            ? "border-[var(--primary)] bg-[var(--primary)] text-white"
            : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]"
        }`}
      >
        Tất cả
      </button>

      {Object.entries(PROPERTY_TYPE_LABEL).map(([value, label]) => (
        <button
          key={value}
          onClick={() => handleSelect(value)}
          className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
            activeType === value
              ? "border-[var(--primary)] bg-[var(--primary)] text-white"
              : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
