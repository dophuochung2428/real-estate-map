export type Property = {
  id: string;
  title: string;
  address: string;
  price: number;
  status: string;
  created_at: string;

  owner?: {
    full_name?: string;
    email?: string;
  };

  property_images?: {
    image_url: string;
    is_thumbnail: boolean;
  }[];
};
