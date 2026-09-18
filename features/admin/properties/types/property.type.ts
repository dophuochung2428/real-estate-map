export type Property = {
  id: string;
  title: string;
  address: string;
  price: number;
  status: string;
  created_at: string;

  owner?: {
    id?: string;
    full_name?: string;
    email?: string;
  };

  property_images?: {
    image_url: string;
    is_thumbnail: boolean;
  }[];

  property_land_areas?: {
    land_type: string;
    area: number;
    unit_price: number | string | null;
  }[];

  description?: string | null;

  type?: string | null;
  direction?: string | null;

  province?: string | null;
  district?: string | null;

  source?: string | null;
  resolution_land_price?: number | string | null;

  contact_name?: string | null;
  contact_phone?: string | null;

  legal_status?: string | null;
  business_advantage?: string | null;

  environment?: string | null;
  traffic_location?: string | null;

  frontage_width?: number | null;
  max_depth?: number | null;
  land_shape?: string | null;

  asset_on_land?: string | null;
  structure?: string | null;
  floors?: number | null;
  usable_floor_area?: number | null;
  remaining_value_ratio?: number | null;
  construction_unit_price?: number | null;

  appraisal_completed_at?: string | null;
};
