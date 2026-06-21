import { useParams, Link } from "react-router-dom";
import { MapPin, CalendarRange, Sparkles, Check, ArrowRight } from "lucide-react";
import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/common/Reveal";
import PackageCard from "@/components/cards/PackageCard";
import CTABanner from "@/components/common/CTABanner";
import NotFoundPage from "./NotFoundPage";
import { getDestination, destinations } from "@/data/destinations";
import { getPackagesByRouteKeyword, isDestinationInRoutes } from "@/data/packages";

export default function DestinationDetailsPage() {
  const { slug } = useParams();
  const destination = slug ? getDestination(slug) : undefined;

  if (!destination) return <NotFoundPage />;

  const routeKeyword = destination.routeKeyword ?? destination.name;
  const related = getPackagesByRouteKeyword(routeKeyword);
  const others = destinations
    .filter((d) => d.id !== destination.id && isDestinationInRoutes(d.routeKeyword ?? d.name))
    .slice(0, 4);

  return (
    <Page>
      <SEO
        title={`${destination.name} Safari & Travel Guide`}
        description={destination.description}
        path={`/destinations/${destination.slug}`}
        image={destination.image}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: destination.name,
          description: destination.description,
          image: destination.image,
        }}
      />
      <PageHero
        eyebrow={destination.region}
        title={destination.name}
        subtitle={destination.tagline}
        image={destination.image}
        size="lg"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Destinations", to: "/destinations" },
          { label: destination.name },
        ]}
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main */}
            <div className="lg:col-span-2">
              <p className="eyebrow mb-3">About the destination</p>
              <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">
                Discover {destination.name}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">{destination.longDescription}</p>

              <div className="mt-10">
                <h3 className="flex items-center gap-2 font-display text-xl font-bold text-primary">
                  <Sparkles className="h-5 w-5 text-secondary" /> Things to do
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {destination.activities.map((a) => (
                    <div key={a} className="flex items-start gap-2.5 rounded-lg border border-sand-200 bg-sand p-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                      <span className="text-sm text-ink">{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h3 className="font-display text-xl font-bold text-primary">Highlights</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {destination.highlights.map((h) => (
                    <li key={h} className="rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary-dark">{h}</li>
                  ))}
                </ul>
              </div>

              {/* Gallery */}
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {destination.gallery.map((g, i) => (
                  <img key={i} src={g} alt={`${destination.name} ${i + 1}`} loading="lazy"
                    className="aspect-[4/3] w-full rounded-lg object-cover" />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">
                <div className="rounded-lg border border-sand-200 bg-sand p-6 shadow-soft">
                  <h3 className="font-display text-lg font-bold text-primary">Quick facts</h3>
                  <dl className="mt-4 space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                      <div><dt className="font-semibold text-primary">Region</dt><dd className="text-muted">{destination.region}</dd></div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CalendarRange className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                      <div><dt className="font-semibold text-primary">Best time to visit</dt><dd className="text-muted">{destination.bestTime}</dd></div>
                    </div>
                  </dl>
                </div>

                <div className="rounded-lg border border-sand-200 bg-white p-6">
                  <h3 className="font-display text-lg font-bold text-primary">Other destinations</h3>
                  <ul className="mt-4 space-y-3">
                    {others.map((o) => (
                      <li key={o.id}>
                        <Link to={`/destinations/${o.slug}`} className="group flex items-center gap-3">
                          <img src={o.image} alt={o.name} className="h-12 w-12 rounded object-cover" loading="lazy" />
                          <span>
                            <span className="block text-sm font-semibold text-primary group-hover:text-secondary">{o.name}</span>
                            <span className="block text-xs text-muted">{o.region}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related packages */}
      {related.length > 0 && (
        <section className="bg-sand py-20 lg:py-28">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Plan your visit" title="Related Packages" />
              <Link to="/packages" className="link-underline hidden text-sm font-semibold text-secondary sm:inline-flex sm:items-center sm:gap-1.5">
                All packages <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <PackageCard key={p.id} pkg={p} />)}
            </div>
          </Container>
        </section>
      )}

      <CTABanner image={destination.gallery[0] ?? destination.image} />
    </Page>
  );
}
