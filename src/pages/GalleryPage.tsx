import { useState, useMemo } from "react";
import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import Lightbox from "@/components/common/Lightbox";
import { Stagger, StaggerItem } from "@/components/common/Reveal";
import CTABanner from "@/components/common/CTABanner";
import { galleryImages, galleryCategories } from "@/data/gallery";
import { IMG } from "@/data/images";
import { cn } from "@/utils/cn";

export default function GalleryPage() {
  const [category, setCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (category === "All" ? galleryImages : galleryImages.filter((g) => g.category === category)),
    [category]
  );

  function handleCategoryChange(next: string) {
    setCategory(next);
    setLightboxIndex(null);
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
        image={IMG.elephants}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          {/* Category filter */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {galleryCategories.map((c) => (
              <button
                key={c}
                onClick={() => handleCategoryChange(c)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  category === c ? "bg-primary text-white" : "bg-sand-200 text-primary hover:bg-sand-300"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-xl font-semibold text-primary">No images found</p>
              <p className="mt-2 text-sm text-gray-500">No photos yet for this category.</p>
              <button
                onClick={() => handleCategoryChange("All")}
                className="mt-6 rounded-full bg-primary px-6 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
              >
                View all photos
              </button>
            </div>
          ) : (
            /*
             * key={category} forces Stagger to fully unmount + remount whenever the
             * category changes. Without this, Stagger's whileInView (viewport once:true)
             * fires only on the very first scroll-into-view and never re-fires, so
             * newly rendered StaggerItem children remain stuck at their initial
             * hidden state (opacity:0) after a filter change — causing the blank gallery.
             */
            <Stagger key={category} className="columns-2 gap-4 sm:columns-3 lg:columns-4" stagger={0.05}>
              {filtered.map((g, i) => (
                <StaggerItem key={g.id} className="mb-4 break-inside-avoid">
                  <button onClick={() => setLightboxIndex(i)} className="group block w-full overflow-hidden rounded-lg">
                    <div className="relative">
                      <img src={g.src} alt={g.caption} loading="lazy" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/80 to-transparent opacity-0 transition group-hover:opacity-100">
                        <p className="p-4 text-left text-sm font-medium text-white">{g.caption}</p>
                      </div>
                    </div>
                  </button>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </section>

      <Lightbox images={filtered} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />

      <CTABanner image={IMG.flamingos} />
    </Page>
  );
}
