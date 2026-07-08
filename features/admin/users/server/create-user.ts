import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createUserService({
  email,
  full_name,
  role,
  redirectTo,
}: {
  email: string;
  full_name: string;
  role: "admin" | "staff" | "customer";
  redirectTo?: string;
}) {
  const supabase = supabaseAdmin;

  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
    data: {
      full_name,
      role,
    },
    redirectTo,
  });

  if (error) throw error;

  return data.user;
}
