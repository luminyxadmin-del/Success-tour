import { cn } from "@/utils/cn";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({ eyebrow, title, subtitle, align = "left", light, className }: Props) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className={cn("font-display text-3xl font-bold leading-tight sm:text-4xl", light ? "text-white" : "text-primary")}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-base leading-relaxed", light ? "text-white/70" : "text-muted")}>{subtitle}</p>
      )}
    </div>
  );
}
