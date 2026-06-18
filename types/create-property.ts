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

  land_ont_area?: string;
  land_cln_area?: string;

  frontage_width?: string;
  max_depth?: string;

  land_shape?: string;

  asset_on_land?: string;
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
