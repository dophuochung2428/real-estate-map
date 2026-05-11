export default function RelatedProperties() {
  return (
    <div className="rounded-3xl bg-[var(--card)] p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Bất động sản liên quan</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-[220px] rounded-3xl bg-gray-100" />

        <div className="h-[220px] rounded-3xl bg-gray-100" />
      </div>
    </div>
  );
}
