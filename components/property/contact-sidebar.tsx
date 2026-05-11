import { Heart, MessageCircle, Phone } from "lucide-react";

export default function ContactSidebar() {
  return (
    <aside className="sticky top-24 rounded-3xl bg-[var(--card)] p-6 shadow-sm border border-[var(--border)]">
      {/* AGENT */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-full bg-[var(--primary)] text-2xl font-bold text-[var(--primary-foreground)]">
          H
        </div>

        <div>
          <h3 className="font-bold text-[var(--foreground)]">Hưng Real Estate</h3>

          <p className="text-sm text-[var(--muted-foreground)]">Chuyên viên môi giới</p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="space-y-3">
        <button className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] font-semibold text-[var(--primary-foreground)] transition hover:bg-[var(--primary-hover)]">
          <Phone className="size-5" />
          0909 999 999
        </button>

        <button className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-[var(--border)] font-semibold transition hover:bg-[var(--hover)]">
          <MessageCircle className="size-5" />
          Nhắn Zalo
        </button>

        <button className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-[var(--border)] font-semibold transition hover:bg-[var(--hover)]">
          <Heart className="size-5" />
          Lưu tin
        </button>
      </div>

      {/* INFO */}
      <div className="mt-8 border-t border-[var(--border)] pt-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-[var(--muted-foreground)]">Mã tin</span>

          <span className="font-semibold text-[var(--foreground)]">#BDS12345</span>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-[var(--muted-foreground)]">Ngày đăng</span>

          <span className="font-semibold text-[var(--foreground)]">Hôm nay</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--muted-foreground)]">Loại tin</span>

          <span className="font-semibold text-[var(--foreground)]">VIP Kim Cương</span>
        </div>
      </div>
    </aside>
  );
}
