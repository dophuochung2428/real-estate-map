import { createServerClient } from "@/lib/supabase/server";

export async function getAdminProperties() {
  const supabase = await createServerClient();

  const { data, error } = await supabase
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
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data || [];
}
