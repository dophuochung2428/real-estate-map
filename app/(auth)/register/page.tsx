"use client";

import Link from "next/link";

import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-xl">
      <div className="mb-8">
        <h1 className="mb-3 text-4xl font-bold">Đăng ký</h1>

        <p className="text-gray-500">Tạo tài khoản mới</p>
      </div>

      <div className="space-y-5">
        {/* NAME */}
        <div>
          <label className="mb-2 block text-sm font-semibold">Họ tên</label>

          <div className="flex h-14 items-center rounded-2xl border px-4">
            <User className="mr-3 size-5 text-gray-400" />

            <input placeholder="Nguyễn Văn A" className="flex-1 outline-none" />
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <label className="mb-2 block text-sm font-semibold">Email</label>

          <div className="flex h-14 items-center rounded-2xl border px-4">
            <Mail className="mr-3 size-5 text-gray-400" />

            <input
              type="email"
              placeholder="example@gmail.com"
              className="flex-1 outline-none"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label className="mb-2 block text-sm font-semibold">Mật khẩu</label>

          <div className="flex h-14 items-center rounded-2xl border px-4">
            <Lock className="mr-3 size-5 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="flex-1 outline-none"
            />

            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff className="size-5 text-gray-400" />
              ) : (
                <Eye className="size-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* BTN */}
        <button className="h-14 w-full rounded-2xl bg-red-600 font-semibold text-white transition hover:bg-red-700">
          Tạo tài khoản
        </button>
      </div>

      <div className="mt-8 text-center">
        <span className="text-gray-500">Đã có tài khoản?</span>

        <Link href="/login" className="ml-2 font-semibold text-red-600">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}
