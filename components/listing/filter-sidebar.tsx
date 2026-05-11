const sections = [
  {
    title: "Loại bất động sản",
    items: ["Chung cư", "Nhà riêng", "Đất nền", "Biệt thự"],
  },
  {
    title: "Mức giá",
    items: ["Dưới 2 tỷ", "2 - 5 tỷ", "5 - 10 tỷ", "Trên 10 tỷ"],
  },
];

export default function FilterSidebar() {
  return (
    <aside className="sticky top-24 rounded-3xl bg-[var(--card)] p-6 shadow-sm border border-[var(--border)]">
      <h2 className="mb-6 text-2xl font-bold text-[var(--foreground)]">Bộ lọc</h2>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-4 font-bold text-[var(--foreground)]">{section.title}</h3>

            <div className="space-y-3">
              {section.items.map((item) => (
                <label
                  key={item}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <input type="checkbox" className="size-4 rounded border-[var(--border)]" />

                  <span className="text-sm text-[var(--foreground)]">{item}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
