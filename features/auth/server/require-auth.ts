import { redirect } from "next/navigation";

import { getCurrentUser } from "./get-current-user";

export async function requireAuth(redirectTo = "/login") {
  const user = await getCurrentUser();

  if (!user) {
    redirect(redirectTo);
  }

  return user;
}
