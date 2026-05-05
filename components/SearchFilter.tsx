"use client";

import { useState, useEffect } from "react";
import { FaBookmark, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { Filters } from "@/types/filter";
import { FaPaperPlane } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { DIRECTION_LABEL, PROPERTY_TYPE_LABEL } from "@/constants/property";
import { PRICE_RANGES, AREA_RANGES } from "@/constants/filter";

interface Props {
  filters: Filters;
  onClose: () => void;
  onApply: (filters: Filters) => void;
  onLocationSearch?: (address: string) => void; 
}

export default function SearchFilter({ filters, onClose, onApply, onLocationSearch }: Props) {
  const [local, setLocal] = useState<Filters>(filters);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  const handleApply = () => {
    onApply(local);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-start pt-20 bg-black/40">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-[800px] bg-white p-5 rounded-xl shadow-xl space-y-5">
        {/* ===== ROW 1: SEARCH ===== */}
        <div className="flex gap-4">
          {/* Search by code */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <FaBookmark className="text-red-500 w-4 h-4" />
              <span className="text-sm font-bold text-gray-700">
                Tìm theo Mã bài viết
              </span>
            </div>

            <div className="flex">
              <input
                placeholder="Nhập mã..."
                className="flex-1 border px-3 py-2 placeholder-gray-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) =>
                  setLocal((p) => ({ ...p, keyword: e.target.value }))
                }
              />

              <button
                className="px-4 bg-red-600 text-white rounded-r-lg hover:bg-red-700 transition"
                onClick={() => onApply(local)}
              >
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Search by location */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600 w-4 h-4" />
              <span className="text-sm font-bold text-gray-700">
                Tìm theo địa phương/địa chỉ
              </span>
            </div>

            <div className="flex">
              <input
                placeholder="VD: Hà Nội, Quận 1, Phường 2..."
                className="flex-1 border px-3 placeholder-gray-400 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) =>
                  setLocal((p) => ({ ...p, location: e.target.value }))
                }
              />

              <button
                className="px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition"
                onClick={() => {
                  if (local.location.trim() && onLocationSearch) {
                    onLocationSearch(local.location.trim()); // ✅ MOVE MAP
                  }
                }}
                disabled={!local.location.trim()}
              >
                <FaPaperPlane />
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
          <div className="flex">
            <select
              value={local.type}
              className="flex-1 border border-gray-300 px-3 py-2 rounded-lg text-gray-400 focus:outline-none focus:ring-0 focus:border-gray-300"
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
              className="flex-1 border border-gray-300 px-3 py-2 rounded-lg text-gray-500"
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
              className="flex-1 border border-gray-300 px-3 py-2 rounded-lg text-gray-500"
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
              className="flex-1 border border-gray-300 px-3 py-2 rounded-lg text-gray-400 focus:outline-none focus:ring-0 focus:border-gray-300"
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
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
