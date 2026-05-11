import Container from "@/components/layout/container";
import PropertyCard from "./property-card";

const properties = [
  {
    title: "Căn hộ cao cấp trung tâm Cần Thơ",
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
    title: "Đất nền đầu tư vị trí đẹp",
    price: "1.9 tỷ",
    location: "Cái Răng, Cần Thơ",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
  },
];

export default function FeaturedSection() {
  return (
    <section className="py-14">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Bất động sản nổi bật</h2>

          <button className="text-sm font-semibold text-red-600">
            Xem thêm
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.title} {...property} />
          ))}
        </div>
      </Container>
    </section>
  );
}
