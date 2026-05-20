import Link from "next/link";

import { getMyListings } from "@/services/property.server";

import PropertyCard from "@/components/property/property-card";

export default async function PropertiesManagementPage() {
  const properties = await getMyListings();

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white p-4">Quản lý tin đăng</h1>

          <p className="mt-1 ml-6 text-gray-400">Danh sách bất động sản của bạn</p>
        </div>

        <Link
          href="/dashboard/properties/create"
          className="
            rounded-2xl
            bg-red-600
            px-6 py-3
            font-semibold
            text-white
            transition
            hover:bg-red-700
            mr-4
          "
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
            <PropertyCard key={property.id} property={property} />
          ))
        )}
      </div>
    </div>
  );
}
