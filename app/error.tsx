"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#08131d] text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-xl shadow-black/20">
        <h1 className="text-3xl font-black">Đã xảy ra sự cố</h1>
        <p className="mt-4 text-sm text-zinc-300">
          Xin lỗi, có lỗi xảy ra khi tải trang. Vui lòng thử lại.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-3xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-400"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}
