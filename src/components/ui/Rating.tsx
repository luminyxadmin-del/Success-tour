import { Star } from "lucide-react";
import { cn } from "@/utils/cn";

export default function Rating({ value, reviews, className }: { value: number; reviews?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-sm font-semibold text-primary", className)}>
      <Star className="h-4 w-4 fill-accent text-accent" />
      {value.toFixed(1)}
      {reviews !== undefined && <span className="font-normal text-muted">({reviews})</span>}
    </span>
  );
}
