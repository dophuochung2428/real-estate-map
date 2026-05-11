import { supabase } from "@/lib/supabase";

import { Filters } from "@/types/filter";

export async function getProperties(filters?: Filters) {
  let query = supabase.from("properties").select(
    `
      *,
      property_images (
        id,
        image_url,
        is_thumbnail
      )
    `,
    {
      count: "exact",
    },
  );

  // FILTERS
  if (filters?.location) {
    query = query.ilike("address", `%${filters.location}%`);
  }

  if (filters?.type) {
    query = query.eq("type", filters.type);
  }

  if (filters?.minPrice) {
    query = query.gte("price", filters.minPrice);
  }

  if (filters?.maxPrice) {
    query = query.lte("price", filters.maxPrice);
  }

  const { data, error, count } = await query.limit(20);

  if (error) {
    throw error;
  }

  return {
    data: data || [],

    count: count || 0,
  };
}

export async function getPropertyById(id: string) {
  const { data, error } = await supabase
    .from("properties")
    .select(
      `
      *,
      property_images (
        id,
        image_url,
        is_thumbnail,
        created_at
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function createProperty(payload: any) {
  // INSERT PROPERTY
  const {
    data: property,

    error,
  } = await supabase
    .from("properties")
    .insert({
      title: payload.title,

      price: Number(payload.price),

      area: Number(payload.area),

      address: payload.address,

      province: payload.province,

      district: payload.district,

      type: payload.type,

      direction: payload.direction,

      lat: payload.lat,

      lng: payload.lng,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  // INSERT IMAGES
  if (payload.images?.length) {
    const images = payload.images.map((image: any) => ({
      property_id: property.id,

      image_url: image.image_url,

      is_thumbnail: image.is_thumbnail,
    }));

    const { error: imageError } = await supabase
      .from("property_images")
      .insert(images);

    if (imageError) {
      throw imageError;
    }
  }

  return property;
}

export async function deleteProperty(id: string) {
  const { error } = await supabase.from("properties").delete().eq("id", id);

  if (error) {
    throw error;
  }
}

export async function updateProperty(
  id: string,

  payload: any,
) {
  const { error } = await supabase
    .from("properties")
    .update(payload)
    .eq("id", id);

  if (error) {
    throw error;
  }
}
