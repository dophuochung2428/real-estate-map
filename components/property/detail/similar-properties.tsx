import PropertyCard from "@/components/home/featured/property-card";

import { getSimilarProperties } from "@/services/property.server";

type Props = {
  propertyId: string;

  district?: string;

  type?: string;
};

export default async function SimilarProperties({
  propertyId,
  district,
  type,
}: Props) {
  const properties = await getSimilarProperties({
    propertyId,
    district,
    type,
  });

  if (!properties.length) {
    return null;
  }

  return (
    <div>
      <h2 className="mb-5 text-3xl font-bold">Bất động sản tương tự</h2>

      <div className="grid gap-5 md:grid-cols-2">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
