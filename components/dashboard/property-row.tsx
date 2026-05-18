import { Pencil, Trash2, Eye } from "lucide-react";

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
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            property.status === "published"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
          }`}
        >
          {property.status === "published" ? "Đã đăng" : "Bản nháp"}
        </span>
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
