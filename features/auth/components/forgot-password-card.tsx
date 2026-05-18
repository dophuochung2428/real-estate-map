"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { forgotPasswordSchema } from "../schemas/forgot-password-schema";
import { FaSpinner } from "react-icons/fa";

export const ForgotPasswordCard = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setStatus("idle");
    setMessage(null);

    const parsed = forgotPasswordSchema.safeParse({ email });

    if (!parsed.success) {
      const messageText =
        parsed.error.issues[0]?.message || "Email không hợp lệ.";

      setStatus("error");
      setMessage(messageText);

      toast.error(messageText);

      setIsLoading(false);

      return;
    }

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: parsed.data.email,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);

        const errorMessage =
          body?.message || "Không thể gửi yêu cầu đặt lại mật khẩu.";

        throw new Error(errorMessage);
      }

      setStatus("success");

      setMessage(
        "Nếu email tồn tại, chúng tôi đã gửi liên kết đặt lại mật khẩu đến hộp thư của bạn.",
      );

      toast.success("Yêu cầu đặt lại mật khẩu đã gửi.");

      setEmail("");
    } catch (error) {
      const messageText =
        error instanceof Error
          ? error.message
          : "Lỗi không xác định. Vui lòng thử lại.";

      setStatus("error");
      setMessage(messageText);

      toast.error(messageText);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md">
      <div className="rounded-[32px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur">
            <Mail className="text-white" size={28} />
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-white">
            Quên mật khẩu
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Nhập email để nhận liên kết khôi phục tài khoản
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none placeholder:text-zinc-500 transition-all duration-200 focus:border-white/20 focus:bg-white/10 focus:ring-4 focus:ring-white/5"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className={`flex h-14 w-full items-center justify-center rounded-2xl bg-white text-lg font-bold text-black transition-all duration-200 hover:scale-[1.01] hover:bg-zinc-200 ${
              isLoading ? "cursor-not-allowed opacity-70 hover:scale-100" : ""
            }`}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <FaSpinner className="animate-spin" />
                Đang gửi...
              </span>
            ) : (
              "Gửi liên kết"
            )}
          </button>

          {/* MESSAGE */}
          {message && (
            <div
              className={`rounded-2xl border p-4 text-sm leading-relaxed ${
                status === "success"
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-100"
                  : "border-red-500/20 bg-red-500/10 text-red-100"
              }`}
            >
              {message}
            </div>
          )}
        </form>

        {/* FOOTER */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-zinc-500">Nhớ mật khẩu rồi?</p>

          <button
            onClick={() => router.push("/login")}
            className="mt-2 font-semibold text-white transition hover:text-zinc-300"
          >
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};
