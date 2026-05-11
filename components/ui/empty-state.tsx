import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10 text-center text-[var(--foreground)]">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-[var(--secondary)] text-[var(--primary)]">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[var(--heading)]">{title}</h3>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{description}</p>
    </div>
  );
}
