import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn } from "lucide-react";
import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import Lightbox from "@/components/common/Lightbox";
import CTABanner from "@/components/common/CTABanner";
import { destinationImageMap } from "@/data/destinationImages";
import { destinations } from "@/data/destinations";
import type { GalleryImage } from "@/types";
import { cn } from "@/utils/cn";

// ─── helpers ──────────────────────────────────────────────────────────────────

function unique(arr: string[]): string[] {
  const seen = new Set<string>();
  return arr.filter((s) => s && !seen.has(s) && seen.add(s));
}

function ensureMinImages(imgs: string[], min = 6): string[] {
  if (imgs.length === 0) return [];
  const out = [...imgs];
  while (out.length < min) out.push(...imgs);
  return out;
}

function captionFromUrl(url: string): string {
  try {
    const raw = url.split("/").pop()?.split("?")[0] ?? "";
    const clean = raw
      .replace(/_[a-z0-9]{5,}\.(jpg|webp|png|jpeg)$/i, "")
      .replace(/\.(jpg|webp|png|jpeg)$/i, "");
    return (
      clean
        .split("-")
        .slice(0, 6)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ") || "Kenya safari"
    );
  } catch {
    return "Kenya safari";
  }
}

function buildTabImages(slug: string): GalleryImage[] {
  const dest = destinations.find((d) => d.slug === slug);
  const mapImgs = destinationImageMap[slug] ?? [];
  const base =
    mapImgs.length > 0
      ? mapImgs
      : dest
      ? unique([dest.image, ...dest.gallery])
      : [];
  return ensureMinImages(unique(base), 6).map((src, i) => ({
    id: `${slug}-${i}`,
    src,
    category: dest?.name ?? slug,
    caption: captionFromUrl(src),
  }));
}

// ─── Cloudinary URL optimizer ─────────────────────────────────────────────────
// Inserts w_{width},f_auto,q_auto,c_fill into Cloudinary URLs.
// f_auto → WebP for Chrome/Edge/Firefox, AVIF where supported, JPEG fallback.
// q_auto → Cloudinary picks the best quality/size tradeoff automatically.
// c_fill → crops to fill the requested dimensions while preserving aspect ratio.
// Non-Cloudinary URLs (or already-transformed ones) pass through unchanged.
function cloudinaryOptimize(url: string, width = 600): string {
  if (!url.includes("res.cloudinary.com")) return url;
  if (url.includes("/upload/w_")) return url; // already transformed
  return url.replace("/upload/", `/upload/w_${width},f_auto,q_auto,c_fill/`);
}

// ─── tab / pagination config ──────────────────────────────────────────────────

interface Tab { slug: string; label: string }

const TABS: Tab[] = [
  { slug: "maasai-mara",   label: "Maasai Mara"   },
  { slug: "amboseli",      label: "Amboseli"       },
  { slug: "samburu",       label: "Samburu"        },
  { slug: "lake-nakuru",   label: "Lake Nakuru"    },
  { slug: "lake-naivasha", label: "Lake Naivasha"  },
  { slug: "nairobi",       label: "Nairobi"        },
];

const TAB_IMAGES: Record<string, GalleryImage[]> = Object.fromEntries(
  TABS.map((t) => [t.slug, buildTabImages(t.slug)])
);

const HERO_IMAGE =
  "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781979141/group-young-lions-hill-national-park-kenya-tanzania-masai-mara-serengeti_1_qhxfaa.webp";

const PAGE_SIZE  = 15;
const IMG_HEIGHT = 220; // px — uniform card height

