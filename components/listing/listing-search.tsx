"use client";

import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";

export default function ListingSearch() {
  return (
    <div className="rounded-3xl bg-[var(--card)] p-5 shadow-sm border border-[var(--border)]">
      {/* SEARCH */}
      <div className="flex flex-col gap-3 lg:flex-row">
        {/* INPUT */}
        <div className="flex h-14 flex-1 items-center rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4">
          <Search className="mr-3 size-5 text-[var(--muted-foreground)]" />

          <input
            placeholder="Tìm kiếm bất động sản..."
            className="flex-1 outline-none placeholder:text-[var(--muted-foreground)]"
          />
        </div>

        {/* FILTERS */}
        {["Khu vực", "Mức giá", "Diện tích", "Loại hình"].map((item) => (
          <button
            key={item}
            className="flex h-14 items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 lg:w-[180px]"
          >
            <span className="text-sm font-medium text-[var(--foreground)]">{item}</span>

            <ChevronDown className="size-4 text-[var(--muted-foreground)]" />
          </button>
        ))}

        {/* BTN */}
        <button className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] px-8 font-semibold text-[var(--primary-foreground)]">
          <SlidersHorizontal className="size-5" />
          Lọc
        </button>
      </div>
    </div>
  );
}
