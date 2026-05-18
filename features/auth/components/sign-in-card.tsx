"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { signInSchema } from "../schemas/sign-in-schema";
import { FaSpinner } from "react-icons/fa";
import clsx from "clsx";

import { createClient } from "@/lib/supabase/client";

export const SignInCard = () => {
  const router = useRouter();
  const supabase = createClient();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = signInSchema.safeParse(form);

    if (!result.success) {
      const message =
        result.error.issues[0]?.message ||
        "Vui lòng nhập email và mật khẩu hợp lệ.";
      setError(message);
      toast.error(message);
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) {
        throw new Error(
          error.message || "Thông tin đăng nhập không chính xác.",
        );
      }

      toast.success("Đăng nhập thành công");
      router.push("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Đăng nhập thất bại";
      setError(message);
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
          <h1 className="mt-4 text-2xl font-bold text-[var(--foreground)]">
            NHADAT102
          </h1>
          <p className="mt-2 text-[var(--muted-foreground)]">
            Đăng nhập vào tài khoản của bạn
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--muted-foreground)]">
              Email
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                size={20}
              />
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] pl-12 pr-4 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--muted-foreground)]">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] pl-12 pr-12 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className={clsx(
              "h-12 w-full rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold transition hover:bg-[var(--primary-hover)] focus:ring-2 focus:ring-[var(--primary)]/20",
              isLoading && "cursor-not-allowed opacity-70",
            )}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
        </form>

        <div className="mt-6 flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => router.push("/forgot-password")}
            className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition"
          >
            Quên mật khẩu?
          </button>
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </main>
  );
};
