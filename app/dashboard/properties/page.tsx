import Link from "next/link";

import { getMyListings } from "@/services/property.server";

import PropertyCard from "@/components/property/property-card";
import MyPropertiesList from "@/features/dashboard/components/MyPropertiesList";

type Props = {
  searchParams: Promise<{
    keyword?: string;
  }>;
};

export default async function PropertiesManagementPage({
  searchParams,
}: Props) {
  const params = await searchParams;
  const properties = await getMyListings({
    keyword: params.keyword,
  });

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white p-4">
            Quản lý tin đăng
          </h1>

          <p className="mt-1 ml-6 text-gray-400">
            Danh sách bất động sản của bạn
          </p>
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

      <MyPropertiesList initialProperties={properties} />
    </div>
  );
}
