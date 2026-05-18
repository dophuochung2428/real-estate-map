"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export function useLogout() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    const supabase = createClient();

    try {
      setIsLoading(true);

      await supabase.auth.signOut();

      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logout,
    isLoading,
  };
}
