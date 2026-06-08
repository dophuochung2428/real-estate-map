import MainHeader from "@/components/layout/header/main-header";

import Container from "@/components/layout/container";

import PropertyCard from "@/components/home/featured/property-card";

import ListingSearchBar from "@/components/search/listing-search-bar";

import { getProperties, getProvinces } from "@/services/property.server";

import PropertyTypePills from "@/components/search/property-type-pills";

import Pagination from "@/components/listing/pagination";

type Props = {
  searchParams: Promise<{
    keyword?: string;

    province?: string;

    minPrice?: string;

    maxPrice?: string;

    type?: string;

    page?: string;
  }>;
};

export default async function ListingPage({ searchParams }: Props) {
  const params = await searchParams;

  const currentPage = Number(params.page || 1);

  const provinces = await getProvinces();

  const { data: properties, count } = await getProperties({
    keyword: params.keyword || "",

    location: "",

    type: (params.type as any) || "",

    province: params.province,

    district: "",

    sort: "",

    direction: null,

    minPrice: params.minPrice ? Number(params.minPrice) : undefined,

    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,

    minArea: undefined,

    maxArea: undefined,

    page: currentPage,
    pageSize: 12,
  });

  const pageSize = 12;

  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <MainHeader />

      <ListingSearchBar
        provinces={provinces}
        initialFilters={{
          keyword: params.keyword || "",

          province: params.province,

          minPrice: params.minPrice ? Number(params.minPrice) : undefined,

          maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,

          type: (params.type as any) || "",
        }}
      />

      <Container className="py-8">
        <PropertyTypePills />
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Kết quả tìm kiếm</h1>

            <p className="mt-2 text-[var(--muted-foreground)]">
              {count} bất động sản tìm thấy
            </p>

            <p className="text-sm text-[var(--muted-foreground)]">
              Hiển thị {(currentPage - 1) * pageSize + 1} -{" "}
              {Math.min(currentPage * pageSize, count)}
            </p>
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-14 text-center">
            <h2 className="mb-2 text-xl font-semibold">
              Không tìm thấy kết quả
            </h2>

            <p className="text-[var(--muted-foreground)]">
              Hãy thử bộ lọc khác
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property: any) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={{
              keyword: params.keyword,
              province: params.province,
              minPrice: params.minPrice,
              maxPrice: params.maxPrice,
              type: params.type,
            }}
          />
        )}
      </Container>
    </main>
  );
}
