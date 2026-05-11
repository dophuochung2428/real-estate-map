import { Filters } from "@/types/filter";

export function buildSearchQuery(filters: Filters) {
  const params = new URLSearchParams();

  if (filters.keyword) {
    params.set("keyword", filters.keyword);
  }

  if (filters.location) {
    params.set("location", filters.location);
  }

  if (filters.type) {
    params.set("type", filters.type);
  }

  if (filters.direction) {
    params.set("direction", filters.direction);
  }

  if (filters.minPrice) {
    params.set("minPrice", String(filters.minPrice));
  }

  if (filters.maxPrice) {
    params.set("maxPrice", String(filters.maxPrice));
  }

  if (filters.minArea) {
    params.set("minArea", String(filters.minArea));
  }

  if (filters.maxArea) {
    params.set("maxArea", String(filters.maxArea));
  }

  return params.toString();
}
