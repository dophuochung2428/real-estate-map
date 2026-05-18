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
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
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
      toast.error(result.error.issues[0]?.message || "Vui lòng kiểm tra các trường.");
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

      toast.success("Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản.");
      router.push("/login");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Lỗi đăng ký. Vui lòng thử lại.";
      setServerError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-[var(--card)] p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="text-4xl">🏠</div>
          <h1 className="mt-4 text-2xl font-bold text-[var(--foreground)]">NHADAT102</h1>
          <p className="mt-2 text-[var(--muted-foreground)]">Tạo tài khoản mới</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--muted-foreground)]">Tên người dùng</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={20} />
              <input
                type="text"
                placeholder="Tên của bạn"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="h-12 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              />
            </div>
            {errors.username && <p className="text-sm text-red-600">{errors.username[0]}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--muted-foreground)]">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={20} />
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-12 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              />
            </div>
            {errors.email && <p className="text-sm text-red-600">{errors.email[0]}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--muted-foreground)]">Số điện thoại</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={20} />
              <input
                type="tel"
                placeholder="0123 456 789"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="h-12 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              />
            </div>
            {errors.phone && <p className="text-sm text-red-600">{errors.phone[0]}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--muted-foreground)]">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="h-12 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-12 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-600">{errors.password[0]}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="h-12 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-12 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword[0]}</p>}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className={`h-12 w-full rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold transition hover:bg-[var(--primary-hover)] focus:ring-2 focus:ring-[var(--primary)]/20 ${
              isLoading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {isLoading ? "Đang tạo tài khoản..." : "Đăng ký"}
          </button>

          {serverError && <div className="text-red-600 text-sm text-center">{serverError}</div>}
        </form>

        <div className="mt-6 text-center text-sm">
          <button onClick={() => router.push("/login")} className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition">
            Đã có tài khoản? Đăng nhập
          </button>
        </div>
      </div>
    </main>
  );
};
