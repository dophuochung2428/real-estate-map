import Link from "next/link";

import { redirect } from "next/navigation";

import { createServerClient } from "@/lib/supabase/server";

import AdminSidebar from "@/features/admin/components/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // chưa login
  if (!user) {
    redirect("/");
  }

  // lấy profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, status")
    .eq("id", user.id)
    .single();

  // không phải admin
  if (profile?.role !== "admin") {
    redirect("/");
  }

  if (profile?.status === "suspended") {
    redirect("/blocked");
  }

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENT */}
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
