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
        h-screen
        w-[280px]
        shrink-0
        flex-col
        border-r
        border-[var(--border)]
        bg-[var(--card)]
        lg:flex
      "
    >
      {/* LOGO */}
      <div className="border-b border-[var(--border)] p-6">
        <h1 className="text-2xl font-bold text-[var(--primary)]">RealEstate</h1>
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
            : "hover:bg-[var(--hover)] hover:text-[var(--primary)]"
        }
      `}
    >
      {icon}

      <span className="font-medium">{label}</span>
    </Link>
  );
}
