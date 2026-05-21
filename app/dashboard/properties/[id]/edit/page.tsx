import { notFound } from "next/navigation";

import PropertyForm from "@/components/property/property-form";

import { getPropertyById } from "@/services/property.server";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let property;

  try {
    property = await getPropertyById(id);
  } catch {
    return notFound();
  }

  return (
    <PropertyForm
      mode="edit"
      initialData={{
        id: property.id,

        title: property.title,
        price: String(property.price),
        area: String(property.area),
        address: property.address,
        province: property.province,
        district: property.district,
        type: property.type,
        direction: property.direction ?? null,
        lat: property.lat,
        lng: property.lng,
        description: property.description,
        amenities: property.amenities || [],

        images:
          property.property_images?.map((img: any) => ({
            image_url: img.image_url,
            is_thumbnail: img.is_thumbnail,
          })) || [],
      }}
    />
  );
}
