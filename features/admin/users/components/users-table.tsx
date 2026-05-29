"use client";

import { useRouter } from "next/navigation";
import { suspendUser, activateUser } from "../actions";
import { useState } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  status: string;
  post_count: number | null;
  created_at: string;
};

type Props = {
  users: User[];
};

export default function UsersTable({ users }: Props) {
  const router = useRouter();

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleToggleStatus = async (user: User) => {
    try {
      setLoadingId(user.id);

      const result =
        user.status === "active"
          ? await suspendUser(user.id)
          : await activateUser(user.id);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(
        user.status === "active" ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản",
      );

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
      <table className="w-full text-left">
        {/* HEADER */}
        <thead className="border-b bg-[var(--muted)]/40 text-sm text-[var(--muted-foreground)]">
          <tr>
            <th className="px-4 py-3 font-medium">Tên</th>

            <th className="px-4 py-3 font-medium">Email</th>

            <th className="px-4 py-3 font-medium">Role</th>

            <th className="px-4 py-3 font-medium">Bài đăng</th>

            <th className="px-4 py-3 font-medium">Status</th>

            <th className="px-4 py-3 font-medium">Ngày tạo</th>

            <th className="px-4 py-3 text-right font-medium">Thao tác</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              className="border-b transition last:border-none hover:bg-[var(--muted)]/20"
            >
              {/* NAME */}
              <td className="px-4 py-3 text-sm font-medium">{u.full_name}</td>

              {/* EMAIL */}
              <td className="px-4 py-3 text-sm text-[var(--muted-foreground)]">
                {u.email}
              </td>

              {/* ROLE */}
              <td className="px-4 py-3 text-sm capitalize">{u.role}</td>

              {/* POSTS */}
              <td className="px-4 py-3 text-sm">
                <span className="rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-600">
                  {u.post_count ?? 0} bài
                </span>
              </td>

              {/* STATUS */}
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    u.status === "active"
                      ? "bg-green-500/10 text-green-600"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {u.status === "active" ? "Hoạt động" : "Đã khóa"}
                </span>
              </td>

              {/* DATE */}
              <td className="px-4 py-3 text-sm text-[var(--muted-foreground)]">
                {new Date(u.created_at).toLocaleDateString()}
              </td>

              {/* ACTIONS */}
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  {/* <button className="rounded-lg bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-600 transition hover:bg-blue-500/20">
                    Sửa
                  </button> */}

                  {u.status === "active" ? (
                    <button
                      disabled={loadingId === u.id}
                      onClick={() => handleToggleStatus(u)}
                      className="rounded-lg bg-red-500/10 px-3 py-1 text-sm font-medium text-red-600 transition hover:bg-red-500/20 disabled:opacity-50"
                    >
                      {loadingId === u.id ? "Đang xử lý..." : "Khóa tài khoản"}
                    </button>
                  ) : (
                    <button
                      disabled={loadingId === u.id}
                      onClick={() => handleToggleStatus(u)}
                      className="rounded-lg bg-green-500/10 px-3 py-1 text-sm font-medium text-green-600 transition hover:bg-green-500/20 disabled:opacity-50"
                    >
                      {loadingId === u.id ? "Đang xử lý..." : "Mở khóa"}
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
