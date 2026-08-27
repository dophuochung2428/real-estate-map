"use client";

import { Search, X, Loader2 } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
type Props = {
  user: User | null;

  profile: {
    full_name: string;
    role: string;
  } | null;
};

export default function DashboardTopbar({ user, profile }: Props) {
  const pathname = usePathname();

  const router = useRouter();

  const searchParams = useSearchParams();

  const keyword = searchParams.get("keyword") || "";

  const [search, setSearch] = useState(keyword);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSearch(keyword);
  }, [keyword]);

  const isPropertiesPage = pathname === "/dashboard/properties";

  const avatar =
    profile?.full_name
      ?.trim()
      ?.split(" ")
      ?.filter(Boolean)
      ?.pop()
      ?.charAt(0)
      ?.toUpperCase() || "U";

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      const value = search.trim();

      if (!value) {
        params.delete("keyword");
      } else {
        params.set("keyword", value);
      }

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("keyword");

    setSearch("");

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-[var(--border)] bg-white px-6">
      {/* LEFT */}
      <div>
        {isPropertiesPage ? (
          <div className="flex h-11 w-[320px] items-center gap-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--background)] px-4 transition  focus-within:border-[var(--primary)]">
            {isPending ? (
              <Loader2
                size={18}
                className="animate-spin text-[var(--muted-foreground)]"
              />
            ) : (
              <Search size={18} className="text-[var(--muted-foreground)]" />
            )}

            <input
              value={search}
              placeholder="Tìm bất động sản..."
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none placeholder:text-[var(--muted-foreground)]"
            />
            {search && (
              <button
                onClick={handleClear}
                className="
      flex
      size-7
      items-center
      justify-center
      rounded-full
      transition
      hover:bg-[var(--hover)]
    "
              >
                <X size={16} className="text-[var(--muted-foreground)]" />
              </button>
            )}
          </div>
        ) : (
          <div>
            <h1 className="text-xl font-bold">Xin chào 👋</h1>

            <p className="text-sm text-[var(--muted-foreground)]">
              Chào mừng quay trở lại
            </p>
          </div>
        )}
      </div>

      {/* PROFILE */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-semibold">{profile?.full_name || "User"}</p>

          <p className="text-sm text-[var(--muted-foreground)]">
            {profile?.role || "User"}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
          {avatar}
        </div>
      </div>
    </div>
  );
}
