const stats = [
  {
    label: "Tổng bài đăng",
    value: 128,
  },
  {
    label: "Chờ duyệt",
    value: 16,
  },
  {
    label: "Đã duyệt",
    value: 92,
  },
  {
    label: "Người dùng",
    value: 42,
  },
];

const pendingProperties = [
  {
    id: 1,
    title: "Bán nhà mặt tiền Quận 7",
    user: "Nguyễn Văn A",
    time: "2 giờ trước",
  },
  {
    id: 2,
    title: "Căn hộ cao cấp Thủ Đức",
    user: "Trần Văn B",
    time: "5 giờ trước",
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p className="mt-2 text-[var(--muted-foreground)]">
        Tổng quan hệ thống bất động sản.
      </p>

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

      <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Tin chờ duyệt gần đây</h2>
        </div>

        <div className="space-y-4">
          {pendingProperties.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-[var(--border)] p-4"
            >
              <div>
                <h3 className="font-semibold">{item.title}</h3>

                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  {item.user} • {item.time}
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
