"use client";

import { useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { createUserAction } from "../actions/create-user";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateUserModal({ open, onClose }: Props) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [role, setRole] = useState<"customer" | "staff">("staff");

  if (!open) return null;

  async function handleSubmit() {
    startTransition(async () => {
      try {
        const formData = new FormData();

        formData.append("full_name", fullName);

        formData.append("email", email);

        formData.append("role", role);

        await createUserAction(formData);

        // reset form
        setFullName("");

        setEmail("");

        setRole("staff");

        router.refresh();

        onClose();
      } catch (err) {
        console.error(err);

        alert("Tạo người dùng thất bại");
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      {/* MODAL */}
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl">
        {/* HEADER */}
        <div>
          <h2 className="text-xl font-bold text-[var(--foreground)]">
            Thêm người dùng
          </h2>

          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Tạo tài khoản nhân viên mới trong hệ thống
          </p>
        </div>

        {/* FORM */}
        <div className="mt-5 space-y-4">
          {/* FULL NAME */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
              Họ tên
            </label>

            <input
              placeholder="Nguyễn Văn A"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={pending}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
              Email
            </label>

            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={pending}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
              Vai trò
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "customer" | "staff")}
              disabled={pending}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="staff">Nhân viên</option>

              <option value="customer">Khách hàng trả phí</option>
            </select>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={pending}
            className="
    rounded-lg border border-[var(--border)] px-4 py-2
    text-[var(--foreground)]
    transition-all duration-200
    hover:bg-[var(--muted)]
    hover:scale-[1.02]
    active:scale-95
    focus:outline-none focus:ring-2 focus:ring-black
    disabled:opacity-50
  "
          >
            Hủy
          </button>

          <button
            disabled={pending}
            onClick={handleSubmit}
            className="
    rounded-lg bg-black px-4 py-2 text-white
    transition-all duration-200
    hover:scale-[1.03] hover:opacity-90
    active:scale-95
    focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
  "
          >
            {pending ? "Đang tạo..." : "Tạo tài khoản"}
          </button>
        </div>
      </div>
    </div>
  );
}
