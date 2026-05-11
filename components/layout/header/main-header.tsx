"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Heart } from "lucide-react";
import { useState } from "react";

import Container from "../container";
import MegaMenu from "./mega-menu";

import { megaMenus } from "@/constants/menu";

export default function MainHeader() {
  const [openMenu, setOpenMenu] = useState("");

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-10">
            {/* LOGO */}
            <Link href="/">
              <div className="flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--primary)] font-bold text-[var(--primary-foreground)]">
                  B
                </div>

                <div>
                  <h1 className="text-lg font-bold">BatDongSan</h1>

                  <p className="text-xs text-[var(--text-muted)]">Real Estate Platform</p>
                </div>
              </div>
            </Link>

            {/* NAV */}
            <nav className="hidden items-center gap-8 lg:flex">
              {/* BUY */}
              <div
                className="relative"
                onMouseEnter={() => setOpenMenu("buy")}
                onMouseLeave={() => setOpenMenu("")}
              >
                <button className="text-sm font-semibold text-[var(--foreground)] transition hover:text-[var(--primary)]">
                  Nhà đất bán
                </button>

                <MegaMenu
                  open={openMenu === "buy"}
                  sections={megaMenus.buy.sections}
                />
              </div>

              {/* RENT */}
              <div
                className="relative"
                onMouseEnter={() => setOpenMenu("rent")}
                onMouseLeave={() => setOpenMenu("")}
              >
                <button className="text-sm font-semibold text-[var(--foreground)] transition hover:text-[var(--primary)]">
                  Nhà đất cho thuê
                </button>

                <MegaMenu
                  open={openMenu === "rent"}
                  sections={megaMenus.rent.sections}
                />
              </div>

              <button className="text-sm font-semibold text-[var(--foreground)] transition hover:text-[var(--primary)]">
                Dự án
              </button>

              <button className="text-sm font-semibold text-[var(--foreground)] transition hover:text-[var(--primary)]">
                Wiki BĐS
              </button>

              <button className="text-sm font-semibold text-[var(--foreground)] transition hover:text-[var(--primary)]">
                Phân tích
              </button>
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <Link href="/favorites" className="relative">
              <Heart size={22} />
            </Link>

            <button className="hidden rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold transition hover:bg-[var(--hover)] md:block">
              Đăng nhập
            </button>

            <Link
              href="/dashboard/properties/create"
              className="rounded-2xl bg-[var(--primary)] px-5 py-3 font-semibold text-[var(--primary-foreground)] transition hover:bg-[var(--primary-hover)]"
            >
              Đăng tin
            </Link>

            <button className="lg:hidden">
              <Menu className="size-7" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
