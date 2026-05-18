import { createServerClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createServerClient();
  const { data } = await supabase.auth.getUser();
  return data.user || null;
}