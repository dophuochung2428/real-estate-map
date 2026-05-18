"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { resetPasswordSchema } from "../schemas/reset-password-schema";
import { createClient } from "@/lib/supabase/client";

export const ResetPasswordCard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [accessToken, setAccessToken] = useState<string | null>(
    searchParams.get("access_token"),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    searchParams.get("refresh_token"),
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) {
      const hash = window.location.hash.replace(/^#/, "");
      const hashParams = new URLSearchParams(hash);
      const parsedAccessToken = hashParams.get("access_token");
      const parsedRefreshToken = hashParams.get("refresh_token");

      if (parsedAccessToken) {
        setAccessToken(parsedAccessToken);
      }

      if (parsedRefreshToken) {
        setRefreshToken(parsedRefreshToken);
      }

      if (!parsedAccessToken) {
        setError("Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.");
      }
    }
  }, [accessToken]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const parsed = resetPasswordSchema.safeParse(form);

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Vui lòng kiểm tra các trường.";
      setError(message);
      toast.error(message);
      setIsLoading(false);
      return;
    }

    if (!accessToken) {
      const message = "Liên kết đặt lại mật khẩu không hợp lệ.";
      setError(message);
      toast.error(message);
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      if (accessToken) {
        const sessionData: Record<string, string> = {
          access_token: accessToken,
        };

        if (refreshToken) {
          sessionData.refresh_token = refreshToken;
        }

        const { error: sessionError } = await supabase.auth.setSession(
          sessionData as any,
        );

        if (sessionError) {
          throw new Error(sessionError.message || "Không thể thiết lập phiên làm việc.");
        }
      }

      const { error } = await supabase.auth.updateUser({ password: parsed.data.password });

      if (error) {
        throw new Error(error.message || "Không thể đặt lại mật khẩu.");
      }

      toast.success("Mật khẩu đã được cập nhật. Vui lòng đăng nhập lại.");
      router.push("/login");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Không thể đặt lại mật khẩu.";
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
          <div className="text-4xl">🔒</div>
          <h1 className="mt-4 text-2xl font-bold text-[var(--foreground)]">Đặt lại mật khẩu</h1>
          <p className="mt-2 text-[var(--muted-foreground)]">
            Nhập mật khẩu mới để tiếp tục.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--muted-foreground)]">Mật khẩu mới</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={20} />
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--muted-foreground)]">Xác nhận mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] pl-12 pr-12 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
          </button>

          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => router.push("/login")} className="text-sm text-[var(--primary)] hover:underline">
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    </main>
  );
};
