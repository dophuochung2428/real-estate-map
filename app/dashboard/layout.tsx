import { ReactNode } from "react";

import { redirect } from "next/navigation";

import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";

import { requireAuth } from "@/features/auth/server/require-auth";

import { createServerClient } from "@/lib/supabase/server";

import DashboardTopbar from "@/components/dashboard/dashboard-topbar";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAuth();

  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // lấy role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

  // admin không được vào dashboard staff
  if (profile?.role !== "staff") {
    redirect("/");
  }

  return (
    <main className="flex h-screen overflow-hidden bg-[var(--background)]">
      <DashboardSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar user={user} />

        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </main>
  );
}
