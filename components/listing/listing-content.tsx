import HorizontalPropertyCard from "./horizontal-property-card";

const properties = [
  {
    title: "Căn hộ cao cấp view sông trung tâm Cần Thơ",
    price: "3.2 tỷ",
    location: "Ninh Kiều, Cần Thơ",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },

  {
    title: "Nhà phố hiện đại đầy đủ nội thất",
    price: "5.8 tỷ",
    location: "Bình Thủy, Cần Thơ",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  },

  {
    title: "Biệt thự cao cấp khu compound",
    price: "12 tỷ",
    location: "Cái Răng, Cần Thơ",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
  },
];

export default function ListingContent() {
  return (
    <div>
      {/* TOP */}
      <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-[var(--card)] border border-[var(--border)] p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="mb-1 text-3xl font-bold">Bất động sản bán</h1>

          <p className="text-[var(--muted-foreground)]">Hiện có 12.450 bất động sản</p>
        </div>

        {/* SORT */}
        <button className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)] px-5 py-3 text-sm font-medium text-[var(--secondary-foreground)] transition hover:bg-[var(--secondary-hover)]">
          Tin mới nhất
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-6">
        {properties.map((property) => (
          <HorizontalPropertyCard key={property.title} {...property} />
        ))}
      </div>
    </div>
  );
}
