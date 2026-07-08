import { Property } from "@/types/property";
import { ValuationSearchForm } from "@/types/valuation";
import { normalizeAdministrativeName } from "./normalize-administrative";
import { extractLocation } from "./extract-location";

function calculatePercentageDifference(a: number, b: number) {
  if (!Number.isFinite(a) || !Number.isFinite(b) || a <= 0 || b <= 0) {
    return Number.POSITIVE_INFINITY;
  }

  return Math.abs(a - b) / Math.max(a, b);
}

function calculateSimilarityScore(
  percentageDifference: number,
  maxScore: number,
) {
  if (!Number.isFinite(percentageDifference)) {
    return 0;
  }

  if (percentageDifference <= 0.05) {
    return maxScore;
  }

  if (percentageDifference <= 0.1) {
    return maxScore * 0.8;
  }

  if (percentageDifference <= 0.2) {
    return maxScore * 0.5;
  }

  if (percentageDifference <= 0.3) {
    return maxScore * 0.25;
  }

  return 0;
}

function calculateCreatedAtScore(createdAt?: string | null) {
  if (!createdAt) {
    return 0;
  }

  const createdDate = new Date(createdAt);

  if (Number.isNaN(createdDate.getTime())) {
    return 0;
  }

  const diffInDays = Math.floor(
    (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffInDays <= 30) {
    return 10;
  }

  if (diffInDays <= 90) {
    return 8;
  }

  if (diffInDays <= 180) {
    return 5;
  }

  if (diffInDays <= 365) {
    return 2;
  }

  return 0;
}

export function normalizeText(value?: string | null) {
  if (!value) {
    return "";
  }

  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function calculateScore(property: Property, form: ValuationSearchForm) {
  let score = 0;

  const formLocation = extractLocation(form.address);
  const formProvince = normalizeAdministrativeName(formLocation.province);
  const formDistrict = normalizeAdministrativeName(formLocation.district);
  const propertyProvince = normalizeAdministrativeName(property.province);
  const propertyDistrict = normalizeAdministrativeName(property.district);

  // LOCATION
  if (formProvince && formProvince === propertyProvince) {
    score += 10;
  }

  if (formDistrict && formDistrict === propertyDistrict) {
    score += 25;
  }

  // CREATED AT / RECENCY
  const propertyCreatedAt = (property as Property & { created_at?: string | null }).created_at;

  score += calculateCreatedAtScore(propertyCreatedAt);

  // LAND AREA
  const formLandArea = Number(form.landArea);
  const propertyLandArea = property.land_area;

  if (formLandArea > 0 && propertyLandArea !== undefined && propertyLandArea > 0) {
    score += calculateSimilarityScore(
      calculatePercentageDifference(formLandArea, propertyLandArea),
      15,
    );
  }

  // BUSINESS
  if (
    form.businessAdvantage !== "" &&
    property.business_advantage === (form.businessAdvantage === "true")
  ) {
    score += 10;
  }

  // FRONTAGE
  const formFrontageWidth = Number(form.frontageWidth);
  const propertyFrontageWidth = property.frontage_width;

  if (
    formFrontageWidth > 0 &&
    propertyFrontageWidth !== undefined &&
    propertyFrontageWidth > 0
  ) {
    score += calculateSimilarityScore(
      calculatePercentageDifference(formFrontageWidth, propertyFrontageWidth),
      10,
    );
  }

  // DEPTH
  const formMaxDepth = Number(form.maxDepth);
  const propertyMaxDepth = property.max_depth;

  if (
    formMaxDepth > 0 &&
    propertyMaxDepth !== undefined &&
    propertyMaxDepth > 0
  ) {
    score += calculateSimilarityScore(
      calculatePercentageDifference(formMaxDepth, propertyMaxDepth),
      10,
    );
  }

  // LAND SHAPE
  const formLandShape = normalizeText(form.landShape);
  const propertyLandShape = normalizeText(property.land_shape);

  if (formLandShape && propertyLandShape && formLandShape === propertyLandShape) {
    score += 5;
  }

  // ASSET ON LAND
  const formAssetOnLand = normalizeText(form.assetOnLand);
  const propertyAssetOnLand = normalizeText(property.asset_on_land);

  if (formAssetOnLand && propertyAssetOnLand && formAssetOnLand === propertyAssetOnLand) {
    score += 5;
  }

  return Math.max(0, Math.min(100, Number(score.toFixed(2))));
}
