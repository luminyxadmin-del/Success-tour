import { packages } from "./packages";
import { destinations } from "./destinations";

function unique(arr: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const img of arr) {
    if (img && !seen.has(img)) {
      seen.add(img);
      result.push(img);
    }
  }
  return result;
}

/**
 * Finds packages that explicitly visit `keyword` as a non-departure stop,
 * sorted so packages that visit this destination earliest appear first
 * (single-destination packages → their images are the most contextually accurate).
 */
function buildImagesForKeyword(keyword: string): string[] {
  const kw = keyword.toLowerCase();

  const matched = packages
    .filter((pkg) =>
      pkg.locations
        .slice(1) // index 0 is always the departure city (Nairobi)
        .some((loc) => loc.toLowerCase().includes(kw))
    )
    .sort((a, b) => {
      const idxA = a.locations.slice(1).findIndex((loc) => loc.toLowerCase().includes(kw));
      const idxB = b.locations.slice(1).findIndex((loc) => loc.toLowerCase().includes(kw));
      return idxA - idxB;
    });

  // Hero images first (most curated), then gallery fill-ins
  return unique([
    ...matched.map((pkg) => pkg.image),
    ...matched.flatMap((pkg) => pkg.gallery),
  ]);
}

/**
 * Destination slug → ordered array of images pulled from matching packages.
 * Built once at module load; empty array means no packages visit that destination
 * (caller should fall back to the destination's own image/gallery fields).
 */
export const destinationImageMap: Readonly<Record<string, string[]>> = Object.fromEntries(
  destinations.map((dest) => [
    dest.slug,
    buildImagesForKeyword(dest.routeKeyword ?? dest.name),
  ])
);

/** Best hero image for a destination; returns `fallback` when no packages match. */
export function getDestinationHero(slug: string, fallback: string): string {
  return destinationImageMap[slug]?.[0] ?? fallback;
}

/**
 * Gallery images for a destination (skips the hero at index 0).
 * Returns `fallback` slice when no packages match or only one image exists.
 */
export function getDestinationGallery(
  slug: string,
  fallback: string[],
  limit = 6
): string[] {
  const imgs = destinationImageMap[slug];
  if (!imgs || imgs.length <= 1) return fallback.slice(0, limit);
  return imgs.slice(1, limit + 1);
}
