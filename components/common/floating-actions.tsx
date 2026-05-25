"use client";

import { useState } from "react";

import Image from "next/image";

import { Copy, MessageCircle, Phone, X } from "lucide-react";

export default function FloatingActions() {
  const [open, setOpen] = useState(false);

  const phoneNumber = "0913527002";

  const zaloLink = "https://zalo.me/0913527002";

  return (
    <>
      {/* FLOATING BUTTONS */}
      <div className="fixed bottom-24 right-5 z-40 flex flex-col gap-3">
        {/* PHONE */}
        <a
          href={`tel:${phoneNumber}`}
          className="flex size-14 items-center justify-center rounded-full bg-emerald-500 text-[var(--primary-foreground)] shadow-xl transition hover:scale-110"
        >
          <Phone className="size-6" />
        </a>

        {/* ZALO */}
        <button
          onClick={() => setOpen(true)}
          className="flex size-14 items-center justify-center rounded-full bg-sky-500 text-[var(--secondary-foreground)] shadow-xl transition hover:scale-110"
        >
          <MessageCircle className="size-6" />
        </button>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-black"
            >
              <X className="size-5" />
            </button>

            {/* TITLE */}
            <h3 className="text-center text-2xl font-bold text-gray-900">
              Chat qua Zalo
            </h3>

            <p className="mt-2 text-center text-sm leading-6 text-gray-500">
              Quét mã QR hoặc mở Zalo để liên hệ nhanh
            </p>

            {/* QR */}
            <div className="mt-5 flex justify-center">
              <Image
                src="/images/zalo-qr.jpg"
                alt="Zalo QR"
                width={220}
                height={220}
                className="rounded-2xl border border-gray-200"
              />
            </div>

            {/* PHONE */}
            <a
              href={zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex justify-center text-sm font-medium text-sky-600 transition hover:text-sky-700 hover:underline"
            >
              Mở trang Zalo
            </a>

            {/* OPEN ZALO */}
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
