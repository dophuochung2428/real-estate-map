import Link from "next/link";

export default function RecentProperties({ listings }: { listings: any[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[var(--card)] p-6 shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Tin đăng gần đây</h2>

          <p className="mt-1 text-sm text-gray-400">
            Các bất động sản mới nhất của bạn
          </p>
        </div>

        <Link
          href="/dashboard/properties"
          className="text-sm text-red-400 hover:text-red-300"
        >
          Xem tất cả
        </Link>
      </div>

      <div className="space-y-4">
        {listings.map((property) => (
          <div
            key={property.id}
            className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4"
          >
            <div>
              <p className="font-semibold text-white">{property.title}</p>

              <p className="mt-1 text-sm text-gray-400">{property.address}</p>
            </div>

            <div className="text-right">
              <p className="font-bold text-red-400">
                {Number(property.price).toLocaleString("vi-VN")} đ
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {property.views || 0} lượt xem
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
