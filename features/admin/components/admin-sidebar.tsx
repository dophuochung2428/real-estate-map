"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { LayoutDashboard, Building2, Users, LogOut } from "lucide-react";

import { useLogout } from "@/features/auth/hooks/use-logout";

const menuItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    href: "/admin/properties",
    label: "Quản lý bài đăng",
    icon: Building2,
  },

  {
    href: "/admin/users",
    label: "Quản lý người dùng",
    icon: Users,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const { logout, isLoading } = useLogout();

  return (
    <aside
      className="
        flex
        h-screen sticky top-0
        w-64
        flex-col
        border-r
        border-[var(--border)]
        bg-[var(--card)]
      "
    >
      {/* LOGO */}
      <div className="border-b border-[var(--border)] p-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      {/* MENU */}
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
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
                      : "hover:bg-[var(--muted)]"
                  }
                `}
              >
                <item.icon size={18} />

                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
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
            hover:bg-red-50
            hover:text-red-500
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
