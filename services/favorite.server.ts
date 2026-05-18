import { createServerClient } from "@/lib/supabase/server";

export async function getFavorites(): Promise<any[]> {
  const supabase = await createServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return [];
  }

  const { data, error } = await supabase
    .from("favorites")
    .select(
      `
      property_id,

      properties (
        *,
        property_images (
          image_url,
          is_thumbnail
        )
      )
    `,
    )
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }

  return data || [];
}
