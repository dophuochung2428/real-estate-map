export default function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      {/* IMAGE */}
      <div className="h-64 animate-pulse bg-gray-200" />

      {/* CONTENT */}
      <div className="space-y-4 p-5">
        <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />

        <div className="h-5 w-full animate-pulse rounded bg-gray-200" />

        <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />

        <div className="h-10 w-1/3 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}
