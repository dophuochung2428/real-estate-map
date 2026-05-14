"use client";

import { Search } from "lucide-react";

type Props = {
  value: string;

  onChange: (value: string) => void;
};

export default function SearchBar({
  value,

  onChange,
}: Props) {
  return (
    <div className="relative flex-1">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tìm kiếm bất động sản..."
        className="
          h-12
          w-full
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--card)]
          pl-12
          pr-4
          outline-none
          transition
          focus:border-red-500
        "
      />
    </div>
  );
}
