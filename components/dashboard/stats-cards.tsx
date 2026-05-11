import { Eye, Building2, Heart, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Lượt xem",

    value: "12.4K",

    icon: <Eye size={22} />,
  },

  {
    label: "Tin đăng",

    value: "24",

    icon: <Building2 size={22} />,
  },

  {
    label: "Yêu thích",

    value: "186",

    icon: <Heart size={22} />,
  },

  {
    label: "Tăng trưởng",

    value: "+24%",

    icon: <TrendingUp size={22} />,
  },
];

export default function StatsCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-3xl bg-[var(--card)] p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">{item.label}</p>

              <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)]/15 text-[var(--accent)]">
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
