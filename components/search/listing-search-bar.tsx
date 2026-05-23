"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Container from "@/components/layout/container";

import SearchInput from "./search-input";

import ProvinceSelect from "./province-select";

import PriceSelect from "./price-select";

import { SearchFilters } from "@/types/search";

import { buildSearchQueryHeroSection } from "@/lib/search/build-query";

type Props = {
  provinces: string[];

  initialFilters: SearchFilters;
};

export default function ListingSearchBar({ provinces, initialFilters }: Props) {
  const router = useRouter();

  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  const handleSearch = () => {
    const query = buildSearchQueryHeroSection(filters);

    router.push(`/listing?${query}`);
  };

  return (
    <div className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/90 py-4 backdrop-blur-xl">
      <Container>
        <div className="grid grid-cols-1 gap-3 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm md:grid-cols-[1.5fr_1fr_1fr_auto]">
          <SearchInput
            value={filters.keyword ?? ""}
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                keyword: value,
              }))
            }
            onEnter={handleSearch}
          />

          <ProvinceSelect
            provinces={provinces}
            value={filters.province ?? ""}
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                province: value,
              }))
            }
          />

          <PriceSelect
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                minPrice: value.minPrice,
                maxPrice: value.maxPrice,
              }))
            }
          />

          <button
            onClick={handleSearch}
            className="h-14 rounded-2xl bg-[var(--primary)] px-8 font-semibold text-[var(--primary-foreground)] transition hover:bg-[var(--primary-hover)]"
          >
            Tìm kiếm
          </button>
        </div>
      </Container>
    </div>
  );
}
