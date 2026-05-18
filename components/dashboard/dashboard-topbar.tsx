import { Search } from "lucide-react";
import { User } from "@supabase/supabase-js";

type Props = {
  user: User | null;
};

export default function DashboardTopbar({ user }: Props) {
  const avatar = user?.user_metadata?.username?.charAt(0).toUpperCase() || "U";

  return (
    <div className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-[var(--border)] bg-[var(--card)] px-6">
      {/* SEARCH */}
      <div className="flex h-11 w-[320px] items-center gap-3 rounded-2xl bg-[var(--card)] border border-[var(--border)] px-4">
        <Search size={18} className="text-[var(--muted-foreground)]" />

        <input
          placeholder="Tìm kiếm..."
          className="flex-1 bg-transparent text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)]"
        />
      </div>

      {/* PROFILE */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-semibold">
            {user?.user_metadata?.username || "User"}
          </p>

          <p className="text-sm text-[var(--muted-foreground)]">
            {user?.user_metadata?.role || "User"}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
          {avatar}
        </div>
      </div>
    </div>
  );
}
