"use client";

export default function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl bg-[var(--card)] p-16 text-center">
      <h2 className="text-2xl font-bold text-red-600">Đã có lỗi xảy ra</h2>

      <p className="mt-3 text-gray-500">Không thể tải dữ liệu.</p>

      <button
        onClick={onRetry}
        className="mt-6 rounded-2xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        Thử lại
      </button>
    </div>
  );
}
