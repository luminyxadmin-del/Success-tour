import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export default function Badge({ children, className, tone = "primary" }: { children: ReactNode; className?: string; tone?: "primary" | "accent" | "secondary" | "white" }) {
  const tones = {
    primary: "bg-primary text-white",
    accent: "bg-accent text-primary",
    secondary: "bg-secondary text-white",
    white: "bg-white/90 text-primary backdrop-blur",
  };
  return (
    <span className={cn("inline-flex items-center rounded px-3 py-1 text-[11px] font-semibold uppercase tracking-wider", tones[tone], className)}>
      {children}
    </span>
  );
}
