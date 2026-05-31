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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      if (error) {
        const message = error.message.includes("Invalid login credentials")
          ? "Email hoặc mật khẩu không đúng"
          : error.message;

        setError(message);

        toast.error(message);

        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role, status")
        .eq("id", data.user.id)
        .single();

      toast.success("Đăng nhập thành công");

      router.refresh();

      if (profile?.status !== "active") {
        await supabase.auth.signOut();

        const message = "Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên.";

        setError(message);
        toast.error(message);

        return;
      }

      console.log("profile", profile);

      if (profile?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard/properties");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Đăng nhập thất bại";

      setError(message);

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
            NHADAT102
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Hệ thống dành cho tài khoản được cấp quyền
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Email</label>

            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={20}
              />

              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none placeholder:text-zinc-500 transition-all duration-200 focus:border-white/20 focus:bg-white/10 focus:ring-4 focus:ring-white/5"
              />
            </div>
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
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
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
          </div>

          <div className="text-right">
            <p className="text-sm text-zinc-500">
              Quên mật khẩu? Liên hệ quản trị viên.
            </p>
          </div>

          {/* SUBMIT */}
          <button
            disabled={isLoading}
            type="submit"
            className={clsx(
              "flex h-14 w-full items-center justify-center rounded-2xl bg-white text-lg font-bold text-black transition-all duration-200 hover:scale-[1.01] hover:bg-zinc-200",
              isLoading && "cursor-not-allowed opacity-70 hover:scale-100",
            )}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <FaSpinner className="animate-spin" />
                Đang đăng nhập...
              </span>
            ) : (
              "Đăng nhập"
            )}
          </button>

          {/* ERROR */}
          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-100">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
