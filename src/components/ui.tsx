import { Sentiment } from "@/lib/types";
import clsx from "clsx";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={clsx("bg-surface border border-border rounded-2xl", className)}>
      {children}
    </div>
  );
}

export function SentimentPill({ sentiment }: { sentiment: Sentiment }) {
  const map = {
    POSITIVE: { bg: "bg-positive-soft", text: "text-positive", label: "Positive" },
    NEUTRAL: { bg: "bg-amber-soft", text: "text-amber", label: "Neutral" },
    NEGATIVE: { bg: "bg-negative-soft", text: "text-negative", label: "Negative" },
  } as const;
  const s = map[sentiment];
  return (
    <span className={clsx("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium font-mono-data", s.bg, s.text)}>
      {s.label}
    </span>
  );
}

export function PriorityPill({ priority }: { priority: "Low" | "Medium" | "High" }) {
  const map = {
    Low: "bg-bg text-muted border border-border",
    Medium: "bg-signal-soft text-signal-dark",
    High: "bg-negative-soft text-negative",
  } as const;
  return (
    <span className={clsx("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium", map[priority])}>
      {priority}
    </span>
  );
}

export function ThemeTag({ name, color }: { name: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
      style={{ borderColor: color + "55", color, background: color + "12" }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      {name}
    </span>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-ink text-white hover:bg-signal-dark",
    secondary: "bg-surface border border-border text-ink hover:border-ink",
    ghost: "text-ink-soft hover:bg-signal-soft hover:text-signal-dark",
  };
  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
