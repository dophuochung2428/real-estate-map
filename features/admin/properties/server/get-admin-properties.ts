import { supabaseAdmin } from "@/lib/supabase/service";

type Params = {
  page?: number;
  search?: string;
  status?: string;
};

export async function getAdminProperties({ page = 1, search, status }: Params) {
  const PAGE_SIZE = 20;

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabaseAdmin.from("properties").select(
    `
    *,
    owner:profiles (
      id,
      full_name,
      email
    ),
    property_images (
      image_url,
      is_thumbnail
    )
  `,
    {
      count: "exact",
    },
  );

  if (search) {
    query = query.or(`title.ilike.%${search}%,address.ilike.%${search}%`);
  }

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  query = query
    .order("created_at", {
      ascending: false,
    })
    .range(from, to);

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return {
    properties: data || [],
    total: count || 0,
    totalPages: Math.ceil((count || 0) / PAGE_SIZE),
    page,
  };
}
