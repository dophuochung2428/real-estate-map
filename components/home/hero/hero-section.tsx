"use client";

import { useRouter } from "next/navigation";

import Container from "@/components/layout/container";

import { PROPERTY_TYPE_LABEL } from "@/constants/property";

import { useState } from "react";

import SearchInput from "@/components/search/search-input";

import ProvinceSelect from "@/components/search/province-select";

import PriceSelect from "@/components/search/price-select";

import { SearchFilters } from "@/types/search";

import { buildSearchQueryHeroSection } from "@/lib/search/build-query";

type Props = {
  provinces: string[];
};

export default function HeroSection({ provinces }: Props) {
  const router = useRouter();

  const [filters, setFilters] = useState<SearchFilters>({
    keyword: "",
    province: "",
  });

  const handleSearch = () => {
    const query = buildSearchQueryHeroSection(filters);

    router.push(`/listing?${query}`);
  };

  return (
    <section className="relative h-[620px] overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      <Container className="relative z-10 flex h-full items-center">
        <div className="w-full">
          {/* TITLE */}
          <div className="mx-auto mb-10 max-w-4xl text-center text-white">
            <h1 className="mb-5 text-5xl font-bold leading-tight">
              Tìm kiếm bất động sản
              <br />
              nhanh chóng & dễ dàng
            </h1>

            <p className="text-lg text-white/80">
              Hơn 1 triệu bất động sản đang được đăng tải
            </p>
          </div>

          {/* SEARCH */}
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-[var(--card)]/95 p-6 shadow-2xl backdrop-blur-md">
            {/* SEARCH INPUT */}
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

            {/* FILTERS */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 mt-4">
              {/* LOCATION */}
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

              {/* PRICE */}
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

              {/* SEARCH BUTTON */}
              <button
                onClick={handleSearch}
                className="h-14 rounded-2xl bg-[var(--primary)] px-10 font-semibold text-[var(--primary-foreground)] transition hover:bg-[var(--primary-hover)]"
              >
                Tìm kiếm
              </button>
            </div>

            {/* QUICK TAGS */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-[var(--muted-foreground)]">
                Loại phổ biến:
              </span>
              {Object.entries(PROPERTY_TYPE_LABEL).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    router.push(`/listing?type=${key}`);
                  }}
                  className="rounded-full border border-[var(--border)] bg-[var(--secondary)] px-4 py-2 text-sm font-medium transition hover:border-[var(--primary)] hover:bg-[var(--accent)]"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
