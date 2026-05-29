import { supabaseAdmin } from "@/lib/supabase/service";

export async function getUsers() {
  const { data: users, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  const { data: posts } = await supabaseAdmin
    .from("properties")
    .select("user_id");

  const countMap = new Map<string, number>();

  posts?.forEach((p) => {
    countMap.set(p.user_id, (countMap.get(p.user_id) || 0) + 1);
  });

  return users.map((u) => ({
    ...u,
    post_count: countMap.get(u.id) || 0,
  }));
}
