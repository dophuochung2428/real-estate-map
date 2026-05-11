import type { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

export function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 transition-shadow shadow-sm hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[var(--text-muted)]">{title}</p>
          <h2 className="mt-3 text-5xl font-black text-[var(--heading)]">{value}</h2>
        </div>
        <div className="rounded-2xl bg-[var(--secondary)] p-4 text-[var(--primary)]">
          {icon}
        </div>
      </div>
    </div>
  );
}
