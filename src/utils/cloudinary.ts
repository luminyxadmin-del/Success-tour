/**
 * Inserts Cloudinary transformation parameters into a Cloudinary image URL.
 *
 * Transformations applied:
 *   w_{width}  — resize to at most {width}px wide
 *   f_auto     — serve WebP / AVIF to browsers that support them; JPEG fallback
 *   q_auto     — let Cloudinary's ML pick the best quality/size tradeoff
 *   c_fill     — crop-fill so the resized image fully covers the requested area
 *
 * Non-Cloudinary URLs and already-transformed URLs pass through unchanged.
 */
export function cloudinaryOptimize(url: string, width = 800): string {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  if (url.includes("/upload/w_")) return url; // already transformed, avoid double-transform
  return url.replace("/upload/", `/upload/w_${width},f_auto,q_auto,c_fill/`);
}
