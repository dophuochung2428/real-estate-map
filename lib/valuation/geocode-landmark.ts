type LandmarkCoordinates = {
  lat: number;
  lng: number;
};

const geocodeCache = new Map<string, Promise<LandmarkCoordinates | null>>();

export async function geocodeLandmark(name: string): Promise<LandmarkCoordinates | null> {
  const normalizedName = name.trim();

  if (!normalizedName) {
    return null;
  }

  const cacheKey = normalizedName.toLowerCase();
  const cachedResult = geocodeCache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  const promise = (async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(normalizedName)}`,
        {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
            "User-Agent": "real-estate-map/1.0",
          },
        },
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        return null;
      }

      const data = (await response.json()) as Array<{ lat?: string; lon?: string }>;
      const firstResult = data[0];

      if (!firstResult?.lat || !firstResult?.lon) {
        return null;
      }

      return {
        lat: Number.parseFloat(firstResult.lat),
        lng: Number.parseFloat(firstResult.lon),
      };
    } catch {
      return null;
    }
  })();

  geocodeCache.set(cacheKey, promise);

  return promise;
}
