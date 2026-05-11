import { MapPin } from "lucide-react";

import { Property } from "@/types/property";

export default function PropertyInfo({ property }: { property: Property }) {
  return (
    <div className="rounded-3xl bg-[var(--card)] p-6 shadow-sm border border-[var(--border)]">
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-sm font-medium text-[var(--accent-foreground)]">
          Xác thực
        </span>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
          Hot
        </span>
      </div>

      <h1 className="text-3xl font-bold">{property.title}</h1>

      <div className="mt-4 flex items-center gap-2 text-[var(--muted-foreground)]">
        <MapPin size={18} />

        <span>{property.address}</span>
      </div>

      <div className="mt-6 flex flex-wrap gap-6">
        <div>
          <p className="text-sm text-[var(--muted-foreground)]">Mức giá</p>

          <p className="text-2xl font-bold text-[var(--primary)]">
            {(property.price / 1000000000).toFixed(1)} tỷ
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--muted-foreground)]">Diện tích</p>

          <p className="text-2xl font-bold">{property.area} m²</p>
        </div>
      </div>
    </div>
  );
}
