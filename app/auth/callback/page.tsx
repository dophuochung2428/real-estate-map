"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const run = async () => {
      const supabase = createClient();

      const token_hash = searchParams.get("token_hash");
      const type = searchParams.get("type");

      if (!token_hash || !type) {
        router.replace("/");
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type: type as any,
      });

      console.log("VERIFY ERROR", error);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log("SESSION AFTER VERIFY", session);

      if (error) {
        console.error(error);
        router.replace("/");
        return;
      }

      router.replace("/set-password");
    };

    run();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      Đang xác thực tài khoản...
    </div>
  );
}
