import Container from "@/components/layout/container";

const locations = [
  {
    name: "Hồ Chí Minh",
    count: "50.000+ tin đăng",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  },
  {
    name: "Hà Nội",
    count: "32.000+ tin đăng",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  {
    name: "Đà Nẵng",
    count: "12.000+ tin đăng",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
  },
];

export default function LocationSection() {
  return (
    <section className="py-14">
      <Container>
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Bất động sản theo địa điểm</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <div
              key={location.name}
              className="group relative h-[280px] cursor-pointer overflow-hidden rounded-3xl"
            >
              {/* IMAGE */}
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${location.image})`,
                }}
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40" />

              {/* CONTENT */}
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="mb-2 text-2xl font-bold">{location.name}</h3>

                <p className="text-white/80">{location.count}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
