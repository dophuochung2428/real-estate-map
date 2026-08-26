import { Property } from "@/types/property";
import { ValuationSearchForm } from "@/types/valuation";

function calculatePercentageDifference(a: number, b: number) {
  if (!Number.isFinite(a) || !Number.isFinite(b) || a <= 0 || b <= 0) {
    return Number.POSITIVE_INFINITY;
  }

  return Math.abs(a - b) / Math.max(a, b);
}

function calculatePercentageDifferenceFromTarget(
  target: number,
  actual: number,
) {
  if (
    !Number.isFinite(target) ||
    !Number.isFinite(actual) ||
    target <= 0 ||
    actual <= 0
  ) {
    return Number.POSITIVE_INFINITY;
  }

  return Math.abs(actual - target) / target;
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

/**
 * UNIT PRICE
 *
 * Max score: 30
 *
 * Chênh lệch:
 * <= 5%   -> 30 điểm
 * <= 10%  -> 24 điểm
 * <= 20%  -> 15 điểm
 * <= 30%  -> 7.5 điểm
 * > 30%   -> 0 điểm
 *
 * Form price được sử dụng làm baseline.
 */
function calculateStateUnitPriceScore(
  property: Property,
  form: ValuationSearchForm,
) {
  const formPrice = Number(form.state_unit_price);
  const propertyPrice = Number(property.state_unit_price);

  if (
    !Number.isFinite(formPrice) ||
    formPrice <= 0 ||
    !Number.isFinite(propertyPrice) ||
    propertyPrice <= 0
  ) {
    return 0;
  }

  const percentageDifference = calculatePercentageDifferenceFromTarget(
    formPrice,
    propertyPrice,
  );

  return calculateSimilarityScore(percentageDifference, 30);
}

/**
 * DISTANCE
 *
 * Max score: 25
 *
 * <= 1 km   -> 25
 * <= 3 km   -> 22
 * <= 5 km   -> 18
 * <= 10 km  -> 12
 * <= 20 km  -> 5
 * > 20 km   -> 0
 */
function calculateDistanceScore(distanceKm: number) {
  if (!Number.isFinite(distanceKm) || distanceKm < 0) {
    return 0;
  }

  if (distanceKm <= 1) return 25;
  if (distanceKm <= 3) return 22;
  if (distanceKm <= 5) return 18;
  if (distanceKm <= 10) return 12;
  if (distanceKm <= 20) return 5;

  return 0;
}

export function calculateScore(
  property: Property,
  form: ValuationSearchForm,
  distanceKm?: number,
) {
  let score = 0;

  // ============================================================
  // DISTANCE
  // Max: 25
  // ============================================================
  if (distanceKm !== undefined) {
    score += calculateDistanceScore(distanceKm);
  }

  // ============================================================
  // UNIT PRICE
  // Max: 30
  // ============================================================
  score += calculateStateUnitPriceScore(property, form);

  // ============================================================
  // LEGAL STATUS
  // Max: 15
  // ============================================================
  if (form.legalStatus !== "") {
    const expectedLegalStatus = form.legalStatus === "true";

    if (property.legal_status === expectedLegalStatus) {
      score += 15;
    }
  }

  // ============================================================
  // LAND AREA TYPE
  // Max: 5
  //
  // Type chỉ là tiêu chí phụ.
  // Diện tích thực tế bên dưới mới là tiêu chí chính.
  // ============================================================
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
    score += 5;
  }

  // ============================================================
  // CREATED AT / RECENCY
  // Max: 3
  // ============================================================
  const propertyCreatedAt = (
    property as Property & {
      created_at?: string | null;
    }
  ).created_at;

  score += calculateCreatedAtScore(propertyCreatedAt);

  // ============================================================
  // AREA
  // Max: 8
  // ============================================================
  const formArea = Number(form.area);
  const propertyArea = property.area;

  if (formArea > 0 && propertyArea > 0) {
    score += calculateSimilarityScore(
      calculatePercentageDifference(formArea, propertyArea),
      8,
    );
  }

  // ============================================================
  // LAND AREA
  // Max: 20 tổng
  //
  // Có thể xét nhiều loại đất nhưng tổng điểm tiêu chí này
  // không vượt quá 20 điểm.
  // ============================================================
  let landAreaScore = 0;

  for (const formLandArea of formLandAreas) {
    if (!formLandArea.type || !formLandArea.area) {
      continue;
    }

    const matchedLandArea = property.landAreas?.find(
      (propertyLandArea) =>
        normalizeText(propertyLandArea.type) ===
        normalizeText(formLandArea.type),
    );

    if (!matchedLandArea) {
      continue;
    }

    const formLandAreaValue = Number(formLandArea.area);
    const propertyLandAreaValue = matchedLandArea.area;

    if (formLandAreaValue > 0 && propertyLandAreaValue > 0) {
      landAreaScore += calculateSimilarityScore(
        calculatePercentageDifference(formLandAreaValue, propertyLandAreaValue),
        20,
      );
    }
  }

  score += Math.min(landAreaScore, 20);

  // ============================================================
  // BUSINESS
  // Max: 2
  // ============================================================
  if (
    form.businessAdvantage !== "" &&
    property.business_advantage === (form.businessAdvantage === "true")
  ) {
    score += 2;
  }

  // ============================================================
  // FRONTAGE
  // Max: 12
  // ============================================================
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

  // ============================================================
  // DEPTH
  // Max: 8
  // ============================================================
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

  // ============================================================
  // LAND SHAPE
  // Max: 3
  // ============================================================
  const formLandShape = normalizeText(form.landShape);
  const propertyLandShape = normalizeText(property.land_shape);

  if (
    formLandShape &&
    propertyLandShape &&
    formLandShape === propertyLandShape
  ) {
    score += 3;
  }

  // ============================================================
  // ASSET ON LAND
  // Max: 1
  // ============================================================
  const formAssetOnLand = normalizeText(form.assetOnLand);
  const propertyAssetOnLand = normalizeText(property.asset_on_land);

  if (
    formAssetOnLand &&
    propertyAssetOnLand &&
    formAssetOnLand === propertyAssetOnLand
  ) {
    score += 1;
  }

  // ============================================================
  // ENVIRONMENT
  // Max: 2
  // ============================================================
  const formEnvironment = normalizeText(form.environment);
  const propertyEnvironment = normalizeText(property.environment);

  if (
    formEnvironment &&
    propertyEnvironment &&
    formEnvironment === propertyEnvironment
  ) {
    score += 2;
  }

  // ============================================================
  // NORMALIZE SCORE
  // ============================================================
  return Math.max(0, Math.min(100, Number(score.toFixed(2))));
}
