"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    await authClient.signOut();

    router.push("/sign-in");
  };

  return {
    logout,
  };
};