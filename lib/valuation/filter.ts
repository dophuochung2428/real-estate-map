import { Property } from "@/types/property";
import { ValuationSearchForm } from "@/types/valuation";
import { calculateScore, normalizeText } from "./score";
import { sortByTrafficPriority } from "./sort-by-traffic-priority";

export type ComparableProperty = Property & {
  score: number;
};

async function applyOrdering(
  properties: ComparableProperty[],
  form: ValuationSearchForm,
): Promise<ComparableProperty[]> {
  const scoredProperties = [...properties].sort((a, b) => b.score - a.score);

  if (!form.trafficLocation) {
    return scoredProperties.slice(0, 3);
  }

  return (await sortByTrafficPriority(scoredProperties, form.trafficLocation)).slice(0, 3);
}

export async function filterComparableProperties(
  properties: Property[],
  form: ValuationSearchForm,
): Promise<ComparableProperty[]> {
  const normalizedLandAreaType = normalizeText(form.landAreaType);

  const filteredByLandAreaType = normalizedLandAreaType
    ? properties.filter(
        (property) => normalizeText(property.land_area_type) === normalizedLandAreaType,
      )
    : properties;

  const scoredProperties: ComparableProperty[] = filteredByLandAreaType.map(
    (property) => ({
      ...property,
      score: calculateScore(property, form),
    }),
  );

  if (form.legalStatus !== "") {
    const expectedLegalStatus = form.legalStatus === "true";

    const matchingLegalStatus = scoredProperties.filter(
      (property) => property.legal_status === expectedLegalStatus,
    );

    const mismatchingLegalStatus = scoredProperties.filter(
      (property) => property.legal_status !== expectedLegalStatus,
    );

    const orderedMatchingLegalStatus = await applyOrdering(matchingLegalStatus, form);
    const orderedMismatchingLegalStatus = await applyOrdering(mismatchingLegalStatus, form);

    return [...orderedMatchingLegalStatus, ...orderedMismatchingLegalStatus].slice(0, 3);
  }

  return applyOrdering(scoredProperties, form);
}
