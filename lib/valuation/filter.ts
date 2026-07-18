import { Property } from "@/types/property";
import { ValuationSearchForm } from "@/types/valuation";
import { calculateScore, normalizeText } from "./score";
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
  const targetLat = Number(form.latitude);
  const targetLng = Number(form.longitude);

  if (Number.isNaN(targetLat) || Number.isNaN(targetLng)) {
    return [];
  }

  // HARD FILTER: LAND AREA TYPE
  const normalizedLandAreaType = normalizeText(form.landAreaType);

  const filteredProperties = properties;

  const propertiesWithDistance = filteredProperties.map((property) => ({
    ...property,
    distanceKm: calculateDistanceKm(
      targetLat,
      targetLng,
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

  const topCandidates = prioritizeLegalStatus(
    scoreProperties(candidateProperties, form),
    form,
  ).slice(0, 3);

  const nearestProperties = scoreProperties(propertiesWithDistance, form).sort(
    (a, b) => a.distanceKm - b.distanceKm,
  );

  const selectedIds = new Set(topCandidates.map((p) => p.id));

  return [
    ...topCandidates,
    ...nearestProperties.filter((p) => !selectedIds.has(p.id)),
  ].slice(0, 50);
}
