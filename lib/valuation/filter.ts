import { Property } from "@/types/property";
import { ValuationSearchForm } from "@/types/valuation";
import { calculateScore, normalizeText } from "./score";
import { geocodeAddress } from "./geocode";
import { calculateDistanceKm } from "./distance";

export type ComparableProperty = Property & {
  score: number;
  distanceKm: number;
};

function applyOrdering(properties: ComparableProperty[]): ComparableProperty[] {
  return [...properties].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    return a.distanceKm - b.distanceKm;
  });
}

function scoreProperties(
  properties: (Property & { distanceKm: number })[],
  form: ValuationSearchForm,
): ComparableProperty[] {
  return properties.map((property) => ({
    ...property,
    score: calculateScore(property, form, property.distanceKm),
  }));
}

function prioritizeLegalStatus(
  properties: ComparableProperty[],
  form: ValuationSearchForm,
): ComparableProperty[] {
  if (form.legalStatus === "") {
    return applyOrdering(properties);
  }

  const expectedLegalStatus = form.legalStatus === "true";

  const matching = properties.filter(
    (property) => property.legal_status === expectedLegalStatus,
  );

  const mismatching = properties.filter(
    (property) => property.legal_status !== expectedLegalStatus,
  );

  return [...applyOrdering(matching), ...applyOrdering(mismatching)];
}

export async function filterComparableProperties(
  properties: Property[],
  form: ValuationSearchForm,
): Promise<ComparableProperty[]> {
  const targetLocation = await geocodeAddress(form.address);

  if (!targetLocation) {
    return [];
  }

  // HARD FILTER: LAND AREA TYPE
  const normalizedLandAreaType = normalizeText(form.landAreaType);

  const filteredProperties = properties;

  const propertiesWithDistance = filteredProperties.map((property) => ({
    ...property,
    distanceKm: calculateDistanceKm(
      targetLocation.lat,
      targetLocation.lng,
      property.lat,
      property.lng,
    ),
  }));

  let candidateProperties = propertiesWithDistance.filter(
    (p) => p.distanceKm <= 5,
  );

  if (candidateProperties.length < 3) {
    candidateProperties = propertiesWithDistance.filter(
      (p) => p.distanceKm <= 10,
    );
  }

  if (candidateProperties.length < 3) {
    candidateProperties = propertiesWithDistance.filter(
      (p) => p.distanceKm <= 20,
    );
  }

  if (candidateProperties.length < 3) {
    candidateProperties = propertiesWithDistance.filter(
      (p) => p.distanceKm <= 50,
    );
  }

  if (candidateProperties.length < 3) {
    candidateProperties = propertiesWithDistance;
  }

  const scoredProperties = scoreProperties(candidateProperties, form);

  // const scoredProperties = scoreProperties(propertiesWithDistance, form);

  // console.table(
  //   candidateProperties
  //     .sort((a, b) => a.distanceKm - b.distanceKm)
  //     .slice(0, 20)
  //     .map((p) => ({
  //       distanceKm: p.distanceKm.toFixed(2),
  //       area: p.area,
  //       district: p.district,
  //       address: p.address,
  //     })),
  // );

  return prioritizeLegalStatus(scoredProperties, form).slice(0, 50);
}
