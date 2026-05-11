"use client";

import { useState, useEffect } from "react";
import {
  FaBookmark,
  FaSearch,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaSpinner,
} from "react-icons/fa";
import { Filters } from "@/types/filter";
import { FaFilter } from "react-icons/fa";
import { DIRECTION_LABEL, PROPERTY_TYPE_LABEL } from "@/constants/property";
import { PRICE_RANGES, AREA_RANGES } from "@/constants/filter";

interface Props {
  filters: Filters;
  onClose: () => void;
  onApply: (filters: Filters) => void | Promise<void>;
  onLocationSearch?: (address: string) => void | Promise<void>;
}

export default function SearchFilter({ filters, onClose, onApply, onLocationSearch }: Props) {
  const [local, setLocal] = useState<Filters>(filters);
  const [isApplying, setIsApplying] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  const handleApply = async () => {
    setIsApplying(true);

    try {
      await Promise.resolve(onApply(local));
      onClose();
    } finally {
      setIsApplying(false);
    }
  };

  const handleLocationSearch = async () => {
    if (!local.location.trim() || !onLocationSearch) return;

    setIsSearching(true);
    setLocationError(null);

    try {
      await Promise.resolve(onLocationSearch(local.location.trim()));
      onClose();
    } catch (error) {
      setLocationError(
        error instanceof Error
          ? error.message
          : "Không thể tìm địa chỉ. Vui lòng thử lại.",
      );
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-start pt-16 bg-black/40 p-4">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[var(--card)] border border-[var(--border)] p-4 sm:p-5 rounded-xl shadow-xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* ===== ROW 1: SEARCH ===== */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search by code */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <FaBookmark className="text-red-500 w-4 h-4" />
              <span className="text-sm font-bold text-[var(--foreground)]">
                Tìm theo Mã bài viết
              </span>
            </div>

            <div className="flex">
              <input
                placeholder="Nhập mã..."
                className="flex-1 border border-[var(--border)] bg-[var(--secondary)] px-3 py-2 placeholder:text-[var(--text-muted)] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
                onChange={(e) =>
                  setLocal((p) => ({ ...p, keyword: e.target.value }))
                }
              />

              <button
                className="px-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-r-lg hover:bg-[var(--primary-hover)] transition"
                onClick={() => onApply(local)}
              >
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Search by location */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[var(--primary)] w-4 h-4" />
              <span className="text-sm font-bold text-[var(--foreground)]">
                Tìm theo địa phương/địa chỉ
              </span>
            </div>

            <div className="flex">
              <input
                placeholder="VD: Hà Nội, Quận 1, Phường 2..."
                className="flex-1 border border-[var(--border)] bg-[var(--secondary)] px-3 py-2 rounded-l-lg placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
                onChange={(e) =>
                  setLocal((p) => ({ ...p, location: e.target.value }))
                }
              />

              <button
                className="px-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-r-lg hover:bg-[var(--primary-hover)] transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleLocationSearch}
                disabled={!local.location.trim() || isSearching}
              >
                {isSearching ? (
                  <span className="inline-flex items-center gap-2">
                    <FaSpinner className="h-4 w-4 animate-spin" />
                    Tìm
                  </span>
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ===== ROW 2: FILTER ===== */}
        <div className="flex-1 gap-3 items-center">
          <div className="flex items-center gap-2">
            <FaFilter className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-bold text-gray-700">
              Lọc theo các tiêu chí:
            </span>
          </div>
          <div className="flex gap-x-2">
            <select
              value={local.type}
                className="flex-1 border border-[var(--border)] bg-[var(--secondary)] px-3 py-2 rounded-lg text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-0 focus:border-[var(--primary)]"
              onChange={(e) =>
                setLocal((p) => ({
                  ...p,
                  type: e.target.value as Filters["type"],
                }))
              }
            >
              <option value="">-- Loại nhà đất --</option>

              {Object.entries(PROPERTY_TYPE_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            {/* PRICE */}
            <select
              value={
                local.minPrice !== undefined
                  ? PRICE_RANGES.findIndex(
                      (r) => r.min === local.minPrice,
                    ).toString()
                  : "0"
              }
              className="flex-1 border border-[var(--border)] bg-[var(--secondary)] px-3 py-2 rounded-lg text-[var(--foreground)]"
              onChange={(e) => {
                const range = PRICE_RANGES[Number(e.target.value)];
                setLocal((p) => ({
                  ...p,
                  minPrice: range.min,
                  maxPrice: range.max,
                }));
              }}
            >
              {PRICE_RANGES.map((opt, idx) => (
                <option key={idx} value={idx}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* AREA */}
            <select
              value={
                local.minArea !== undefined
                  ? AREA_RANGES.findIndex(
                      (r) => r.min === local.minArea,
                    ).toString()
                  : "0"
              }
              className="flex-1 border border-[var(--border)] bg-[var(--secondary)] px-3 py-2 rounded-lg text-[var(--foreground)]"
              onChange={(e) => {
                const range = AREA_RANGES[Number(e.target.value)];
                setLocal((p) => ({
                  ...p,
                  minArea: range.min,
                  maxArea: range.max,
                }));
              }}
            >
              {AREA_RANGES.map((opt, idx) => (
                <option key={idx} value={idx}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              value={local.direction}
              className="flex-1 border border-[var(--border)] bg-[var(--secondary)] px-3 py-2 rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-0 focus:border-[var(--primary)]"
              onChange={(e) =>
                setLocal((p) => ({
                  ...p,
                  direction: e.target.value as Filters["direction"],
                }))
              }
            >
              <option value="">-- Hướng --</option>

              {Object.entries(DIRECTION_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <button
              onClick={handleApply}
              disabled={isApplying}
              className={`px-5 py-2 rounded-lg text-[var(--primary-foreground)] transition ${
                isApplying
                  ? "bg-[var(--primary)] opacity-70 cursor-not-allowed"
                  : "bg-[var(--primary)] hover:bg-[var(--primary-hover)]"
              }`}
            >
              {isApplying ? "Đang áp dụng..." : "Áp dụng"}
            </button>
          </div>
          {locationError && (
            <div className="rounded-xl border border-red-300 bg-red-100/50 p-3 text-sm text-red-700">
              {locationError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
