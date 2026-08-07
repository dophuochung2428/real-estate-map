export type PropertyType =
  | "house_private"
  | "apartment"
  | "hotel_motel"
  | "land_private"
  | "land_project"
  | "land_residential"
  | "land_agriculture"
  | "farm"
  | "warehouse_factory"
  | "other";

export type DirectionType =
  | "north"
  | "south"
  | "east"
  | "west"
  | "northeast"
  | "northwest"
  | "southeast"
  | "southwest";

export interface PropertyImage {
  id: string;
  property_id: string;

  image_url: string;

  is_thumbnail: boolean;

  created_at?: string;
}

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
  direction: DirectionType | null;

  description?: string;

  thumbnail_url?: string;

  images?: PropertyImage[];

  contact_name?: string;
  contact_phone?: string;

  legal_status?: boolean;

  business_advantage?: boolean;

  environment?: string;
  traffic_location?: string | null;

  land_area_type?: "ODT" | "ONT" | "LUC" | "BHK" | "CLN" | null;
  land_area?: number;

  frontage_width?: number;
  max_depth?: number;

  land_shape?: string;

  asset_on_land?: string;

  structure?: string;
  floors?: string;
  usable_floor_area?: string;

  remaining_value_ratio?: string;

  construction_unit_price?: string;

  resolution_land_price?: string;

  odt_land_price?: string;

  appraisal_completed_at?: string | null;
}
