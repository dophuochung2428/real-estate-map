"use client";

import { Search } from "lucide-react";

export default function StickySearchBar() {
  return (
    <div className="sticky top-20 z-30 mb-6 rounded-3xl bg-[var(--card)]/95 p-4 shadow-lg backdrop-blur-xl border border-[var(--border)]">
      <div className="flex h-14 items-center rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4">
        <Search className="mr-3 size-5 text-[var(--muted-foreground)]" />

        <input
          placeholder="Tìm kiếm bất động sản..."
          className="flex-1 bg-transparent outline-none text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
        />

        <button className="rounded-xl bg-[var(--primary)] px-5 py-2 font-semibold text-[var(--primary-foreground)] transition hover:bg-[var(--primary-hover)]">
          Tìm
        </button>
      </div>
    </div>
  );
}
