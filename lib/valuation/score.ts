import { Property } from "@/types/property";
import { ValuationSearchForm } from "@/types/valuation";

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

  if (diffInDays <= 30) return 3;
  if (diffInDays <= 90) return 2;
  if (diffInDays <= 180) return 1;
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

export function calculateScore(
  property: Property,
  form: ValuationSearchForm,
  distanceKm?: number,
) {
  let score = 0;

  if (distanceKm !== undefined) {
    score += calculateDistanceScore(distanceKm);
  }

  // LEGAL STATUS
  if (form.legalStatus !== "") {
    const expectedLegalStatus = form.legalStatus === "true";

    if (property.legal_status === expectedLegalStatus) {
      score += 15;
    }
  }

  // LAND AREA TYPE
  // LAND AREA TYPE
  const formLandAreas = form.landAreas ?? [];

  const matchedLandAreas = property.landAreas?.filter((propertyLandArea) =>
    formLandAreas.some(
      (formLandArea) =>
        formLandArea.type &&
        normalizeText(formLandArea.type) ===
          normalizeText(propertyLandArea.type),
    ),
  );

  if (matchedLandAreas && matchedLandAreas.length > 0) {
    score += 15;
  }

  // CREATED AT / RECENCY
  const propertyCreatedAt = (
    property as Property & { created_at?: string | null }
  ).created_at;

  score += calculateCreatedAtScore(propertyCreatedAt);

  // AREA
  const formArea = Number(form.area);
  const propertyArea = property.area;

  if (formArea > 0 && propertyArea > 0) {
    score += calculateSimilarityScore(
      calculatePercentageDifference(formArea, propertyArea),
      8,
    );
  }

  // LAND AREA
  // LAND AREA
  for (const formLandArea of formLandAreas) {
    if (!formLandArea.type || !formLandArea.area) continue;

    const matchedLandArea = property.landAreas?.find(
      (propertyLandArea) =>
        normalizeText(propertyLandArea.type) ===
        normalizeText(formLandArea.type),
    );

    if (!matchedLandArea) continue;

    const formArea = Number(formLandArea.area);
    const propertyArea = matchedLandArea.area;

    if (formArea > 0 && propertyArea > 0) {
      score += calculateSimilarityScore(
        calculatePercentageDifference(formArea, propertyArea),
        20,
      );
    }
  }

  // BUSINESS
  if (
    form.businessAdvantage !== "" &&
    property.business_advantage === (form.businessAdvantage === "true")
  ) {
    score += 2;
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
      12,
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
      8,
    );
  }

  // LAND SHAPE
  const formLandShape = normalizeText(form.landShape);
  const propertyLandShape = normalizeText(property.land_shape);

  if (
    formLandShape &&
    propertyLandShape &&
    formLandShape === propertyLandShape
  ) {
    score += 3;
  }

  // ASSET ON LAND
  const formAssetOnLand = normalizeText(form.assetOnLand);
  const propertyAssetOnLand = normalizeText(property.asset_on_land);

  if (
    formAssetOnLand &&
    propertyAssetOnLand &&
    formAssetOnLand === propertyAssetOnLand
  ) {
    score += 1;
  }

  // ENVIRONMENT
  const formEnvironment = normalizeText(form.environment);
  const propertyEnvironment = normalizeText(property.environment);

  if (
    formEnvironment &&
    propertyEnvironment &&
    formEnvironment === propertyEnvironment
  ) {
    score += 2;
  }

  return Math.max(0, Math.min(100, Number(score.toFixed(2))));
}

function calculateDistanceScore(distanceKm: number) {
  if (distanceKm <= 1) return 40;
  if (distanceKm <= 3) return 35;
  if (distanceKm <= 5) return 30;
  if (distanceKm <= 10) return 20;
  if (distanceKm <= 20) return 10;

  return 0;
}
