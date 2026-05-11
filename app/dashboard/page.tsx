import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";

import DashboardTopbar from "@/components/dashboard/dashboard-topbar";

import StatsCards from "@/components/dashboard/stats-cards";

import PropertyTable from "@/components/dashboard/property-table";

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen bg-[var(--background)]">
      {/* SIDEBAR */}
      <DashboardSidebar />

      {/* CONTENT */}
      <div className="flex-1">
        <DashboardTopbar />

        <div className="p-6">
          <StatsCards />

          <div className="mt-6">
            <PropertyTable />
          </div>
        </div>
      </div>
    </main>
  );
}
