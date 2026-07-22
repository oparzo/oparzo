import { ButtonHTMLAttributes } from "react";

// Shared button primitive. NOT yet adopted at any existing call site —
// 13 different hand-typed variations of "primary button" exist across
// the codebase today (different padding, different radius, same black/
// white intent). Consolidating those to this component means picking
// one visual answer among 13, which is a sighted design decision, not
// a code-safe one. This exists so that decision can be made once with
// real eyes on the rendered site, then rolled out deliberately —
// rather than 13 blind edits now.
//
// Default values below match the single most common existing pattern
// (rounded-xl, py-4, black/white) as a reasonable placeholder, not a
// final decision.

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
};

export default function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "rounded-xl py-4 px-6 transition disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    primary: "bg-[var(--gold)] text-[var(--ink)]",
    secondary: "border border-[var(--ink)] bg-transparent text-[var(--ink)]",
    ghost: "bg-transparent text-[var(--ink)] underline",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
