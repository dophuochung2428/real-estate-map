"use client";

import { MessageCircle, Phone } from "lucide-react";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-24 right-5 z-40 flex flex-col gap-3">
      {/* PHONE */}
      <button className="flex size-14 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xl transition hover:scale-110">
        <Phone className="size-6" />
      </button>

      {/* ZALO */}
      <button className="flex size-14 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--secondary-foreground)] shadow-xl transition hover:scale-110">
        <MessageCircle className="size-6" />
      </button>
    </div>
  );
}
