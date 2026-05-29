"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, MessageCircle, X } from "lucide-react";

export default function PropertySidebar({ property }: { property: any }) {
  const [open, setOpen] = useState(false);

  const owner = property.created_by;

  const phoneNumber = owner?.phone || "0913527002";
  const zaloLink = `https://zalo.me/${phoneNumber}`;

  return (
    <>
      <div className="sticky top-24 space-y-6">
        {/* AGENT */}
        <div className="rounded-3xl bg-[var(--card)] p-6 shadow-sm border border-[var(--border)]">
          <div className="flex items-center gap-4">
            {owner?.image ? (
              <img
                src={owner.image}
                alt={owner.name}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/10 text-2xl font-bold text-[var(--primary)]">
                {owner?.name?.[0] || "U"}
              </div>
            )}

            <div>
              <h3 className="font-bold text-[var(--foreground)]">
                {owner?.name || "Người đăng"}
              </h3>

              <p className="text-sm text-[var(--muted-foreground)]">
                Người bán
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-6 space-y-3">
            {/* CALL */}
            <a
              href={`tel:${phoneNumber}`}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] font-semibold text-[var(--primary-foreground)] transition hover:bg-[var(--primary-hover)]"
            >
              <Phone size={18} />
              Liên hệ ngay
            </a>

            {/* ZALO */}
            <button
              onClick={() => setOpen(true)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[var(--border)] font-semibold text-[var(--foreground)] transition hover:bg-[var(--hover)]"
            >
              <MessageCircle size={18} />
              Chat Zalo
            </button>
          </div>
        </div>
      </div>

      {/* ZALO MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-sm rounded-3xl bg-[var(--card)] p-6 shadow-2xl border border-[var(--border)]">
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-[var(--muted-foreground)] transition hover:bg-[var(--hover)]"
            >
              <X className="size-5" />
            </button>

            {/* TITLE */}
            <h3 className="text-center text-2xl font-bold text-[var(--foreground)]">
              Chat qua Zalo
            </h3>

            <p className="mt-2 text-center text-sm leading-6 text-[var(--muted-foreground)]">
              Quét mã QR hoặc mở Zalo để liên hệ nhanh
            </p>

            {/* QR */}
            <div className="mt-5 flex justify-center">
              <Image
                src="/images/zalo-qr.jpg"
                alt="Zalo QR"
                width={220}
                height={220}
                className="rounded-2xl border border-[var(--border)]"
              />
            </div>

            {/* LINK */}
            <a
              href={zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex h-12 items-center justify-center rounded-xl bg-emerald-500 font-medium text-white transition hover:opacity-90"
            >
              Mở Zalo
            </a>
          </div>
        </div>
      )}
    </>
  );
}
