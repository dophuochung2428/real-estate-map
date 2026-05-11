"use client";

import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { useState } from "react";
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

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          body?.message || "Không thể gửi yêu cầu đặt lại mật khẩu.",
        );
      }

      setStatus("success");
      setMessage(
        "Nếu email tồn tại, chúng tôi đã gửi liên kết đặt lại mật khẩu đến hộp thư của bạn.",
      );
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Lỗi không xác định. Vui lòng thử lại.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#021B2B] px-4 text-white">
      <div className="absolute left-[-100px] top-[70%] h-[300px] w-[300px] rounded-full bg-white/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md rounded-[32px] border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-black text-cyan-400">RESET</h1>

          <p className="mt-3 text-zinc-300">
            Nhập email để nhận liên kết khôi phục
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
              size={20}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/10 pl-12 pr-4 text-white outline-none placeholder:text-zinc-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className={`h-14 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-lg font-bold transition hover:scale-[1.02] ${
              isLoading ? "cursor-not-allowed opacity-70 hover:scale-100" : ""
            }`}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <FaSpinner className="h-5 w-5 animate-spin" />
                Đang gửi...
              </span>
            ) : (
              "GỬI LIÊN KẾT"
            )}
          </button>

          {message && (
            <div
              className={`mt-4 rounded-2xl border p-3 text-sm ${
                status === "success"
                  ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
                  : "border-red-500/30 bg-red-500/10 text-red-100"
              }`}
            >
              {message}
            </div>
          )}
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/sign-in")}
            className="text-sm text-cyan-400"
          >
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    </main>
  );
};
