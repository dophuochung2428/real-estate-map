"use client";

import Link from "next/link";
import Image from "next/image";

import {
  LayoutDashboard,
  Building2,
  Heart,
  Bell,
  Settings,
  LogOut,
  FileSpreadsheet,
} from "lucide-react";

import { usePathname } from "next/navigation";

import { useLogout } from "@/features/auth/hooks/use-logout";

const menuItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    href: "/dashboard/properties",
    label: "Bất động sản",
    icon: Building2,
  },

  {
    href: "/dashboard/market-comparison",
    label: "Thẩm định giá",
    icon: FileSpreadsheet,
  },

  // DEVELOPING
  // {
  //   href: "/favorites",
  //   label: "Yêu thích",
  //   icon: Heart,
  // },

  // {
  //   href: "/notifications",
  //   label: "Thông báo",
  //   icon: Bell,
  // },

  // {
  //   href: "/settings",
  //   label: "Cài đặt",
  //   icon: Settings,
  // },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const { logout, isLoading } = useLogout();

  return (
    <aside
      className="
        hidden
        h-full
        w-[280px]
        shrink-0
        flex-col
        border-r
        border-[var(--border)]
        bg-white
        lg:flex
      "
    >
      {/* LOGO */}
      <div className="border-b border-[var(--border)] p-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logos/logo_v2.png"
            alt="REAL ASSET VALUE Logo"
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-xl object-cover"
            priority
          />

          <div className="min-w-0 flex-1 leading-none">
            <h1 className="truncate text-[15px] font-semibold text-[#1f6fa5]">
              GIÁ TRỊ TÀI SẢN THỰC
            </h1>

            <p className="mt-1 text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
              REAL ASSET VALUE
            </p>

            <p className="mt-1 text-[11px] italic text-red-600">
              Uy tín, chính xác, nhanh chóng
            </p>
          </div>
        </Link>
      </div>

      {/* MENU */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={<item.icon size={18} />}
              label={item.label}
              active={pathname === item.href}
            />
          ))}
        </div>
      </div>

      {/* LOGOUT */}
      <div className="border-t border-[var(--border)] p-4">
        <button
          onClick={logout}
          disabled={isLoading}
          className="
            flex
            h-12
            w-full
            items-center
            gap-3
            rounded-2xl
            px-4
            transition
            hover:bg-[var(--hover)]
            hover:text-[var(--error)]
            disabled:opacity-50
          "
        >
          <LogOut size={18} />

          <span className="font-medium">
            {isLoading ? "Đang đăng xuất..." : "Đăng xuất"}
          </span>
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({
  href,
  icon,
  label,
  active,
}: {
  href: string;

  icon: React.ReactNode;

  label: string;

  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        flex
        h-12
        items-center
        gap-3
        rounded-2xl
        px-4
        transition

        ${
          active
            ? "bg-[var(--primary)] text-white"
            : "text-slate-700 hover:bg-[var(--hover)] hover:text-[var(--primary)]"
        }
      `}
    >
      {icon}

      <span className="font-medium">{label}</span>
    </Link>
  );
}
