"use client";

import Link from "next/link";
import { Menu, Heart } from "lucide-react";

import { User } from "lucide-react";

import { useState, useEffect } from "react";

import Container from "../container";
import MegaMenu from "./mega-menu";

import { megaMenus } from "@/constants/menu";
import { createClient } from "@/lib/supabase/client";
import { Map } from "lucide-react";

export default function MainHeader() {
  const [openMenu, setOpenMenu] = useState("");

  const [user, setUser] = useState<any>(null);

  const [role, setRole] = useState("");

  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (!user) {
        setRole("");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setRole(profile?.role || "");
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);

      if (!session?.user) {
        setRole("");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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

                  <p className="text-xs text-[var(--text-muted)]">
                    Real Estate Platform
                  </p>
                </div>
              </div>
            </Link>

            {/* <nav className="hidden items-center gap-8 lg:flex">
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
            </nav> */}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {/* <Link href="/favorites" className="relative">
              <Heart size={22} />
            </Link> */}

            <Link
              href="/map"
              className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-semibold transition hover:bg-[var(--hover)] md:px-4 md:py-3"
            >
              <Map size={18} />
              <span className="hidden md:inline">Bản đồ</span>
            </Link>

            {!user && (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-semibold transition hover:bg-[var(--hover)] md:px-4 md:py-3"
              >
                <User size={18} />
                <span className="hidden md:inline">Đăng nhập</span>
              </Link>
            )}

            {role === "staff" && (
              <Link
                href="/dashboard/properties/create"
                className="rounded-2xl bg-[var(--primary)] px-5 py-3 font-semibold text-[var(--primary-foreground)] transition hover:bg-[var(--primary-hover)]"
              >
                Đăng tin
              </Link>
            )}

            {role === "staff" && (
              <Link
                href="/dashboard/properties"
                className="flex items-center gap-3 rounded-2xl border border-[var(--border)] px-4 py-2 hover:bg-[var(--hover)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
                  {(
                    user.user_metadata?.username?.[0] ||
                    user.email?.[0] ||
                    "U"
                  ).toUpperCase()}
                </div>

                <div className="hidden text-left md:block">
                  <p className="text-sm font-semibold">
                    {user.user_metadata?.username || "User"}
                  </p>

                  <p className="text-xs text-[var(--muted-foreground)]">
                    Quản lý tin đăng
                  </p>
                </div>
              </Link>
            )}

            {role === "admin" && (
              <Link
                href="/admin"
                className="rounded-2xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Trang quản trị
              </Link>
            )}

            {/* <button className="lg:hidden">
              <Menu className="size-7" />
            </button> */}
          </div>
        </div>
      </Container>
    </header>
  );
}
