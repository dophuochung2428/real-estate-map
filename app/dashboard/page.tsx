import DashboardTopbar from "@/components/dashboard/dashboard-topbar";

import StatsCards from "@/components/dashboard/stats-cards";

import PropertyTable from "@/components/dashboard/property-table";

export default function DashboardPage() {
  return (
    <div className="flex-1">
      <DashboardTopbar />

      <div className="p-6">
        <StatsCards />

        <div className="mt-6">
          <PropertyTable />
        </div>
      </div>
    </div>
  );
}
