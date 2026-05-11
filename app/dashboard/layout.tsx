import { ReactNode } from "react";

import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen bg-[var(--background)]">
      <DashboardSidebar />

      <div className="flex-1 p-6">{children}</div>
    </main>
  );
}
