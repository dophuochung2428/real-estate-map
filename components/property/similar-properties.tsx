import PropertyCard from "../home/featured/property-card";

const properties = [
  {
    title: "Căn hộ cao cấp trung tâm",
    price: "3.5 tỷ",
    location: "Cần Thơ",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },

  {
    title: "Nhà phố hiện đại",
    price: "5.2 tỷ",
    location: "Cần Thơ",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  },

  {
    title: "Biệt thự compound",
    price: "12 tỷ",
    location: "Cần Thơ",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
  },
];

export default function SimilarProperties() {
  return (
    <div>
      <h2 className="mb-8 text-3xl font-bold">Bất động sản tương tự</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.title} {...property} />
        ))}
      </div>
    </div>
  );
}
