import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import type { TourPackage } from "@/types";
import { formatPrice } from "@/utils/format";
import { cn } from "@/utils/cn";

// Visual-only: these slugs receive a "Best Seller" badge
const BEST_SELLER_SLUGS = new Set(["masai-mara-explorer", "classic-kenya-safari"]);

export default function PackageCard({ pkg, className }: { pkg: TourPackage; className?: string }) {
  const isBestSeller = BEST_SELLER_SLUGS.has(pkg.slug);

  return (
    <Link
      to={`/packages/${pkg.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-sand-200 bg-white shadow-soft",
        "transition-all duration-200 hover:-translate-y-1 hover:shadow-lift",
        className
      )}
    >
      {/* ── Image ── */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {isBestSeller && (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Best Seller
          </span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col p-5">
        {/* Row 1: destination + rating */}
        <div className="flex items-center justify-between gap-2">
          <span className="min-w-0 flex-1 truncate text-[11px] font-semibold uppercase tracking-[0.15em] text-secondary">
            {pkg.destinationName}
          </span>
          <span className="flex shrink-0 items-center gap-1 text-[13px] font-semibold text-ink">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            {pkg.rating.toFixed(1)}
          </span>
        </div>

        {/* Row 2: package name */}
        <h3 className="mt-2 line-clamp-2 font-display text-[18px] font-bold leading-snug text-primary">
          {pkg.name}
        </h3>

        {/* Row 3: short description — flex-1 so it fills space and pins divider to bottom */}
        <p className="mt-2 flex-1 line-clamp-2 text-sm leading-relaxed text-muted">
          {pkg.shortDescription}
        </p>

        {/* Divider */}
        <div className="mt-4 border-t border-sand-200" />

        {/* Row 4: inline price + View Details CTA */}
        <div className="mt-3 mb-1 flex items-center justify-between gap-3">
          <p className="flex items-baseline gap-1 text-[13px] text-muted">
            From
            <span className="font-display text-[19px] font-bold leading-none text-accent">
              {formatPrice(pkg.price)}
            </span>
          </p>
          <span className="flex shrink-0 items-center gap-1 rounded-full border border-secondary px-3 py-1 text-[12px] font-semibold text-secondary transition-colors duration-150 group-hover:bg-secondary group-hover:text-white">
            View Details <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
