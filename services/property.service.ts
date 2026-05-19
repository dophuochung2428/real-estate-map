import { createClient } from "@/lib/supabase/client";
import { getStoragePath } from "@/utils/storage";

export async function createProperty(payload: any) {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Unauthorized");
  }

  if (!payload.images || payload.images.length === 0) {
    throw new Error("Images is required");
  }

  const { data: property, error } = await supabase
    .from("properties")
    .insert({
      title: payload.title,
      price: payload.price,
      area: payload.area,
      address: payload.address,
      province: payload.province,
      district: payload.district,
      type: payload.type,
      direction: payload.direction,
      lat: payload.lat,
      lng: payload.lng,

      thumbnail_url:
        payload.images.find((x: any) => x.is_thumbnail)?.image_url ??
        payload.images?.[0]?.image_url,

      description: payload.description,

      amenities: payload.amenities,

      user_id: user.id,
      status: "active",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

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
  const supabase = createClient();

  // AUTH
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Unauthorized");
  }

  // GET IMAGES
  const { data: images, error: imageError } = await supabase
    .from("property_images")
    .select("image_url")
    .eq("property_id", id);

  if (imageError) {
    throw imageError;
  }

  // DELETE STORAGE FILES
  if (images?.length) {
    const filePaths = images.map((img) => getStoragePath(img.image_url));

    const { error: storageError } = await supabase.storage
      .from("property-images")
      .remove(filePaths);

    if (storageError) {
      throw storageError;
    }
  }

  // DELETE PROPERTY
  const { error } = await supabase
    .from("properties")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }
}

export async function updateProperty(id: string, payload: any) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("properties")
    .update(payload)
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }
}
