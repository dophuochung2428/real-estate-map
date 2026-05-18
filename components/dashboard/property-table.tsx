import PropertyRow from "./property-row";

export default function PropertyTable({ listings }: { listings: any[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[var(--card)] shadow-xl">
      {/* HEADER */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-b border-white/10 bg-black/5 px-6 py-4 text-sm font-semibold text-gray-200">
        <div>Tên bài đăng</div>
        <div>Giá</div>
        <div>Trạng thái</div>
        <div></div>
      </div>

      {/* BODY */}
      <div className="divide-y divide-white/5">
        {listings.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            Chưa có tin đăng nào
          </div>
        ) : (
          listings.map((property) => (
            <div
              key={property.id}
              className="
                transition-colors
                duration-200
                hover:bg-white/5
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
