import { useMemo, useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import Container from "@/components/ui/Container";
import PackageCard from "@/components/cards/PackageCard";
import { packages as localPackages } from "@/data/packages";
import { destinations as localDestinations } from "@/data/destinations";
import { IMG } from "@/data/images";
import { cn } from "@/utils/cn";
import type { TripType } from "@/types";
import { fetchPackages, fetchDestinations } from "@/lib/api";
import { useSupabaseData } from "@/hooks/useSupabaseData";

// Location names as they appear in p.locations — ordered to match the search bar
const featuredDestinations = [
  "Masai Mara",
  "Amboseli",
  "Nairobi",
  "Lake Nakuru",
  "Samburu",
  "Lake Naivasha",
];

const TRIP_TYPES: TripType[] = ["Safari", "Beach", "Adventure", "Family", "Honeymoon", "Cultural", "Luxury"];

/** Resolves a destination slug from the URL to the location name used in p.locations */
function slugToLocationName(slug: string): string {
  const d = localDestinations.find((dest) => dest.slug === slug);
  if (!d) return "";
  return d.routeKeyword ?? d.name;
}

/** Capitalises the first letter so "safari" → "Safari" matches TripType */
function toTripType(raw: string): string {
  if (!raw) return "";
  const normalised = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
  return (TRIP_TYPES as string[]).includes(normalised) ? normalised : "";
}

const durationBands = [
  { label: "Any length", value: "" },
  { label: "4 days", value: "4" },
  { label: "5 days", value: "5" },
  { label: "6 days", value: "6" },
  { label: "7–8 days", value: "long" },
];

const sortOptions = [
  { label: "Most popular", value: "popular" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
  { label: "Highest rated", value: "rating" },
  { label: "Duration", value: "duration" },
];

const PER_PAGE = 9;

export default function PackagesPage() {
  const { data: packages }     = useSupabaseData(fetchPackages,     localPackages);
  const { data: destinations } = useSupabaseData(fetchDestinations, localDestinations);
  const [searchParams] = useSearchParams();

  const [destination, setDestination] = useState(
    () => slugToLocationName(searchParams.get("destination") ?? "")
  );
  const [experience, setExperience] = useState(
    () => toTripType(searchParams.get("experience") ?? "")
  );
  const [duration, setDuration] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(6000);
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Sync filter state whenever URL params change (e.g. back/forward navigation)
  useEffect(() => {
    setDestination(slugToLocationName(searchParams.get("destination") ?? ""));
    setExperience(toTripType(searchParams.get("experience") ?? ""));
  }, [searchParams]);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickAway = (e: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target as Node)
      ) {
        setFiltersOpen(false);
      }
    };
    if (filtersOpen) {
      document.addEventListener("mousedown", handleClickAway);
    }
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, [filtersOpen]);

  const filtered = useMemo(() => {
    let list = packages.filter((p) => {
      if (
        destination &&
        !p.locations.includes(destination) &&
        p.destinationName !== destination
      )
        return false;
      if (experience && p.type !== experience) return false;
      if (p.rating < minRating) return false;
      if (p.price > maxPrice) return false;
      if (duration === "4" && p.days !== 4) return false;
      if (duration === "5" && p.days !== 5) return false;
      if (duration === "6" && p.days !== 6) return false;
      if (duration === "long" && p.days < 7) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "duration":
          return a.days - b.days;
        default:
          return b.rating * b.reviews - a.rating * a.reviews;
      }
    });
    return list;
  }, [destination, experience, duration, minRating, maxPrice, sort]);

  useEffect(() => {
    setPage(1);
  }, [destination, experience, duration, minRating, maxPrice, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const hasActiveFilters =
    !!destination || !!experience || !!duration || minRating > 0 || maxPrice < 6000;

  const resetFilters = () => {
    setDestination("");
    setExperience("");
    setDuration("");
    setMinRating(0);
    setMaxPrice(6000);
    setSort("popular");
  };

  const filterPanelContent = (
    <div className="space-y-7">
      {/* Destination chips */}
      <div>
        <h4 className="field-label">Featured destination</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setDestination("")}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition",
              !destination
                ? "bg-primary text-white"
                : "bg-sand-200 text-primary hover:bg-sand-300"
            )}
          >
            All
          </button>
          {featuredDestinations.map((d) => (
            <button
              key={d}
              onClick={() => setDestination(d)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition",
                destination === d
                  ? "bg-primary text-white"
                  : "bg-sand-200 text-primary hover:bg-sand-300"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Experience / trip type */}
      <div>
        <h4 className="field-label">Experience type</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setExperience("")}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition",
              !experience
                ? "bg-primary text-white"
                : "bg-sand-200 text-primary hover:bg-sand-300"
            )}
          >
            All
          </button>
          {TRIP_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setExperience(t)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition",
                experience === t
                  ? "bg-primary text-white"
                  : "bg-sand-200 text-primary hover:bg-sand-300"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div>
        <h4 className="field-label">Duration</h4>
        <div className="space-y-1.5">
          {durationBands.map((d) => (
            <label
              key={d.value}
              className="flex cursor-pointer items-center gap-2 text-sm text-ink"
            >
              <input
                type="radio"
                name="duration"
                checked={duration === d.value}
                onChange={() => setDuration(d.value)}
                className="accent-secondary"
              />
              {d.label}
            </label>
          ))}
        </div>
      </div>

      {/* Max price */}
      <div>
        <h4 className="field-label">
          Max price:{" "}
          <span className="text-secondary">${maxPrice.toLocaleString()}</span>
        </h4>
        <input
          type="range"
          min={1500}
          max={6000}
          step={250}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-secondary"
        />
      </div>

      {/* Min rating */}
      <div>
        <h4 className="field-label">Minimum rating</h4>
        <div className="flex gap-2">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={cn(
                "rounded px-3 py-1.5 text-xs font-medium transition",
                minRating === r
                  ? "bg-secondary text-white"
                  : "bg-sand-200 text-primary hover:bg-sand-300"
              )}
            >
              {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={resetFilters}
        className="text-xs font-semibold uppercase tracking-wide text-secondary hover:text-secondary-dark"
      >
        Reset all filters
      </button>
    </div>
  );

  return (
    <Page>
      <SEO
        title="East Africa Safari Packages — Curated Wildlife Circuits"
        description="Expertly guided safari circuits across East Africa — Kenya, Uganda and Tanzania. Masai Mara, Amboseli, Bwindi, Serengeti and beyond. All private, all tailored to you."
        path="/packages"
      />

      {/* ── HERO — full-height, centered, matching design ── */}
      <section className="relative flex h-[540px] items-center justify-center overflow-hidden md:h-[614px]">
        <div className="absolute inset-0">
          <img
            src={IMG.savanna}
            alt="East Africa safari packages"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/60" />
        </div>
        <Container className="relative z-10">
          <div className="mx-auto max-w-2xl text-center text-white">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent"
            >
              Curated Journeys
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Safari Packages
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Curated wildlife circuits across East Africa — Kenya, Uganda and Tanzania.
              Every journey private, flexible and ready to tailor to you.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* ── SIGNATURE COLLECTION PROMO ── */}
      <section className="bg-primary py-16 lg:py-24">
        <Container>
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
            {/* Image */}
            <div className="group relative w-full overflow-hidden rounded-xl shadow-lift lg:w-1/2">
              <img
                src={IMG.acaciaSunset}
                alt="Signature Collection — private conservancy safari"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 pointer-events-none" />
            </div>
            {/* Content */}
            <div className="w-full space-y-6 lg:w-1/2">
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  Premium Collection
                </span>
              </span>
              <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">
                Explore Our Signature Collection
              </h2>
              <p className="text-base leading-relaxed text-white/70">
                For the discerning traveller, our Signature Collection offers
                unprecedented access to East Africa's most exclusive private
                conservancies. These journeys combine off-road drives, night
                safaris, walking experiences and direct community benefit —
                experiences that are simply impossible inside the national parks.
              </p>
              <Link
                to="/signature"
                className="inline-flex items-center gap-2 rounded border-2 border-accent px-8 py-3 text-sm font-bold uppercase tracking-wide text-accent transition-all duration-300 hover:bg-accent hover:text-primary"
              >
                Explore Signature Packages <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FILTER + GRID (full-width, compact top-bar filter) ── */}
      <section className="bg-sand py-12 lg:py-16">
        <Container>
          {/* Top filter bar */}
          <div className="mb-6 flex items-center justify-between border-b border-sand-200 pb-4">
            <h3 className="font-display text-xl font-bold text-primary">
              Available Expeditions
            </h3>

            <div className="relative" ref={filterRef}>
              {/* Filter toggle button */}
              <button
                onClick={() => setFiltersOpen((o) => !o)}
                className={cn(
                  "inline-flex items-center gap-2 rounded border px-4 py-2 text-sm font-medium transition",
                  hasActiveFilters
                    ? "border-secondary bg-secondary/5 text-secondary"
                    : "border-sand-300 bg-white text-primary hover:bg-sand-100"
                )}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[9px] font-bold text-white leading-none">
                    ✓
                  </span>
                )}
              </button>

              {/* Desktop dropdown panel */}
              {filtersOpen && (
                <div className="absolute right-0 z-40 mt-2 hidden w-80 rounded-xl border border-sand-200 bg-white p-6 shadow-lift lg:block">
                  <div className="mb-5 flex items-center justify-between">
                    <h4 className="font-display text-base font-bold text-primary">
                      Refine Search
                    </h4>
                    <button
                      onClick={() => setFiltersOpen(false)}
                      aria-label="Close filters"
                    >
                      <X className="h-4 w-4 text-muted" />
                    </button>
                  </div>
                  {filterPanelContent}
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="mt-6 w-full rounded bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600"
                  >
                    Show {filtered.length}{" "}
                    {filtered.length === 1 ? "result" : "results"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Results count + sort */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted">
              Showing{" "}
              <strong className="text-primary">{visible.length}</strong>{" "}
              {visible.length === 1 ? "package" : "packages"}
              {destination && (
                <>
                  {" "}including{" "}
                  <strong className="text-primary">{destination}</strong>
                </>
              )}
              {experience && (
                <>
                  {" "}·{" "}
                  <strong className="text-primary">{experience}</strong>
                </>
              )}
            </p>
            <div className="flex items-center gap-3">
              {/* Mobile-only filter button */}
              <button
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded border border-sand-300 bg-white px-3 py-2 text-sm font-medium text-primary lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded border border-sand-300 bg-white px-3 py-2 text-sm text-ink outline-none"
                aria-label="Sort packages"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Package grid — full width, 3 columns */}
          {visible.length > 0 ? (
            <div
              key={page}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visible.map((p, i) => (
                <motion.div
                  key={p.id}
                  className="h-full"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.07,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                >
                  <PackageCard pkg={p} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-sand-200 bg-white p-12 text-center">
              <p className="font-display text-xl font-bold text-primary">
                No packages match your filters
              </p>
              <p className="mt-2 text-sm text-muted">
                Try widening your price range or clearing a filter.
              </p>
              <button
                onClick={resetFilters}
                className="mt-5 rounded bg-primary px-5 py-2.5 text-sm font-semibold text-white"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  setPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
                disabled={page === 1}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted transition hover:text-secondary disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPage(i + 1);
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                  className={cn(
                    "h-10 w-10 rounded text-sm font-semibold transition",
                    page === i + 1
                      ? "bg-primary text-white"
                      : "bg-white text-primary hover:bg-sand-200"
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => {
                  setPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted transition hover:text-secondary disabled:pointer-events-none disabled:opacity-40"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div
            className="absolute inset-0 bg-primary/50"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm overflow-y-auto bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-primary">
                Filters
              </h3>
              <button
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
              >
                <X className="h-6 w-6 text-primary" />
              </button>
            </div>
            {filterPanelContent}
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-8 w-full rounded bg-primary py-3 text-sm font-semibold text-white"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </Page>
  );
}
