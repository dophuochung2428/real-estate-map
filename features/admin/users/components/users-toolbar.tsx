"use client";

import { useState } from "react";

import CreateUserModal from "./create-user-modal";

export default function UsersToolbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
    rounded-xl bg-[var(--primary)] px-4 py-2 text-white
    transition-all duration-200
    hover:scale-[1.03] hover:bg-[var(--primary-hover)]
    active:scale-95
    focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
  "
      >
        + Thêm người dùng
      </button>

      <CreateUserModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
