import { Property } from "@/types/property";
import { ValuationSearchForm } from "@/types/valuation";
import { calculateScore, normalizeText } from "./score";
import { extractLocation } from "./extract-location";
import { normalizeAdministrativeName } from "./normalize-administrative";

export type ComparableProperty = Property & {
  score: number;
};

function applyOrdering(properties: ComparableProperty[]): ComparableProperty[] {
  return [...properties].sort((a, b) => b.score - a.score);
}

function scoreProperties(
  properties: Property[],
  form: ValuationSearchForm,
): ComparableProperty[] {
  return properties.map((property) => ({
    ...property,
    score: calculateScore(property, form),
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
  const formLocation = extractLocation(form.address);

  const formDistrict = normalizeAdministrativeName(formLocation.district);

  const formProvince = normalizeAdministrativeName(formLocation.province);

  // HARD FILTER: LAND AREA TYPE
  const normalizedLandAreaType = normalizeText(form.landAreaType);

  const filteredProperties = normalizedLandAreaType
    ? properties.filter(
        (property) =>
          normalizeText(property.land_area_type) === normalizedLandAreaType,
      )
    : properties;

  const sameDistrict = filteredProperties.filter(
    (property) =>
      formDistrict &&
      normalizeAdministrativeName(property.district) === formDistrict,
  );

  // Nếu đã có >= 3 BĐS cùng xã/phường
  // chỉ so sánh trong nhóm này
  if (sameDistrict.length >= 3) {
    return prioritizeLegalStatus(
      scoreProperties(sameDistrict, form),
      form,
    ).slice(0, 3);
  }

  const sameProvince = filteredProperties.filter(
    (property) =>
      !sameDistrict.some((d) => d.id === property.id) &&
      formProvince &&
      normalizeAdministrativeName(property.province) === formProvince,
  );

  // Nếu cùng district + cùng province đã đủ
  if (sameDistrict.length + sameProvince.length >= 3) {
    return prioritizeLegalStatus(
      scoreProperties([...sameDistrict, ...sameProvince], form),
      form,
    ).slice(0, 3);
  }

  const others = filteredProperties.filter(
    (property) =>
      !sameDistrict.some((d) => d.id === property.id) &&
      !sameProvince.some((p) => p.id === property.id),
  );

  return prioritizeLegalStatus(
    scoreProperties([...sameDistrict, ...sameProvince, ...others], form),
    form,
  ).slice(0, 3);
}
