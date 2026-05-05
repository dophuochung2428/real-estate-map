export type PropertyType =
  | "house_private"
  | "apartment"
  | "hotel_motel"
  | "land_private"
  | "land_project"
  | "land_residential"
  | "land_agriculture"
  | "farm"
  | "warehouse_factory";

  export type DirectionType =
  | "north"
  | "south"
  | "east"
  | "west"
  | "northeast"
  | "northwest"
  | "southeast"
  | "southwest";

export interface Property {
  id: string;
  title: string;

  price: number;
  area: number;

  lat: number;
  lng: number;

  province: string;
  district: string;
  address: string;

  type: PropertyType;
  direction: DirectionType;
}
