"use client";

import Link from "next/link";
import { Map, User, LogOut } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

import Container from "../container";
import { createClient } from "@/lib/supabase/client";
import { Great_Vibes } from "next/font/google";

type Profile = {
  full_name: string;
  role: string;
} | null;

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

export default function MainHeader() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile>(null);
  const [role, setRole] = useState("");

  const supabase = createClient();

  const isMobile =
    typeof navigator !== "undefined" &&
    /Mobile|Android|iPhone/i.test(navigator.userAgent);

  const isStaffOrAdmin = role === "admin" || role === "staff";

  const isRestrictedMobile = isMobile && isStaffOrAdmin;

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (!user) {
        setRole("");
        setProfile(null);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", user.id)
        .single();

      setProfile(profile);
      setRole(profile?.role || "");
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;

      setUser(u);

      if (!u) {
        setRole("");
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // avatar giống DashboardTopbar
  const avatar =
    profile?.full_name
      ?.trim()
      ?.split(" ")
      ?.filter(Boolean)
      ?.pop()
      ?.charAt(0)
      ?.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* LEFT */}
          <Link href="/" className="flex items-center gap-4 py-2">
            <Image
              src="/logos/logo_v2.png"
              alt="REAL ASSET VALUE Logo"
              width={72}
              height={72}
              className="h-[72px] w-[72px] rounded-xl object-cover"
              priority
            />

            <div className="hidden md:flex flex-col leading-none">
              <h1 className="text-[22px] font-medium tracking-wide text-[#1f6fa5]">
                GIÁ TRỊ TÀI SẢN THỰC
              </h1>

              <p className="mt-0.5 text-[12px] uppercase tracking-[0.18em] text-slate-400">
                REAL ASSET VALUE | TƯ VẤN & THẨM ĐỊNH
              </p>

              <p
                className={`${greatVibes.className} mt-1 text-[18px] text-red-400`}
              >
                Uy tín, chính xác, nhanh chóng
              </p>
            </div>
          </Link>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {/* MAP luôn có */}
            <Link
              href="/map"
              className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold"
            >
              <Map size={18} />
              <span className="hidden md:inline">Bản đồ</span>
            </Link>

            {/* MOBILE RESTRICTED VIEW */}
            {isRestrictedMobile ? (
              <>
                {/* LOGOUT ONLY */}
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    window.location.href = "/";
                  }}
                  className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut size={18} />
                  <span className="hidden md:inline">Đăng xuất</span>
                </button>
              </>
            ) : (
              <>
                {/* LOGIN */}
                {!user && (
                  <Link href="/login" className="...">
                    <User size={18} />
                    <span className="hidden md:inline">Đăng nhập</span>
                  </Link>
                )}

                {/* STAFF */}
                {role === "staff" && (
                  <>
                    <Link
                      href="/dashboard/properties/create"
                      className="rounded-2xl bg-[var(--primary)] px-5 py-3 font-semibold"
                    >
                      Đăng tin
                    </Link>

                    <Link
                      href="/dashboard/properties"
                      className="flex items-center gap-3 rounded-2xl border px-4 py-2"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
                        {avatar}
                      </div>
                      <div className="hidden md:block">
                        <p className="text-sm font-semibold">
                          {profile?.full_name || "User"}
                        </p>
                        <p className="text-xs">Quản lý tin đăng</p>
                      </div>
                    </Link>
                  </>
                )}

                {/* ADMIN */}
                {role === "admin" && (
                  <Link
                    href="/admin"
                    className="rounded-2xl bg-red-600 px-5 py-3 font-semibold text-white"
                  >
                    Trang quản trị
                  </Link>
                )}

                {/* CUSTOMER LOGOUT */}
                {role === "customer" && user && (
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      window.location.href = "/";
                    }}
                    className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"
                  >
                    <LogOut size={18} />
                    <span className="hidden md:inline">Đăng xuất</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
