import { calculateDistanceKm } from "./calculate-distance";
import { extractTrafficLocation } from "./extract-traffic-location";
import { geocodeLandmark } from "./geocode-landmark";

export async function sortByTrafficPriority<
  T extends {
    score: number;
    lat?: number | null;
    lng?: number | null;
  },
>(
  rankedComparables: T[],
  trafficLocation?: string | null,
): Promise<T[]> {
  if (!trafficLocation) {
    return rankedComparables;
  }

  const { landmark, distanceKm } = extractTrafficLocation(trafficLocation);

  if (!landmark || distanceKm === null || !Number.isFinite(distanceKm)) {
    return rankedComparables;
  }

  const landmarkCoordinates = await geocodeLandmark(landmark);

  if (!landmarkCoordinates) {
    return rankedComparables;
  }

  const rankedItems = rankedComparables.map((property, index) => {
    const hasCoordinates =
      Number.isFinite(property.lat) && Number.isFinite(property.lng);

    const distanceDifference = hasCoordinates
      ? Math.abs(
          calculateDistanceKm(
            property.lat as number,
            property.lng as number,
            landmarkCoordinates.lat,
            landmarkCoordinates.lng,
          ) - distanceKm,
        )
      : Number.POSITIVE_INFINITY;

    return {
      property,
      index,
      distanceDifference,
    };
  });

  rankedItems.sort((a, b) => {
    if (a.distanceDifference !== b.distanceDifference) {
      return a.distanceDifference - b.distanceDifference;
    }

    if (a.property.score !== b.property.score) {
      return b.property.score - a.property.score;
    }

    return a.index - b.index;
  });

  return rankedItems.map(({ property }) => property);
}
