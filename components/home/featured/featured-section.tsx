import Container from "@/components/layout/container";

import PropertyCard from "./property-card";
import Link from "next/link";

type Props = {
  properties: any[];
};

export default function FeaturedSection({ properties }: Props) {
  return (
    <section className="py-14">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Bất động sản nổi bật</h2>

          <Link
            href="/listing"
            className="text-sm font-semibold text-red-600 hover:underline"
          >
            Xem tất cả
          </Link>
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
