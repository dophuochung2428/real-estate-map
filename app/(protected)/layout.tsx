import { ReactNode } from "react";

import { requireAuth } from "@/features/auth/server/require-auth";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  await requireAuth();

  return <>{children}</>;
}
