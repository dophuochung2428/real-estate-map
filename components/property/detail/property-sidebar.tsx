import MortgageCalculator from "./mortgage-calculator";

export default function PropertySidebar({ property }: { property: any }) {
  return (
    <div className="sticky top-24 space-y-6">
      {/* AGENT */}
      <div className="rounded-3xl bg-[var(--card)] p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)]/15 text-2xl font-bold text-[var(--accent)]">
            A
          </div>

          <div>
            <h3 className="font-bold">Nguyễn Văn A</h3>

            <p className="text-sm text-[var(--muted-foreground)]">Chuyên viên tư vấn</p>
          </div>
        </div>

        <button className="mt-6 h-12 w-full rounded-2xl bg-[var(--primary)] font-semibold text-[var(--primary-foreground)] transition hover:bg-[var(--primary-hover)]">
          Liên hệ ngay
        </button>
      </div>

      {/* MORTGAGE */}
      <MortgageCalculator property={property} />
    </div>
  );
}
