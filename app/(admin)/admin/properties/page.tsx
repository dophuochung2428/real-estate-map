import { getAdminProperties } from "@/features/admin/properties/server/get-admin-properties";
import AdminPropertiesTable from "@/features/admin/properties/components/AdminPropertiesTable";

export default async function AdminPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
  }>;
}) {
  const params = await searchParams;

  const page = Number(params.page || 1);

  const result = await getAdminProperties({
    page,
    search: params.search,
    status: params.status,
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Quản lý bài đăng</h1>

        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Duyệt và quản lý toàn bộ tin bất động sản
        </p>
      </div>

      <AdminPropertiesTable
        properties={result.properties}
        totalPages={result.totalPages}
        currentPage={result.page}
      />
    </div>
  );
}
