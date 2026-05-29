import { createSupabaseAdmin } from "@/lib/supabase/admin";

export async function createUserService({
  email,
  full_name,
  role,
}: {
  email: string;
  full_name: string;
  role: "admin" | "staff";
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
    data: {
      full_name,
      role,
    },
  });

  if (error) throw error;

  return data.user;
}
