export type Direction =
  | ""
  | "north"
  | "south"
  | "east"
  | "west"
  | "northeast"
  | "northwest"
  | "southeast"
  | "southwest";

export type PropertyTypeFilter =
  | ""
  | "house_private"
  | "apartment"
  | "hotel_motel"
  | "land_private"
  | "land_project"
  | "land_residential"
  | "land_agriculture"
  | "farm"
  | "warehouse_factory";

export interface Filters {
  keyword: string;
  location: string;

  province?: string;
  district?: string;

  sort?: string;

  type: PropertyTypeFilter;
  direction: Direction;

  minPrice?: number;
  maxPrice?: number;

  minArea?: number;
  maxArea?: number;
}
