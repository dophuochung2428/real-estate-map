"use client";

import Link from "next/link";

import { Heart, Home, Search, User } from "lucide-react";

import { usePathname } from "next/navigation";

const items = [
  {
    icon: Home,
    label: "Trang chủ",
    href: "/",
  },
  {
    icon: Search,
    label: "Tìm kiếm",
    href: "/listing",
  },
  {
    icon: Heart,
    label: "Đã lưu",
    href: "/saved",
  },
  {
    icon: User,
    label: "Tài khoản",
    href: "/profile",
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-4">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-3 transition ${
                active ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"
              }`}
            >
              <item.icon className="size-5" />

              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
