"use client";

import { Search } from "lucide-react";

type Props = {
  value: string;

  onChange: (value: string) => void;

  onEnter?: () => void;
};

export default function SearchInput({ value, onChange, onEnter }: Props) {
  return (
    <div className="flex h-14 items-center rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 transition focus-within:border-[var(--primary)]">
      <Search className="mr-3 size-5 text-[var(--muted-foreground)]" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter?.();
          }
        }}
        placeholder="Tìm theo địa chỉ, khu vực, tiêu đề..."
        className="flex-1 bg-transparent outline-none placeholder:text-[var(--muted-foreground)]"
      />
    </div>
  );
}
