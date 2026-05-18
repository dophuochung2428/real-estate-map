import PropertyCard from "@/components/home/featured/property-card";

const properties = [
  {
    title: "Căn hộ cao cấp",
    price: "3.2 tỷ",
    location: "Cần Thơ",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },
];

export default function SavedPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Đã lưu</h1>

        <p className="text-gray-500">Bất động sản yêu thích</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard property={property} />
        ))}
      </div>
    </div>
  );
}
