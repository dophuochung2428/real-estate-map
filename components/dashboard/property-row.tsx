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
        hover:bg-white/5
      "
    >
      {/* TITLE */}
      <div>
        <p className="font-semibold text-gray-100">{property.title}</p>

        <p className="mt-1 text-sm text-gray-400">
          {property.views || 0} lượt xem
        </p>
      </div>

      {/* PRICE */}
      <div className="text-gray-200 font-medium">{property.price}</div>

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
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-300 transition hover:bg-white/10 hover:text-white">
          <Eye size={18} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-300 transition hover:bg-white/10 hover:text-white">
          <Pencil size={18} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 text-red-400 transition hover:bg-red-500/10 hover:text-red-300">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
