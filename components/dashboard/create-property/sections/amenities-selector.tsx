const amenities = [
  "Hồ bơi",
  "Gym",
  "Ban công",
  "Smart Home",
  "Bãi đỗ xe",
  "Sân vườn",
  "Bảo vệ 24/7",
  "Nội thất đầy đủ",
];

export default function AmenitiesSelector() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-2xl font-bold">Tiện ích</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {amenities.map((item) => (
          <label
            key={item}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border p-5 transition hover:border-red-600"
          >
            <input type="checkbox" />

            <span className="font-medium">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
