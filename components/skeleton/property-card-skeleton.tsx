export default function PropertyCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl bg-[var(--card)]">
      {/* IMAGE */}
      <div className="h-[220px] bg-gray-200" />

      {/* CONTENT */}
      <div className="space-y-3 p-5">
        <div className="h-6 w-3/4 rounded bg-gray-200" />

        <div className="h-5 w-1/2 rounded bg-gray-200" />

        <div className="h-4 w-full rounded bg-gray-100" />

        <div className="h-4 w-2/3 rounded bg-gray-100" />
      </div>
    </div>
  );
}
