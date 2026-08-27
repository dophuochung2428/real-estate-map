import { Pencil, Trash2, Eye } from "lucide-react";
import { getPropertyStatus } from "@/lib/property-status";

export default function PropertyRow({ property }: { property: any }) {
  return (
    <div
      className="
        grid grid-cols-[2fr_1fr_1fr_1fr]
        items-center
        px-6 py-5
        transition-colors duration-200
        hover:bg-[var(--hover)]
      "
    >
      {/* TITLE */}
      <div>
        <p className="font-semibold text-[var(--foreground)]">{property.title}</p>

        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          {property.views || 0} lượt xem
        </p>
      </div>

      {/* PRICE */}
      <div className="font-medium text-[var(--foreground)]">{property.price}</div>

      {/* STATUS */}
      <div>
        {(() => {
          const status = getPropertyStatus(property.status);

          return (
            <span
              className={`rounded-full border px-3 py-1 text-sm font-medium ${status.className}`}
            >
              {status.label}
            </span>
          );
        })()}
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-3">
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-slate-600 transition hover:bg-[var(--surface)] hover:text-[var(--foreground)]">
          <Eye size={18} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-slate-600 transition hover:bg-[var(--surface)] hover:text-[var(--foreground)]">
          <Pencil size={18} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50 hover:text-red-700">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
