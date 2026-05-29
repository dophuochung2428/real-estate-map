import { supabaseAdmin } from "@/lib/supabase/service";

export async function getAdminProperties() {
  const { data, error } = await supabaseAdmin
    .from("properties")
    .select(
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
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).sort((a, b) => {
    const order: Record<string, number> = {
      pending: 0,
      active: 1,
      sold: 2,
      rejected: 3,
    };

    return order[a.status] - order[b.status];
  });
}
