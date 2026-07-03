import { Property } from "@/types/property";
import { ValuationSearchForm } from "@/types/valuation";
import { normalizeAdministrativeName } from "./normalize-administrative";

import { extractLocation } from "./extract-location";

export function calculateScore(property: Property, form: ValuationSearchForm) {
  let score = 0;

  const formLocation = extractLocation(form.address);

  const formProvince = normalizeAdministrativeName(formLocation.province);

  const formDistrict = normalizeAdministrativeName(formLocation.district);

  const propertyProvince = normalizeAdministrativeName(property.province);

  const propertyDistrict = normalizeAdministrativeName(property.district);

  const formArea = Number(form.area);
  const propertyArea = property.area;

  if (formProvince && formProvince === propertyProvince) {
    score += 20;
  }

  if (formDistrict && formDistrict === propertyDistrict) {
    score += 20;
  }
  if (
    form.legalStatus !== "" &&
    property.legal_status === (form.legalStatus === "true")
  ) {
    score += 10;
  }

  if (
    form.businessAdvantage !== "" &&
    property.business_advantage === (form.businessAdvantage === "true")
  ) {
    score += 5;
  }

  if (formArea > 0 && propertyArea > 0) {
    const difference = Math.abs(formArea - propertyArea);

    const percent = difference / formArea;

    if (percent <= 0.05) {
      score += 15;
    } else if (percent <= 0.1) {
      score += 12;
    } else if (percent <= 0.2) {
      score += 8;
    } else if (percent <= 0.3) {
      score += 4;
    }
  }

  return score;
}
