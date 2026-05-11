export default function Pagination() {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)]">
        1
      </button>

      <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)]">
        2
      </button>

      <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)]">
        3
      </button>
    </div>
  );
}
