import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

const sizes = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export function LoadingSpinner({ size = "md", className, text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={cn(
          "animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--primary)]",
          sizes[size],
          className
        )}
      />
      {text && (
        <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider">
          {text}
        </p>
      )}
    </div>
  );
}

interface LoadingCardProps {
  text?: string;
  className?: string;
}

export function LoadingCard({ text = "Đang tải...", className }: LoadingCardProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-sm",
      className
    )}>
      <LoadingSpinner size="lg" />
      <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider">
        {text}
      </p>
    </div>
  );
}