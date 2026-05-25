"use client";

import { useState, useRef } from "react";

import MainHeader from "@/components/layout/header/main-header";
import MapWrapper from "@/components/map/map-wrapper";
import PropertyDetailPanel from "@/components/map/property-detail-panel";
import SearchFilter from "@/components/SearchFilter";

import { Filters } from "@/types/filter";
import { Property } from "@/types/property";
import { useDebounce } from "@/hooks/use-debounce";

import Link from "next/link";
import { List } from "lucide-react";

import { GeoFilter } from "@/types/geo-filter";

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
    direction: null,
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

  const [geoFilter, setGeoFilter] = useState<GeoFilter>({
    enabled: false,
    center: null,
    radius: 1000,
  });

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
    <main className="relative h-screen overflow-hidden bg-[#f5f5f5]">
      {/* MAP */}
      <div className="absolute inset-0 z-0">
        <MapWrapper
          data={[]}
          filters={debouncedFilters}
          geoFilter={geoFilter}
          setGeoFilter={setGeoFilter}
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
        <div className="absolute bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-900/90 px-5 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur">
          Không tìm thấy bất động sản
        </div>
      )}

      {/* OVERLAY UI */}
      <div className="pointer-events-none absolute inset-0 z-50">
        {/* FILTER BUTTON */}

        <div className="pointer-events-auto absolute top-4 right-4 md:right-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl mr-3 mt-[-5px] border border-white/10 bg-slate-900/90 px-4 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-black/40"
          >
            <List size={18} />
            Danh sách
          </Link>
        </div>

        <div className="pointer-events-auto absolute top-4 left-4 md:left-12">
          <button
            onClick={() => setShowFilters(true)}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/90 px-4 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-black/40"
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
    </main>
  );
}
