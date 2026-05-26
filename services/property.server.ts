import { Filters } from "@/types/filter";
import { createServerClient } from "@/lib/supabase/server";

export async function getProperties(filters?: Filters): Promise<any> {
  const supabase = await createServerClient();

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

  if (filters?.keyword) {
    query = query.ilike("title", `%${filters.keyword}%`);
  }

  if (filters?.province) {
    query = query.eq("province", filters.province);
  }

  if (filters?.district) {
    query = query.eq("district", filters.district);
  }

  if (filters?.type) {
    query = query.eq("type", filters.type);
  }

  if (filters?.direction) {
    query = query.eq("direction", filters.direction);
  }

  if (filters?.minPrice) {
    query = query.gte("price", filters.minPrice);
  }

  if (filters?.maxPrice) {
    query = query.lte("price", filters.maxPrice);
  }

  if (filters?.minArea) {
    query = query.gte("area", filters.minArea);
  }

  if (filters?.maxArea) {
    query = query.lte("area", filters.maxArea);
  }

  if (filters?.sort === "price_asc") {
    query = query.order("price", {
      ascending: true,
    });
  }

  if (filters?.sort === "price_desc") {
    query = query.order("price", {
      ascending: false,
    });
  }

  if (filters?.sort === "area_desc") {
    query = query.order("area", {
      ascending: false,
    });
  }

  if (!filters?.sort) {
    query = query.order("created_at", {
      ascending: false,
    });
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
  const supabase = await createServerClient();

  const result = await supabase
    .from("properties")
    .select(
      `
      *,
      property_images (
        id,
        image_url,
        is_thumbnail,
        created_at
      ),
      owner:profiles (
        id,
        full_name,
        email
      )
    `,
    )
    .eq("id", id)
    .single();

  if (result.error) {
    throw result.error;
  }

  return result.data;
}

export async function addRecentlyViewed(propertyId: string) {
  const supabase = await createServerClient();
  let user = null;

  try {
    const res = await supabase.auth.getUser();
    user = res.data.user;
  } catch {
    user = null;
  }

  if (!user) return;

  const { data: existing } = await supabase
    .from("recently_viewed")
    .select("id")
    .eq("user_id", user.id)
    .eq("property_id", propertyId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("recently_viewed")
      .update({
        viewed_at: new Date().toISOString(),
      })
      .eq("id", existing.id);

    return;
  }

  await supabase.from("recently_viewed").insert({
    user_id: user.id,
    property_id: propertyId,
  });
}

export async function getMyListings(filters?: {
  keyword?: string;
}): Promise<any[]> {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  let query = supabase
    .from("properties")
    .select(
      `
      *,
      property_images (
        image_url,
        is_thumbnail
      )
    `,
    )
    .eq("user_id", user.id);

  // SEARCH
  if (filters?.keyword) {
    query = query.or(
      `title.ilike.%${filters.keyword}%,address.ilike.%${filters.keyword}%`,
    );
  }

  const { data, error } = await query.order("created_at", {
    ascending: false,
  });

  if (error) {
    throw error;
  }

  return data || [];
}

export async function getSimilarProperties({
  propertyId,
  district,
  type,
}: {
  propertyId: string;

  district?: string;

  type?: string;
}) {
  const supabase = await createServerClient();

  let query = supabase
    .from("properties")
    .select(
      `
      *,
      property_images (
        id,
        image_url,
        is_thumbnail
      )
    `,
    )
    .neq("id", propertyId)
    .limit(4);

  if (district) {
    query = query.eq("district", district);
  }

  if (type) {
    query = query.eq("type", type);
  }

  query = query.order("created_at", {
    ascending: false,
  });

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data || [];
}

export async function getProvinces(): Promise<string[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("properties")
    .select("province")
    .not("province", "is", null);

  if (error) {
    throw error;
  }

  const provinces = [...new Set(data.map((item) => item.province))];

  return provinces.sort();
}
