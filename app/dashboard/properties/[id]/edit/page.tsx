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
            image_key: img.image_key,
            is_thumbnail: img.is_thumbnail,
          })) || [],

        contact_name: property.contact_name ?? "",
        contact_phone: property.contact_phone ?? "",

        legal_status: property.legal_status,

        business_advantage: property.business_advantage,

        environment: property.environment ?? "",

        land_ont_area: property.land_ont_area?.toString() ?? "",

        land_cln_area: property.land_cln_area?.toString() ?? "",

        frontage_width: property.frontage_width?.toString() ?? "",

        max_depth: property.max_depth?.toString() ?? "",

        land_shape: property.land_shape ?? "",

        asset_on_land: property.asset_on_land ?? "",

        appraisal_completed_at: property.appraisal_completed_at,
      }}
    />
  );
}
