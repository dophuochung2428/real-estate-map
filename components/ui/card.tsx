import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass" | "elevated";
}

const variants = {
  default: "bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm",
  glass: "bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg",
  elevated: "bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg hover:shadow-xl transition-shadow",
};

export function Card({ children, className, variant = "default" }: CardProps) {
  return (
    <div className={cn(variants[variant], className)}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("p-6 pb-4", className)}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn("p-6 pt-0", className)}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("p-6 pt-4", className)}>
      {children}
    </div>
  );
}