export type UploadImage = {
  image_url: string;
  is_thumbnail: boolean;
};

export interface CreatePropertyPayload {
  title: string;

  price: string;

  area: string;

  address: string;

  province: string;

  district: string;

  type: string;

  direction: string | null;

  description: string;

  amenities: string[];

  images: UploadImage[];

  lat: number;

  lng: number;
  // Optional appraisal fields when creating a property together with appraisal
  contact_name?: string;
  contact_phone?: string;

  legal_status?: boolean | null;

  business_advantage?: boolean | null;

  environment?: string;

  land_area_type: "ODT" | "ONT" | "LUC" | "BHK" | "CLN" | null;
  land_area: string;

  frontage_width?: string;
  max_depth?: string;

  land_shape?: string;

  asset_on_land?: string;

  structure?: string; // Kết cấu
  floors?: string; // Số tầng
  usable_floor_area?: string; // Diện tích sàn sử dụng
  remaining_value_ratio?: string; // Tỉ lệ GTCL (%)
  construction_unit_price?: string; // Đơn giá xây dựng
  resolution_land_price?: string; // Đơn giá đất theo NQ 16
  odt_land_price: string;
}

export interface UpdateAppraisalPayload {
  contact_name?: string;
  contact_phone?: string;

  legal_status?: boolean;

  business_advantage?: boolean;

  environment?: string;

  land_area_type?: "ODT" | "ONT" | "LUC" | "BHK" | "CLN" | null;
  land_area?: number;

  frontage_width?: number;
  max_depth?: number;

  land_shape?: string;

  asset_on_land?: string;

  structure?: string; // Kết cấu
  floors?: string; // Số tầng
  usable_floor_area?: string; // Diện tích sàn sử dụng
  remaining_value_ratio?: string; // Tỉ lệ GTCL (%)
  construction_unit_price?: string; // Đơn giá xây dựng
  resolution_land_price?: string; // Đơn giá đất theo NQ 16
  odt_land_price?: string;
}
