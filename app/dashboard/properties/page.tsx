import Link from "next/link";
import { getMyListings } from "@/services/property.server";

export default async function PropertiesManagementPage() {
  const properties = await getMyListings();

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Quản lý tin đăng</h1>

          <p className="mt-1 text-gray-400">Danh sách bất động sản của bạn</p>
        </div>

        <Link
          href="/dashboard/properties/create"
          className="rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          + Tạo tin mới
        </Link>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {properties.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-gray-400">
            Chưa có tin đăng nào
          </div>
        ) : (
          properties.map((property: any) => (
            <div
              key={property.id}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <div className="flex items-center justify-between gap-6">
                {/* LEFT */}
                <div className="flex gap-4">
                  {/* thumbnail giả */}
                  <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-red-500/20 to-blue-500/20" />

                  <div>
                    <p className="text-lg font-semibold text-white group-hover:text-red-400 transition">
                      {property.title}
                    </p>

                    <p className="text-sm text-gray-400">{property.address}</p>

                    <div className="mt-2 text-xs text-gray-500">
                      {property.area} m² • 0 lượt xem
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">
                  {/* PRICE */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-red-400">
                      {Number(property.price).toLocaleString("vi-VN")} đ
                    </p>
                  </div>

                  {/* STATUS */}
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      property.status === "active"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    }`}
                  >
                    {property.status === "active"
                      ? "Đang hiển thị"
                      : "Chờ duyệt"}
                  </span>

                  {/* ACTIONS */}
                  <div className="flex gap-2">
                    <Link
                      href={`/properties/${property.id}/edit`}
                      className="rounded-xl border border-white/10 px-3 py-2 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
                    >
                      Sửa
                    </Link>

                    <button className="rounded-xl border border-red-500/20 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10">
                      Xoá
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
