import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/server/get-current-user";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)] px-4">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2070&auto=format&fit=crop"
          alt="Background"
          className="h-full w-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-slate-950/55" />
      </div>

      {/* LIGHT EFFECTS */}
      <div className="absolute left-[-120px] top-[10%] h-[320px] w-[320px] rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-100px] h-[320px] w-[320px] rounded-full bg-zinc-500/10 blur-3xl" />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-md">{children}</div>

      {/* BRAND */}
      <div className="absolute bottom-6 text-xs tracking-[0.25em] text-white/70">
        REAL ASSET VAL
      </div>
    </main>
  );
}
