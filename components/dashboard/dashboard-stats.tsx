type Props = {
  total: number;

  active: number;

  sold: number;
};

export default function DashboardStats({
  total,

  active,

  sold,
}: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <StatCard title="Tổng tin" value={total} />

      <StatCard title="Đang hoạt động" value={active} />

      <StatCard title="Đã bán" value={sold} />
    </div>
  );
}

function StatCard({
  title,

  value,
}: {
  title: string;

  value: number;
}) {
  return (
    <div className="rounded-3xl bg-[var(--card)] p-6 shadow-sm">
      <p className="text-gray-500">{title}</p>

      <h2 className="mt-4 text-4xl font-bold">{value}</h2>
    </div>
  );
}
