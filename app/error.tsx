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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10 text-center shadow-xl shadow-slate-900/10">
        <h1 className="text-3xl font-black">Đã xảy ra sự cố</h1>
        <p className="mt-4 text-sm text-[var(--muted-foreground)]">
          Xin lỗi, có lỗi xảy ra khi tải trang. Vui lòng thử lại.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-3xl bg-[var(--primary)] px-6 py-3 font-semibold text-[var(--primary-foreground)] transition hover:bg-[var(--primary-hover)]"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}
