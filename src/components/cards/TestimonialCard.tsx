import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-sand-200 bg-white p-6 shadow-soft">
      <Quote className="h-7 w-7 text-secondary/30" />
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink">"{t.quote}"</blockquote>
      <div className="mt-5 flex items-center gap-3 border-t border-sand-200 pt-4">
        <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover" loading="lazy" />
        <div>
          <figcaption className="text-sm font-semibold text-primary">{t.name}</figcaption>
          <p className="text-xs text-muted">{t.role} · {t.location}</p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
          ))}
        </div>
      </div>
    </figure>
  );
}
