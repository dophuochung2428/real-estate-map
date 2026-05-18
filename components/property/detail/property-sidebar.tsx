import { Heart, Phone, MessageCircle } from "lucide-react";

import MortgageCalculator from "./mortgage-calculator";

export default function PropertySidebar({ property }: { property: any }) {
  const owner = property.created_by;

  return (
    <div className="sticky top-24 space-y-6">
      {/* AGENT */}
      <div className="rounded-3xl bg-[var(--card)] p-6 shadow-sm">
        <div className="flex items-center gap-4">
          {owner?.image ? (
            <img
              src={owner.image}
              alt={owner.name}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl font-bold text-red-600">
              {owner?.name?.[0] || "U"}
            </div>
          )}

          <div>
            <h3 className="font-bold">{owner?.name || "Người đăng"}</h3>

            <p className="text-sm text-[var(--muted-foreground)]">Người bán</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] font-semibold text-[var(--primary-foreground)] transition hover:bg-[var(--primary-hover)]">
            <Phone size={18} />
            Liên hệ ngay
          </button>

          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[var(--border)] font-semibold transition hover:bg-[var(--hover)]">
            <MessageCircle size={18} />
            Chat Zalo
          </button>

          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[var(--border)] font-semibold transition hover:bg-[var(--hover)]">
            <Heart size={18} />
            Lưu tin
          </button>
        </div>
      </div>

      {/* MORTGAGE
      <MortgageCalculator property={property} /> */}
    </div>
  );
}
