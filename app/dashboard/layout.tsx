import { ReactNode } from "react";

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
