"use client";

import { useEffect, useRef, useState } from "react";

type Option = {
  code: string | number;
  name: string;
};

type Props = {
  value: string;
  options: Option[];
  placeholder: string;
  disabled?: boolean;
  error?: string;
  onChange: (value: string) => void;
};

const normalizeText = (text: string) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};

export default function SearchableSelect({
  value,
  options,
  placeholder,
  disabled = false,
  error,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) =>
    normalizeText(option.name).includes(normalizeText(search)),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpen = () => {
    if (disabled) return;

    setOpen(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSelect = (option: Option) => {
    onChange(option.name);

    setSearch("");
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      {/* INPUT */}
      <div
        onClick={handleOpen}
        className={`flex h-12 w-full items-center rounded-2xl border bg-[var(--card)] px-4 ${
          disabled ? "cursor-not-allowed opacity-50" : "cursor-text"
        } ${error ? "border-red-500" : "border-[var(--border)]"}`}
      >
        {open ? (
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={value || placeholder}
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-transparent text-[var(--foreground)] outline-none"
          />
        ) : (
          <span
            className={value ? "text-[var(--foreground)]" : "text-gray-400"}
          >
            {value || placeholder}
          </span>
        )}

        <span
          className={`ml-auto text-xs transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-xl">
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-3 text-sm text-gray-500">
              Không tìm thấy kết quả
            </div>
          ) : (
            filteredOptions.map((option) => (
              <button
                key={option.code}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full rounded-xl px-3 py-2.5 text-left hover:bg-black/5 dark:hover:bg-white/5 ${
                  option.name === value ? "font-semibold" : ""
                }`}
              >
                {option.name}
              </button>
            ))
          )}
        </div>
      )}

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
