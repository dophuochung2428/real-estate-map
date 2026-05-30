import { getDashboardStats } from "@/features/admin/dashboard/server/get-dashboard-stats";
import { getRecentPendingProperties } from "@/features/admin/dashboard/server/get-recent-pending-properties";

export default async function AdminDashboardPage() {
  const [stats, pendingProperties] = await Promise.all([
    getDashboardStats(),
    getRecentPendingProperties(),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p className="mt-2 text-[var(--muted-foreground)]">
        Tổng quan hệ thống bất động sản.
      </p>

      {/* STATS */}
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5"
          >
            <p className="text-sm text-[var(--muted-foreground)]">
              {item.label}
            </p>

            <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* RECENT PENDING */}
      <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-xl font-semibold mb-6">Tin chờ duyệt gần đây</h2>

        <div className="space-y-4">
          {pendingProperties.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-[var(--border)] p-4"
            >
              <div>
                <h3 className="font-semibold">{item.title}</h3>

                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  {item.profiles?.[0]?.full_name || "Không có tên"} •{" "}
                  {new Date(item.created_at).toLocaleString("vi-VN")}
                </p>
              </div>

              <button className="rounded-xl bg-green-500 px-4 py-2 text-white">
                Duyệt
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
