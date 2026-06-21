/**
 * Gallery data sourced entirely from the project's existing package and destination
 * image assets (Cloudinary CDN). No external image sources used.
 *
 * The `galleryImages` export is kept for backwards-compat with any existing
 * references. The real gallery UI uses `buildTabImages()` in GalleryPage.tsx
 * which derives images dynamically from destinationImageMap + destinations.
 */
import type { GalleryImage } from "@/types";
import { destinationImageMap } from "./destinationImages";
import { destinations } from "./destinations";

function unique(arr: string[]): string[] {
  const seen = new Set<string>();
  return arr.filter((s) => s && !seen.has(s) && seen.add(s));
}

// Derive the flat gallery list from all destination image maps
function buildFlatGallery(): GalleryImage[] {
  const result: GalleryImage[] = [];
  let counter = 0;

  for (const dest of destinations) {
    const mapImgs = destinationImageMap[dest.slug] ?? [];
    const srcImgs = mapImgs.length > 0
      ? mapImgs
      : unique([dest.image, ...dest.gallery]);

    for (const src of srcImgs) {
      counter++;
      result.push({
        id: `g${counter}`,
        src,
        category: dest.name,
        caption: `${dest.name} — wildlife & safari`,
      });
    }
  }

  return result;
}

export const galleryImages: GalleryImage[] = buildFlatGallery();

// Category list derived from destination names
export const galleryCategories = [
  "All",
  ...Array.from(new Set(galleryImages.map((g) => g.category))),
];
