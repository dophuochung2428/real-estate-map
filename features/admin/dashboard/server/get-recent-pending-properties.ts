import { createClient } from "@/lib/supabase/client";

export async function getRecentPendingProperties() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("properties")
    .select(
      `
  id,
  title,
  created_at,
  profiles (
    full_name
  )
`,
    )
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(5);

  return data ?? [];
}
