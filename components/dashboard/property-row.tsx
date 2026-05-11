import { Pencil, Trash2, Eye } from "lucide-react";

export default function PropertyRow({ property }: { property: any }) {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center border-b border-[var(--border)] px-6 py-5 transition hover:bg-gray-50">
      {/* TITLE */}
      <div>
        <p className="font-semibold">{property.title}</p>

        <p className="mt-1 text-sm text-gray-500">{property.views} lượt xem</p>
      </div>

      {/* PRICE */}
      <div>{property.price}</div>

      {/* STATUS */}
      <div>
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            property.status === "published"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {property.status === "published" ? "Đã đăng" : "Bản nháp"}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-3">
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] transition hover:bg-gray-100">
          <Eye size={18} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] transition hover:bg-gray-100">
          <Pencil size={18} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-red-600 transition hover:bg-red-50">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
