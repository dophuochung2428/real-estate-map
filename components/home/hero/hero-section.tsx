"use client";

import { ChevronDown, MapPin, Search } from "lucide-react";

import { useRouter } from "next/navigation";

import Container from "@/components/layout/container";

import { PROPERTY_TYPE_LABEL } from "@/constants/property";
import { PRICE_RANGES } from "@/constants/filter";
import { useState } from "react";

type Props = {
  provinces: string[];
};

export default function HeroSection({ provinces }: Props) {
  const router = useRouter();

  const [price, setPrice] = useState<{
    minPrice?: number;
    maxPrice?: number;
  }>({});

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
            <div className="flex h-14 items-center rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4">
              <Search className="mr-3 size-5 text-[var(--muted-foreground)]" />

              <input
                placeholder="Tìm theo địa chỉ, khu vực, tiêu đề..."
                className="flex-1 bg-transparent outline-none placeholder:text-[var(--muted-foreground)]"
              />
            </div>

            {/* FILTERS */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 mt-4">
              {/* LOCATION */}
              <select className="h-14 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 text-sm font-medium text-[var(--foreground)] outline-none transition hover:border-[var(--primary)]">
                <option value="">-- Tỉnh / Thành phố --</option>

                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>

              {/* PRICE */}
              <select
                value={
                  price.minPrice !== undefined
                    ? PRICE_RANGES.findIndex(
                        (r) => r.min === price.minPrice,
                      ).toString()
                    : "0"
                }
                className="h-14 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 text-sm font-medium text-[var(--foreground)] outline-none transition hover:border-[var(--primary)]"
                onChange={(e) => {
                  const range = PRICE_RANGES[Number(e.target.value)];

                  setPrice({
                    minPrice: range.min,
                    maxPrice: range.max,
                  });
                }}
              >
                {PRICE_RANGES.map((opt, idx) => (
                  <option key={idx} value={idx}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* SEARCH BUTTON */}
              <button
                onClick={() => router.push("/listing")}
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
