import { notFound } from "next/navigation";

import { getPropertyById } from "@/services/property.server";

import PropertyAppraisalForm from "@/components/property/appraisal/property-appraisal-form";

export default async function PropertyAppraisalPage({
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

  return <PropertyAppraisalForm property={property} />;
}
