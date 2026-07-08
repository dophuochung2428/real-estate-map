export type ExtractedTrafficLocation = {
  landmark: string | null;
  distanceKm: number | null;
};

export function extractTrafficLocation(
  text?: string | null,
): ExtractedTrafficLocation {
  if (!text) {
    return {
      landmark: null,
      distanceKm: null,
    };
  }

  const trimmedText = text.trim();

  if (!trimmedText) {
    return {
      landmark: null,
      distanceKm: null,
    };
  }

  const match = trimmedText.match(
    /(?:cách|gần|tiếp giáp|khoảng)\s+(.+?)\s*(?:khoảng\s*)?([0-9]+(?:[.,][0-9]+)?)\s*(km|m)\b/i,
  );

  if (!match) {
    return {
      landmark: null,
      distanceKm: null,
    };
  }

  const landmark = match[1].trim().replace(/[\s,;:.]+$/g, "");
  const distanceValue = Number.parseFloat(match[2].replace(",", "."));
  const unit = match[3].toLowerCase();

  if (!landmark || !Number.isFinite(distanceValue)) {
    return {
      landmark: null,
      distanceKm: null,
    };
  }

  const distanceKm = unit === "m" ? distanceValue / 1000 : distanceValue;

  return {
    landmark,
    distanceKm: Number.isFinite(distanceKm) ? distanceKm : null,
  };
}
