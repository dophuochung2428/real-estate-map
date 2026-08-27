import Link from "next/link";

export default function RecentProperties({ listings }: { listings: any[] }) {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[var(--foreground)]">Tin đăng gần đây</h2>

          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Các bất động sản mới nhất của bạn
          </p>
        </div>

        <Link
          href="/dashboard/properties"
          className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)]"
        >
          Xem tất cả
        </Link>
      </div>

      <div className="space-y-4">
        {listings.map((property) => (
          <div
            key={property.id}
            className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <div>
              <p className="font-semibold text-[var(--foreground)]">{property.title}</p>

              <p className="mt-1 text-sm text-[var(--muted-foreground)]">{property.address}</p>
            </div>

            <div className="text-right">
              <p className="font-bold text-red-700">
                {Number(property.price).toLocaleString("vi-VN")} đ
              </p>

              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                {property.views || 0} lượt xem
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
