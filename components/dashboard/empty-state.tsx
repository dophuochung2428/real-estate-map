import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="rounded-3xl bg-[var(--card)] p-12 text-center shadow-sm">
      <h2 className="text-3xl font-bold">Chưa có tin đăng</h2>

      <p className="mt-3 text-gray-500">Hãy tạo tin đầu tiên của bạn</p>

      <Link
        href="/properties/create"
        className="
          mt-6
          inline-flex
          h-12
          items-center
          rounded-2xl
          bg-red-600
          px-6
          font-semibold
          text-white
        "
      >
        Đăng tin ngay
      </Link>
    </div>
  );
}
