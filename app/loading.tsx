export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-4">
      <div className="inline-flex flex-col items-center justify-center gap-4 rounded-3xl border border-[var(--border)] bg-[var(--card)] px-8 py-10 text-center shadow-xl shadow-slate-900/10">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-200 border-t-[var(--primary)]" />
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--primary)]">Đang tải...</p>
      </div>
    </div>
  );
}