// ─── component ────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [activeSlug, setActiveSlug]       = useState<string>(TABS[0].slug);
  const [currentPage, setCurrentPage]     = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  // Tracks which image ids have finished loading (for shimmer → image reveal)
  const [loadedIds, setLoadedIds]         = useState<Set<string>>(new Set());

  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  const allImages  = useMemo(() => TAB_IMAGES[activeSlug] ?? [], [activeSlug]);
  const totalPages = Math.max(1, Math.ceil(allImages.length / PAGE_SIZE));
  const pageImages = useMemo(
    () => allImages.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [allImages, currentPage]
  );

  // Reset loaded set whenever tab or page changes so shimmer shows fresh
  useEffect(() => {
    setLoadedIds(new Set());
  }, [activeSlug, currentPage]);

  // Inject <link rel="preload"> for the first 6 images of the active tab.
  // URLs must match exactly what the <img> src will be (optimized Cloudinary URL)
  // so the browser can serve the preloaded asset from cache without a second fetch.
  useEffect(() => {
    const added: HTMLLinkElement[] = [];
    allImages.slice(0, 6).forEach((img) => {
      const link = document.createElement("link");
      link.rel  = "preload";
      link.as   = "image";
      link.href = cloudinaryOptimize(img.src, 600);
      link.setAttribute("data-gallery-preload", "true");
      document.head.appendChild(link);
      added.push(link);
    });
    return () => {
      added.forEach((el) => el.remove());
    };
  }, [allImages]);

  function handleTabChange(slug: string) {
    if (slug === activeSlug) return;
    setLightboxIndex(null);
    setActiveSlug(slug);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    if (page === currentPage) return;
    setCurrentPage(page);
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleImageLoad(id: string) {
    setLoadedIds((prev) => new Set([...prev, id]));
  }

  return (
    <Page>
      <SEO
        title="Photo Gallery"
        description="A visual journey through East Africa with Luminyx Travel — wildlife, landscapes, beaches, lodges and culture captured across our safaris in Kenya, Uganda and Tanzania."
        path="/gallery"
      />

      <PageHero
        eyebrow="In pictures"
        title="Gallery"
        subtitle="Real moments from across our journeys — the wildlife, the landscapes and the magic of East Africa."
        image={HERO_IMAGE}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>

          {/* ── Tab bar ─────────────────────────────────────────────────── */}
          <div className="mb-12 flex flex-wrap justify-center gap-2.5">
            {TABS.map((tab) => {
              const isActive = activeSlug === tab.slug;
              return (
                <button
                  key={tab.slug}
                  onClick={() => handleTabChange(tab.slug)}
                  className={cn(
                    "rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    isActive
                      ? "border-accent bg-accent text-primary shadow-md"
                      : "border-sand-200 bg-white text-primary hover:border-accent/50 hover:text-accent"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Scroll target — sits just above the status line */}
          <div ref={scrollAnchorRef} />

          {/* ── Status line ─────────────────────────────────────────────── */}
          <p className="mb-4 text-sm font-medium text-muted">
            Showing {Math.min(PAGE_SIZE, allImages.length - (currentPage - 1) * PAGE_SIZE)} photos
          </p>

          {/* ── Uniform grid ────────────────────────────────────────────── */}
          {/*
           * Simple CSS Grid — no span calculation, no grid-auto-rows.
           * All cards are a fixed 220px height.
           * align-items: start prevents the grid from stretching short rows.
           *
           * Loading sequence per card:
           *   1. .gallery-shimmer plays the animated gradient (image opacity 0)
           *   2. onLoad fires → id added to loadedIds → opacity transitions to 1
           *   3. shimmer class removed once loaded
           */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeSlug}-p${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                style={{ gap: "12px", alignItems: "start" }}
              >
                {pageImages.map((img, i) => {
                  const loaded = loadedIds.has(img.id);
                  return (
                    <div
                      key={img.id}
                      className={cn("gallery-item", !loaded && "gallery-shimmer")}
                      style={{ borderRadius: "12px", minHeight: `${IMG_HEIGHT}px` }}
                    >
                      <button
                        onClick={() => setLightboxIndex((currentPage - 1) * PAGE_SIZE + i)}
                        aria-label={`View ${img.caption}`}
                        className="group relative block w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        style={{
                          padding: 0,
                          border: 0,
                          background: "none",
                          borderRadius: "12px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={cloudinaryOptimize(img.src, 600)}
                          alt={img.caption}
                          loading={i < 3 ? "eager" : "lazy"}
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore — fetchPriority is valid HTML but missing from older @types/react
                          fetchPriority={i < 3 ? "high" : "auto"}
                          onLoad={() => handleImageLoad(img.id)}
                          className="transition-transform duration-700 group-hover:scale-[1.04]"
                          style={{
                            width: "100%",
                            height: `${IMG_HEIGHT}px`,
                            display: "block",
                            objectFit: "cover",
                            borderRadius: "12px",
                            backgroundColor: "#e0d9d0",
                            opacity: loaded ? 1 : 0,
                            transition: "opacity 0.3s ease",
                          }}
                        />

                        {/* Hover overlay — only visible once image is loaded */}
                        {loaded && (
                          <div
                            className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            style={{ borderRadius: "12px" }}
                          >
                            <ZoomIn className="h-9 w-9 text-white drop-shadow" />
                            <p className="max-w-[80%] text-center text-xs font-medium leading-snug text-white/85 drop-shadow">
                              {img.caption}
                            </p>
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Pagination ──────────────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                  className={cn(
                    "h-10 w-10 rounded-full border text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    page === currentPage
                      ? "border-accent bg-accent text-white shadow-md"
                      : "border-gray-200 bg-white text-primary hover:border-accent/50 hover:text-accent"
                  )}
                >
                  {page}
                </button>
              ))}
            </div>
          )}

        </Container>
      </section>

      {/* Lightbox uses the full tab image list so arrows navigate across all pages */}
      <Lightbox
        images={allImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />

      <CTABanner image={HERO_IMAGE} />
    </Page>
  );
}
