import { Filters } from "@/types/filter";

export function parseSearchQuery(params: URLSearchParams): Filters {
  return {
    keyword: params.get("keyword") || "",

    location: params.get("location") || "",

    type: (params.get("type") as any) || "",

    direction: (params.get("direction") as any) || "",

    minPrice: params.get("minPrice")
      ? Number(params.get("minPrice"))
      : undefined,

    maxPrice: params.get("maxPrice")
      ? Number(params.get("maxPrice"))
      : undefined,

    minArea: params.get("minArea") ? Number(params.get("minArea")) : undefined,

    maxArea: params.get("maxArea") ? Number(params.get("maxArea")) : undefined,
  };
}
