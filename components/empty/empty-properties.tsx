import { Building2 } from "lucide-react";

export default function EmptyProperties() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl bg-[var(--card)] border border-[var(--border)] p-16 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-foreground)]">
        <Building2 size={36} />
      </div>

      <h2 className="text-2xl font-bold text-[var(--heading)]">Không tìm thấy bất động sản</h2>

      <p className="mt-3 max-w-md text-[var(--text-muted)]">
        Hãy thử thay đổi bộ lọc hoặc tìm kiếm khu vực khác.
      </p>
    </div>
  );
}
