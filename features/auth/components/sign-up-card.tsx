"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";
import { signUpSchema } from "../schemas/sign-up-schema";
import { FaSpinner } from "react-icons/fa";

import { createClient } from "@/lib/supabase/client";

export const SignUpCard = () => {
  const router = useRouter();
  const supabase = createClient();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
    {},
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    setIsLoading(true);

    const result = signUpSchema.safeParse(form);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      toast.error(
        result.error.issues[0]?.message || "Vui lòng kiểm tra các trường.",
      );
      setIsLoading(false);
      return;
    }

    setErrors({});

    try {
      const { data, error } = await supabase.auth.signUp({
        email: result.data.email,
        password: result.data.password,
        options: {
          data: {
            username: result.data.username,
            phone: result.data.phone,
          },
        },
      });

      if (error) {
        throw new Error(error.message || "Không thể tạo tài khoản.");
      }

      if (!data.user) {
        throw new Error("Không thể tạo tài khoản.");
      }

      toast.success(
        "Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản.",
      );
      router.push("/login");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Lỗi đăng ký. Vui lòng thử lại.";
      setServerError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md">
      <div className="rounded-[32px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-3xl backdrop-blur">
            🏠
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-white">
            Tạo tài khoản
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Đăng ký để bắt đầu sử dụng nền tảng
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* USERNAME */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              Tên người dùng
            </label>

            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={20}
              />

              <input
                type="text"
                placeholder="Tên của bạn"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none placeholder:text-zinc-500 transition-all duration-200 focus:border-white/20 focus:bg-white/10 focus:ring-4 focus:ring-white/5"
              />
            </div>

            {errors.username && (
              <p className="text-sm text-red-400">{errors.username[0]}</p>
            )}
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Email</label>

            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={20}
              />

              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none placeholder:text-zinc-500 transition-all duration-200 focus:border-white/20 focus:bg-white/10 focus:ring-4 focus:ring-white/5"
              />
            </div>

            {errors.email && (
              <p className="text-sm text-red-400">{errors.email[0]}</p>
            )}
          </div>

          {/* PHONE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              Số điện thoại
            </label>

            <div className="relative">
              <Phone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={20}
              />

              <input
                type="tel"
                placeholder="0123 456 789"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none placeholder:text-zinc-500 transition-all duration-200 focus:border-white/20 focus:bg-white/10 focus:ring-4 focus:ring-white/5"
              />
            </div>

            {errors.phone && (
              <p className="text-sm text-red-400">{errors.phone[0]}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              Mật khẩu
            </label>

            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={20}
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-12 text-white outline-none placeholder:text-zinc-500 transition-all duration-200 focus:border-white/20 focus:bg-white/10 focus:ring-4 focus:ring-white/5"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-400">{errors.password[0]}</p>
            )}
          </div>

          {/* CONFIRM */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              Xác nhận mật khẩu
            </label>

            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={20}
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirmPassword: e.target.value,
                  })
                }
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-12 text-white outline-none placeholder:text-zinc-500 transition-all duration-200 focus:border-white/20 focus:bg-white/10 focus:ring-4 focus:ring-white/5"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-sm text-red-400">
                {errors.confirmPassword[0]}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            disabled={isLoading}
            type="submit"
            className={`flex h-14 w-full items-center justify-center rounded-2xl bg-white text-lg font-bold text-black transition-all duration-200 hover:scale-[1.01] hover:bg-zinc-200 ${
              isLoading ? "cursor-not-allowed opacity-70 hover:scale-100" : ""
            }`}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <FaSpinner className="animate-spin" />
                Đang tạo tài khoản...
              </span>
            ) : (
              "Đăng ký"
            )}
          </button>

          {/* ERROR */}
          {serverError && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-100">
              {serverError}
            </div>
          )}
        </form>

        {/* FOOTER */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-zinc-500">Đã có tài khoản?</p>

          <button
            onClick={() => router.push("/login")}
            className="mt-2 font-semibold text-white transition hover:text-zinc-300"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};
