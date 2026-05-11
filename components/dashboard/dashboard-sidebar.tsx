"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Building2,
  Heart,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

import { useLogout } from "@/features/auth/hooks/use-logout";

export default function DashboardSidebar() {
  const { logout, isLoading } = useLogout();

  return (
    <aside className="hidden w-[280px] flex-col border-r border-[var(--border)] bg-[var(--card)] lg:flex">
      {/* LOGO */}
      <div className="border-b border-[var(--border)] p-6">
        <h1 className="text-2xl font-bold text-[var(--primary)]">RealEstate</h1>
      </div>

      {/* MENU */}
      <div className="flex-1 p-4">
        <div className="space-y-2">
          <SidebarItem
            href="/dashboard"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />

          <SidebarItem
            href="/dashboard/properties"
            icon={<Building2 size={18} />}
            label="Bất động sản"
          />

          <SidebarItem
            href="/favorites"
            icon={<Heart size={18} />}
            label="Yêu thích"
          />

          <SidebarItem
            href="/notifications"
            icon={<Bell size={18} />}
            label="Thông báo"
          />

          <SidebarItem
            href="/settings"
            icon={<Settings size={18} />}
            label="Cài đặt"
          />
        </div>
      </div>

      {/* LOGOUT */}
      <div className="border-t border-[var(--border)] p-4">
        <button
          onClick={logout}
          disabled={isLoading}
          className="flex h-12 w-full items-center gap-3 rounded-2xl px-4 transition hover:bg-[var(--hover)] hover:text-[var(--error)] disabled:opacity-50"
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
}: {
  href: string;

  icon: React.ReactNode;

  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex h-12 items-center gap-3 rounded-2xl px-4 transition hover:bg-[var(--hover)] hover:text-[var(--primary)]"
    >
      {icon}

      <span className="font-medium">{label}</span>
    </Link>
  );
}
