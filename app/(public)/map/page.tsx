"use client";

import { useState, useRef } from "react";

import MainHeader from "@/components/layout/header/main-header";
import MapWrapper from "@/components/map/map-wrapper";
import PropertyDetailPanel from "@/components/map/property-detail-panel";
import SearchFilter from "@/components/SearchFilter";

import { Filters } from "@/types/filter";
import { Property } from "@/types/property";
import { useDebounce } from "@/hooks/use-debounce";

type MapControls = {
  moveToLocation: (address: string) => Promise<void>;
};

export default function MapPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  const mapControlsRef = useRef<MapControls | null>(null);

  // =========================
  // FILTER STATE
  // =========================
  const [filters, setFilters] = useState<Filters>({
    keyword: "",
    location: "",
    type: "",
    direction: "",
    minPrice: undefined,
    maxPrice: undefined,
    minArea: undefined,
    maxArea: undefined,
  });

  // =========================
  // DATA STATE (API SOURCE)
  // =========================
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );

  const [showFilters, setShowFilters] = useState(false);

  // =========================
  // FILTER HANDLER
  // =========================
  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  // =========================
  // LOCATION SEARCH
  // =========================
  const handleLocationSearch = async (address: string) => {
    if (!mapControlsRef.current) return;

    await mapControlsRef.current.moveToLocation(address);
  };

  const debouncedFilters = useDebounce(filters, 500);

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#f5f5f5]">
      {/* HEADER */}
      <MainHeader />

      {/* MAP CONTAINER */}
      <div className="relative flex-1 overflow-hidden">
        {/* MAP */}
        <div className="absolute inset-0 z-0">
          <MapWrapper
            data={[]}
            filters={debouncedFilters}
            onPropertySelect={setSelectedProperty}
            onDataChange={setProperties}
            onLoadingChange={setLoading}
            onMapReady={(controls) => {
              mapControlsRef.current = controls;
            }}
          />
        </div>

        {loading && (
          <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="rounded-xl bg-white px-5 py-3 shadow-xl">
              Đang tải dữ liệu...
            </div>
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="absolute bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-white px-4 py-2 shadow-xl">
            Không tìm thấy bất động sản
          </div>
        )}

        {/* OVERLAY UI */}
        <div className="pointer-events-none absolute inset-0 z-50">
          {/* FILTER BUTTON */}
          <div className="pointer-events-auto absolute top-4 left-12">
            <button
              onClick={() => setShowFilters(true)}
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur hover:bg-slate-800"
            >
              Tìm kiếm nhanh
            </button>
          </div>

          {/* DETAIL PANEL */}
          <div className="pointer-events-auto">
            <PropertyDetailPanel
              property={selectedProperty}
              onClose={() => setSelectedProperty(null)}
            />
          </div>
        </div>

        {/* FILTER MODAL */}
        {showFilters && (
          <SearchFilter
            filters={filters}
            onClose={() => setShowFilters(false)}
            onApply={handleApplyFilters}
            onLocationSearch={handleLocationSearch}
          />
        )}
      </div>
    </main>
  );
}
