const amenities = [
  "Ban công",
  "Hồ bơi",
  "Gym",
  "Bãi đỗ xe",
  "Bảo vệ 24/7",
  "Smart Home",
  "Nội thất đầy đủ",
  "Sân vườn",
];

export default function AmenitiesSection() {
  return (
    <div className="rounded-3xl bg-[var(--card)] border border-[var(--border)] p-8 shadow-sm">
      <h2 className="mb-8 text-2xl font-bold text-[var(--heading)]">Tiện ích</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {amenities.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--secondary)] p-4"
          >
            <div className="size-3 rounded-full bg-[var(--primary)]" />

            <span className="font-medium text-[var(--foreground)]">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
