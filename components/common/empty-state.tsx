import { SearchX } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="rounded-3xl bg-[var(--card)] p-14 text-center shadow-sm">
      <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-[var(--accent)]/15">
        <SearchX className="size-10 text-[var(--accent)]" />
      </div>

      <h2 className="mb-3 text-3xl font-bold">{title}</h2>

      <p className="mx-auto max-w-md text-[var(--muted-foreground)]">{description}</p>
    </div>
  );
}
