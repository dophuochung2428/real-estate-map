import PropertyRow from "./property-row";

const properties = [
  {
    id: "1",

    title: "Căn hộ cao cấp",

    price: "3.2 tỷ",

    status: "published",

    views: 1244,
  },

  {
    id: "2",

    title: "Nhà phố hiện đại",

    price: "5.8 tỷ",

    status: "draft",

    views: 542,
  },
];

export default function PropertyTable() {
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
        {properties.map((property) => (
          <PropertyRow key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
