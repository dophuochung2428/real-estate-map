import PropertyRow from "./property-row";

export default function PropertyTable({ listings }: { listings: any[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-sm">
      {/* HEADER */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-b border-[var(--border)] bg-[var(--surface)] px-6 py-4 text-sm font-semibold text-[var(--foreground)]">
        <div>Tên bài đăng</div>
        <div>Giá</div>
        <div>Trạng thái</div>
        <div></div>
      </div>

      {/* BODY */}
      <div className="divide-y divide-[var(--border)]">
        {listings.length === 0 ? (
          <div className="p-10 text-center text-[var(--muted-foreground)]">
            Chưa có tin đăng nào
          </div>
        ) : (
          listings.map((property) => (
            <div
              key={property.id}
              className="
                transition-colors
                duration-200
                hover:bg-[var(--hover)]
              "
            >
              <PropertyRow property={property} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
