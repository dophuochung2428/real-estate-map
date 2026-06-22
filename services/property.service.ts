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

      // Persist appraisal fields if included in create payload
      contact_name: payload.contact_name ?? null,

      contact_phone: payload.contact_phone ?? null,

      legal_status:
        typeof payload.legal_status === "undefined"
          ? null
          : payload.legal_status,

      business_advantage:
        typeof payload.business_advantage === "undefined"
          ? null
          : payload.business_advantage,

      environment: payload.environment ?? null,

      land_area_type: payload.land_area_type ?? null,

      land_area: payload.land_area ? Number(payload.land_area) : null,

      frontage_width: payload.frontage_width
        ? Number(payload.frontage_width)
        : null,

      max_depth: payload.max_depth ? Number(payload.max_depth) : null,

      land_shape: payload.land_shape ?? null,

      asset_on_land: payload.asset_on_land ?? null,

      // If any appraisal field present, mark as completed
      appraisal_completed_at:
        payload.contact_name ||
        payload.contact_phone ||
        payload.environment ||
        payload.land_area ||
        payload.land_area_type ||
        payload.frontage_width ||
        payload.max_depth ||
        payload.land_shape ||
        payload.asset_on_land ||
        typeof payload.legal_status !== "undefined" ||
        typeof payload.business_advantage !== "undefined"
          ? new Date().toISOString()
          : null,

      user_id: user.id,
      status: "pending",
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
      image_key: image.image_key,
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

  // SOFT DELETE PROPERTY
  const { error } = await supabase
    .from("properties")
    .update({
      status: "deleted",
    })
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

  // GET OLD IMAGES
  const { data: oldImages, error: oldImageError } = await supabase
    .from("property_images")
    .select("image_url,image_key")
    .eq("property_id", id);

  if (oldImageError) {
    throw oldImageError;
  }

  // FIND REMOVED IMAGES
  const newUrls = payload.images.map((x: any) => x.image_url);

  const removedImages =
    oldImages?.filter((img) => !newUrls.includes(img.image_url)) || [];

  // DELETE REMOVED STORAGE FILES
  if (removedImages.length) {
    const r2Images = removedImages.filter((img) => img.image_key);

    const supabaseImages = removedImages.filter((img) => !img.image_key);

    // DELETE R2
    await Promise.all(
      r2Images.map((img) =>
        fetch("/api/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key: img.image_key,
          }),
        }),
      ),
    );

    // DELETE SUPABASE
    if (supabaseImages.length) {
      const filePaths = supabaseImages.map((img) =>
        getStoragePath(img.image_url),
      );

      const { error: storageError } = await supabase.storage
        .from("property-images")
        .remove(filePaths);

      if (storageError) {
        throw storageError;
      }
    }
  }

  // UPDATE PROPERTY
  const { error } = await supabase
    .from("properties")
    .update({
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
      description: payload.description,
      amenities: payload.amenities,

      thumbnail_url:
        payload.images.find((x: any) => x.is_thumbnail)?.image_url ??
        payload.images?.[0]?.image_url,

      status: "pending",
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }

  // DELETE OLD DB IMAGES
  const { error: deleteError } = await supabase
    .from("property_images")
    .delete()
    .eq("property_id", id);

  if (deleteError) {
    throw deleteError;
  }

  // INSERT NEW IMAGES
  if (payload.images?.length) {
    const images = payload.images.map((image: any) => ({
      property_id: id,
      image_url: image.image_url,
      image_key: image.image_key,
      is_thumbnail: image.is_thumbnail,
    }));

    const { error: imageError } = await supabase
      .from("property_images")
      .insert(images);

    if (imageError) {
      throw imageError;
    }
  }
}

export async function restoreProperty(id: string) {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("properties")
    .update({
      status: "pending",
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }
}

export async function updateAppraisal(id: string, payload: any) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("properties")
    .update({
      contact_name: payload.contact_name,

      contact_phone: payload.contact_phone,

      legal_status: payload.legal_status,

      business_advantage: payload.business_advantage,

      environment: payload.environment,

      land_area_type: payload.land_area_type ?? null,

      land_area: payload.land_area ? Number(payload.land_area) : null,

      frontage_width: payload.frontage_width
        ? Number(payload.frontage_width)
        : null,

      max_depth: payload.max_depth ? Number(payload.max_depth) : null,

      land_shape: payload.land_shape,

      asset_on_land: payload.asset_on_land,

      appraisal_completed_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }
}
