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
}

export interface UpdateAppraisalPayload {
  contact_name?: string;
  contact_phone?: string;

  legal_status?: boolean;

  business_advantage?: boolean;

  environment?: string;

  land_ont_area?: number;
  land_cln_area?: number;

  frontage_width?: number;
  max_depth?: number;

  land_shape?: string;

  asset_on_land?: string;
}
