"use client";

import { ChevronDown, MapPin, Search } from "lucide-react";

import { useRouter } from "next/navigation";

import Container from "@/components/layout/container";

const tabs = ["Mua bán", "Cho thuê", "Dự án"];

export default function HeroSection() {
  const router = useRouter();
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
          <div className="mx-auto max-w-5xl rounded-3xl bg-[var(--card)] border border-[var(--border)] p-5 shadow-2xl">
            {/* TABS */}
            <div className="mb-5 flex gap-3 overflow-auto">
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                    index === 0
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                      : "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary-hover)]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* SEARCH BAR */}
            <div className="flex flex-col gap-3 lg:flex-row">
              {/* INPUT */}
              <div className="flex h-14 flex-1 items-center rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4">
                <Search className="mr-3 size-5 text-[var(--muted-foreground)]" />

                <input
                  placeholder="Tìm theo khu vực, dự án..."
                  className="flex-1 outline-none placeholder:text-[var(--muted-foreground)]"
                />
              </div>

              {/* LOCATION */}
              <button className="flex h-14 items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 lg:w-[220px]">
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-[var(--primary)]" />

                  <span className="text-sm font-medium text-[var(--foreground)]">Khu vực</span>
                </div>

                <ChevronDown className="size-4 text-[var(--muted-foreground)]" />
              </button>

              {/* TYPE */}
              <button className="flex h-14 items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 lg:w-[220px]">
                <span className="text-sm font-medium text-[var(--foreground)]">Mức giá</span>

                <ChevronDown className="size-4 text-[var(--muted-foreground)]" />
              </button>

              {/* BUTTON */}
              <button
                onClick={() => router.push("/listing")}
                className="h-14 rounded-2xl bg-[var(--primary)] px-10 font-semibold text-[var(--primary-foreground)] transition hover:bg-[var(--primary-hover)]"
              >
                Tìm kiếm
              </button>
            </div>

            {/* QUICK TAGS */}
            <div className="mt-5 flex flex-wrap gap-3">
              {[
                "Chung cư",
                "Nhà riêng",
                "Đất nền",
                "Biệt thự",
                "Shophouse",
              ].map((item) => (
                <button
                  key={item}
                  className="rounded-full bg-[var(--secondary)] px-4 py-2 text-sm transition hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
