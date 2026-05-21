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
