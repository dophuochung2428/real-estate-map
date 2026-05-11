"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] focus:ring-[var(--focus-ring)] border border-[var(--primary)]",
  secondary:
    "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary-hover)] focus:ring-[var(--focus-ring)] border border-[var(--border)]",
  ghost: "bg-transparent text-[var(--foreground)] hover:bg-[var(--hover)] focus:ring-[var(--focus-ring)] border border-transparent",
  outline: "bg-transparent border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--hover)] focus:ring-[var(--focus-ring)]",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-sm",
  lg: "px-6 py-4 text-base",
};

export function Button({
  type = "button",
  isLoading = false,
  loadingText = "Đang xử lý...",
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  icon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
}
