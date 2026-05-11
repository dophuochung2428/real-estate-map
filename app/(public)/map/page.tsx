"use client";

import { useState, useRef, useEffect } from "react";

import MainHeader from "@/components/layout/header/main-header";
import MapWrapper from "@/components/map/map-wrapper";
import PropertyDetailPanel from "@/components/map/property-detail-panel";
import SearchFilter from "@/components/SearchFilter";

import { Filters } from "@/types/filter";
import { Property } from "@/types/property";

import { getProperties } from "@/services/property.service";

type MapControls = {
  moveToLocation: (address: string) => Promise<void>;
  refetchData: () => Promise<void>;
};

export default function MapPage() {
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
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );

  const [showFilters, setShowFilters] = useState(false);

  // =========================
  // FETCH DATA FROM API
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const result = await getProperties(filters);

        setProperties(result.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

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
    mapControlsRef.current.refetchData();
  };

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#f5f5f5]">
      {/* HEADER */}
      <MainHeader />

      {/* MAP CONTAINER */}
      <div className="relative flex-1 overflow-hidden">
        {/* MAP */}
        <div className="absolute inset-0 z-0">
          <MapWrapper
            data={properties}
            filters={filters}
            onPropertySelect={setSelectedProperty}
            onMapReady={(controls) => {
              mapControlsRef.current = controls;
            }}
          />
        </div>

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

        {/* LOADING */}
        {loading && (
          <div className="absolute inset-0 z-50 bg-white/60 flex items-center justify-center">
            <p className="text-gray-500">Đang tải dữ liệu...</p>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl bg-red-600 px-4 py-2 text-white"
            >
              Tải lại dữ liệu
            </button>
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && properties.length === 0 && (
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <p className="text-gray-500">Không tìm thấy bất động sản</p>
          </div>
        )}

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
