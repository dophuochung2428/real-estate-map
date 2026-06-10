import { getUsers } from "@/features/admin/users/server/get-users";

import UsersToolbar from "@/features/admin/users/components/users-toolbar";

import UsersTable from "@/features/admin/users/components/users-table";

import { createServerClient } from "@/lib/supabase/server";

export default async function AdminUsersPage() {
  const users = await getUsers();

  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user?.id)
    .single();

  if (!profile) {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý người dùng</h1>

          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Quản lý tài khoản nhân viên trong hệ thống
          </p>
        </div>

        <UsersToolbar />
      </div>
      <UsersTable users={users} currentUser={profile} />
    </div>
  );
}
