export default function MapPreviewSection() {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="overflow-hidden rounded-[32px] bg-[var(--card)] shadow-sm border border-[var(--border)]">
          {/* MAP */}
          <div className="relative h-[500px] bg-[#dbeafe]">
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-4xl font-bold text-[var(--primary)]">MAP VIEW</h2>
            </div>

            {/* FLOATING CARD */}
            <div className="absolute left-10 top-10 rounded-2xl bg-[var(--card)] border border-[var(--border)] p-5 shadow-xl">
              <p className="mb-2 text-sm text-[var(--text-muted)]">Bất động sản gần đây</p>

              <h3 className="text-xl font-bold text-[var(--heading)]">12.450 tin đăng</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
