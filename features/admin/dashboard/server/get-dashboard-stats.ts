import { createClient } from "@/lib/supabase/client";

export async function getDashboardStats() {
  const supabase = await createClient();

  const [
    { count: total },
    { count: pending },
    { count: active },
    { count: users },
  ] = await Promise.all([
    supabase.from("properties").select("*", { count: "exact", head: true }),

    supabase
      .from("properties")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),

    supabase
      .from("properties")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),

    supabase.from("profiles").select("*", { count: "exact", head: true }),
  ]);

  return [
    { label: "Tổng bài đăng", value: total ?? 0 },
    { label: "Chờ duyệt", value: pending ?? 0 },
    { label: "Đã duyệt", value: active ?? 0 },
    { label: "Người dùng", value: users ?? 0 },
  ];
}
