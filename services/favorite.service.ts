import { createClient } from "@/lib/supabase/client";

export async function toggleFavorite(propertyId: string) {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Unauthorized");
  }

  const { data: existing, error: queryError } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("property_id", propertyId)
    .single();

  if (queryError) {
    throw queryError;
  }

  if (existing) {
    const { error } = await supabase.from("favorites").delete().eq("id", existing.id);
    if (error) {
      throw error;
    }
    return false;
  }

  const { error } = await supabase.from("favorites").insert({
    user_id: user.id,
    property_id: propertyId,
  });

  if (error) {
    throw error;
  }

  return true;
}
