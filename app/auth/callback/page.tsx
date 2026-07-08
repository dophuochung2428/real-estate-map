"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const otpTypes = [
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
] as const;

type OtpType = (typeof otpTypes)[number];

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Đang xác thực tài khoản...");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const run = async () => {
      const supabase = createClient();

      const queryParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));

      const tokenHash =
        searchParams.get("token_hash") ??
        queryParams.get("token_hash") ??
        hashParams.get("token_hash");
      const type =
        searchParams.get("type") ?? queryParams.get("type") ?? hashParams.get("type");
      const accessToken =
        searchParams.get("access_token") ??
        queryParams.get("access_token") ??
        hashParams.get("access_token");
      const refreshToken =
        searchParams.get("refresh_token") ??
        queryParams.get("refresh_token") ??
        hashParams.get("refresh_token");
      const errorParam =
        searchParams.get("error") ?? queryParams.get("error") ?? hashParams.get("error");
      const errorDescription =
        searchParams.get("error_description") ??
        queryParams.get("error_description") ??
        hashParams.get("error_description");
      const nextPath =
        searchParams.get("next") ?? queryParams.get("next") ?? hashParams.get("next") ?? "/set-password";

      if (errorParam || errorDescription) {
        setIsError(true);
        setMessage(
          errorDescription || "Liên kết mời này không hợp lệ hoặc đã hết hạn.",
        );
        return;
      }

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          setIsError(true);
          setMessage(
            error.message || "Liên kết mời này không hợp lệ hoặc đã hết hạn.",
          );
          return;
        }

        router.replace(nextPath);
        return;
      }

      if (!tokenHash || !type) {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          router.replace(nextPath);
          return;
        }

        setIsError(true);
        setMessage(
          "Liên kết mời này không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu admin gửi lại lời mời.",
        );
        return;
      }

      const otpType = otpTypes.includes(type as OtpType) ? (type as OtpType) : "signup";

      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: otpType,
      });

      if (error) {
        setIsError(true);
        setMessage(error.message || "Không thể xác thực liên kết mời.");
        return;
      }

      router.replace(nextPath);
    };

    run();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-200 shadow-2xl">
        <h1 className="text-xl font-semibold text-white">
          {isError ? "Không thể kích hoạt tài khoản" : "Đang xác thực tài khoản..."}
        </h1>
        <p className="mt-3 text-sm text-slate-400">{message}</p>

        {isError ? (
          <button
            type="button"
            onClick={() => router.replace("/login")}
            className="mt-6 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Quay lại đăng nhập
          </button>
        ) : null}
      </div>
    </div>
  );
}
