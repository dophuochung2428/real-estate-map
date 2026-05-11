"use client";

import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AdvancedFilterModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-5">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl bg-white p-8">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Bộ lọc nâng cao</h2>

          <button onClick={onClose}>
            <X className="size-7" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="space-y-10">
          {/* PRICE */}
          <div>
            <h3 className="mb-5 text-xl font-bold">Mức giá</h3>

            <div className="grid gap-3 md:grid-cols-3">
              {["Dưới 2 tỷ", "2 - 5 tỷ", "5 - 10 tỷ", "Trên 10 tỷ"].map(
                (item) => (
                  <button
                    key={item}
                    className="rounded-2xl border p-4 transition hover:border-red-600 hover:text-red-600"
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* TYPE */}
          <div>
            <h3 className="mb-5 text-xl font-bold">Loại hình</h3>

            <div className="grid gap-3 md:grid-cols-3">
              {[
                "Chung cư",
                "Nhà riêng",
                "Biệt thự",
                "Đất nền",
                "Shophouse",
              ].map((item) => (
                <button
                  key={item}
                  className="rounded-2xl border p-4 transition hover:border-red-600 hover:text-red-600"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-10 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-2xl border px-6 py-3 font-semibold"
          >
            Huỷ
          </button>

          <button className="rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white">
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
}
