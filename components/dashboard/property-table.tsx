import PropertyRow from "./property-row";

export default function PropertyTable({ listings }: { listings: any[] }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-[var(--card)] shadow-sm">
      {/* HEAD */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-b border-[var(--border)] px-6 py-4 font-semibold">
        <div>Tên bài đăng</div>
        <div>Giá</div>
        <div>Trạng thái</div>
        <div></div>
      </div>

      {/* BODY */}
      <div>
        {listings.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            Chưa có tin đăng nào
          </div>
        ) : (
          listings.map((property) => (
            <PropertyRow key={property.id} property={property} />
          ))
        )}
      </div>
    </div>
  );
}
