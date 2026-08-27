export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10 text-center shadow-xl shadow-slate-900/10">
        <h1 className="text-3xl font-black">Không tìm thấy trang</h1>
        <p className="mt-4 text-sm text-[var(--muted-foreground)]">
          Trang bạn đang tìm không tồn tại hoặc đã được di chuyển.
        </p>
      </div>
    </div>
  );
}
