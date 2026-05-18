import DashboardTopbar from "@/components/dashboard/dashboard-topbar";
import StatsCards from "@/components/dashboard/stats-cards";
import PropertyTable from "@/components/dashboard/property-table";

import { getMyListings } from "@/services/property.server";
import EmptyState from "@/components/dashboard/empty-state";
import { createServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const listings = await getMyListings();

  const total = listings.length;

  const active = listings.filter((i) => i.status === "active").length;

  const sold = listings.filter((i) => i.status === "sold").length;

  return (
    <div className="flex-1">
      <DashboardTopbar user={user} />

      <div className="p-6">
        <StatsCards total={total} active={active} sold={sold} />

        <div className="mt-6">
          {listings.length === 0 ? (
            <EmptyState />
          ) : (
            <PropertyTable listings={listings} />
          )}
        </div>
      </div>
    </div>
  );
}
