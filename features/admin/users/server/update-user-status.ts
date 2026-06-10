import { supabaseAdmin } from "@/lib/supabase/admin";

export async function updateUserStatus(
  id: string,
  status: "active" | "suspended",
) {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .update({ status })
    .eq("id", id)
    .select();

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error("Không tìm thấy người dùng");
  }

  return data[0];
}
