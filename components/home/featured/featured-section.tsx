import Container from "@/components/layout/container";

import PropertyCard from "./property-card";

import { getProperties } from "@/services/property.server";

export default async function FeaturedSection() {
  const { data: properties } = await getProperties();

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
          {properties.map((property: any) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </Container>
    </section>
  );
}
