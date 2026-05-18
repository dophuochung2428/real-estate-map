import { ReactNode } from "react";

import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import { requireAuth } from "@/features/auth/server/require-auth";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  await requireAuth();

  return (
    <main className="flex min-h-screen bg-[var(--background)]">
      <DashboardSidebar />
      <div className="flex-1 p-6">{children}</div>
    </main>
  );
}
