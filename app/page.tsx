"use client";

import { useState } from "react";
import MapWrapper from "@/components/MapWrapper";
import { Filters } from "@/types/filter";
import Header from "@/components/Header";
import SearchFilter from "@/components/SearchFilter";
import { useRef } from "react";

export default function Home() {
  const [openSearch, setOpenSearch] = useState(false);

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

  const mapControlsRef = useRef<{
    moveToLocation: (address: string) => Promise<void>;
  } | null>(null);

  const handleLocationSearch = (address: string) => {
    if (mapControlsRef.current) {
      mapControlsRef.current.moveToLocation(address);
    }
    setOpenSearch(false); // Close popup
  };

  return (
    <div className="h-screen">
      <Header onToggleSearch={() => setOpenSearch((p) => !p)} />

      {openSearch && (
        <SearchFilter
          filters={filters}
          onClose={() => setOpenSearch(false)}
          onApply={(f) => setFilters(f)}
          onLocationSearch={handleLocationSearch}
        />
      )}

      <MapWrapper
        data={[]}
        filters={filters}
        onMapReady={(controls) => (mapControlsRef.current = controls)}
      />
    </div>
  );
}
