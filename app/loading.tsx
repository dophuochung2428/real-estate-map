export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#08131d] text-white flex items-center justify-center px-4">
      <div className="inline-flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-center shadow-xl shadow-black/20">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-400/20 border-t-cyan-400" />
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Đang tải...</p>
      </div>
    </div>
  );
}
