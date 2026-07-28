/**
 * Single source of truth for prerendered routes + sitemap generation.
 *
 * This module is bundled by scripts/prerender.mjs (via esbuild) and imported in
 * Node, so it must stay free of browser-only APIs. It imports the same data
 * modules the app uses, which keeps detail-page URLs in sync automatically.
 */
import { destinations } from "@/data/destinations";
import { packages } from "@/data/packages";
import { blogs } from "@/data/blogs";
import { generalFaqs } from "@/data/faqs";
import { signatureFlagships } from "@/data/signature";
import {
  SITE_URL,
  DEFAULT_IMAGE,
  buildTitle,
  websiteSchema,
  siteNavigationSchema,
  organizationSchema,
} from "@/seo/schemas";

export { SITE_URL, buildTitle, websiteSchema, siteNavigationSchema };

export interface PrerenderLink {
  label: string;
  href: string;
}

export interface PrerenderRoute {
  /** URL path, always starting with "/" and never ending with one (except root). */
  path: string;
  /** Raw title — the shared suffix is appended by buildTitle(). */
  title: string;
  description: string;
  /** Must match the <h1> the React page renders. */
  h1: string;
  /** Must match the intro copy the React page renders. */
  intro: string;
  image: string;
  type: "website" | "article";
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: string;
  /** ISO date (YYYY-MM-DD). Falls back to the build date when omitted. */
  lastmod?: string;
  /** Extra crawlable links rendered into the static shell. */
  links?: PrerenderLink[];
  structuredData?: Record<string, unknown>;
}

/** Primary navigation — emitted into every static shell for crawlable internal linking. */
export const primaryNav: PrerenderLink[] = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Safari Packages", href: "/packages" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const staticRoutes: PrerenderRoute[] = [
  {
    path: "/",
    title: "Luxury East Africa Safaris & Tailor-Made Tours",
    description:
      "Luminyx Travel crafts bespoke luxury safaris, beach escapes and cultural journeys across East Africa — Kenya, Uganda and Tanzania. Maasai Mara, Amboseli, Bwindi and beyond. Plan your dream trip today.",
    h1: "East Africa, unforgettably yours.",
    intro:
      "From the thunder of the Great Migration to the hush of the Indian Ocean at dawn — we design private, luxurious safaris tailored entirely to you.",
    image: DEFAULT_IMAGE,
    type: "website",
    changefreq: "weekly",
    priority: "1.0",
    structuredData: organizationSchema,
  },
  {
    path: "/destinations",
    title: "East Africa Destinations",
    description:
      "Explore East Africa's iconic destinations with Luminyx Travel — Maasai Mara, Amboseli, Bwindi, Serengeti and beyond. Find activities, best times to visit and tailored packages.",
    h1: "Destinations",
    intro:
      "From the legendary Maasai Mara to the gorilla forests of Bwindi — discover the places that make East Africa extraordinary.",
    image: DEFAULT_IMAGE,
    type: "website",
    changefreq: "weekly",
    priority: "0.9",
    links: destinations.map((d) => ({
      label: `${d.name} — ${d.tagline}`,
      href: `/destinations/${d.slug}`,
    })),
  },
  {
    path: "/packages",
    title: "East Africa Safari Packages — Curated Wildlife Circuits",
    description:
      "Expertly guided safari circuits across East Africa — Kenya, Uganda and Tanzania. Masai Mara, Amboseli, Bwindi, Serengeti and beyond. All private, all tailored to you.",
    h1: "Safari Packages",
    intro:
      "Curated wildlife circuits across East Africa — Kenya, Uganda and Tanzania. Every journey private, flexible and ready to tailor to you.",
    image: DEFAULT_IMAGE,
    type: "website",
    changefreq: "weekly",
    priority: "0.9",
    links: packages.map((p) => ({
      label: p.name,
      href: `/packages/${p.slug}`,
    })),
  },
  {
    path: "/services",
    title: "Our Services",
    description:
      "Full-service East Africa travel across Kenya, Uganda and Tanzania: safari tours, hotel & lodge booking, airport transfers, visa assistance, group tours, honeymoon packages and corporate travel — all handled by Luminyx Travel.",
    h1: "Our Services",
    intro:
      "Everything you need for a seamless East Africa journey — Kenya, Uganda or Tanzania — handled end to end by people who care about the detail.",
    image: DEFAULT_IMAGE,
    type: "website",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/about",
    title: "About Us",
    description:
      "Meet Luminyx Travel — a team of East Africa travel specialists crafting bespoke, responsible safaris across Kenya, Uganda and Tanzania since 2008. Discover our story, mission, values and people.",
    h1: "Experience Africa with Confidence.",
    intro:
      "A team of East Africa travel specialists crafting bespoke, responsible safaris across Kenya, Uganda and Tanzania since 2008.",
    image: DEFAULT_IMAGE,
    type: "website",
    changefreq: "monthly",
    priority: "0.7",
    structuredData: organizationSchema,
  },
  {
    path: "/contact",
    title: "Contact Us",
    description:
      "Get in touch with Luminyx Travel. Call, email, WhatsApp or visit our office — our East Africa travel specialists are ready to plan your perfect journey.",
    h1: "Contact Us",
    intro:
      "Call, email, WhatsApp or visit our office — our East Africa travel specialists are ready to plan your perfect journey.",
    image: DEFAULT_IMAGE,
    type: "website",
    changefreq: "monthly",
    priority: "0.7",
    structuredData: organizationSchema,
  },
  {
    path: "/gallery",
    title: "Photo Gallery",
    description:
      "A visual journey through East Africa with Luminyx Travel — wildlife, landscapes, beaches, lodges and culture captured across our safaris in Kenya, Uganda and Tanzania.",
    h1: "Gallery",
    intro:
      "Real moments from across our journeys — the wildlife, the landscapes and the magic of East Africa.",
    image: DEFAULT_IMAGE,
    type: "website",
    changefreq: "monthly",
    priority: "0.6",
  },
  {
    path: "/blog",
    title: "Travel Blog & East Africa Safari Guides",
    description:
      "Expert East Africa travel tips, safari guides, wildlife stories and itinerary inspiration from the Luminyx Travel team. Plan smarter and travel deeper.",
    h1: "The Blog",
    intro:
      "Guides, tips and tales from the field to inspire and inform your East African adventure.",
    image: DEFAULT_IMAGE,
    type: "website",
    changefreq: "weekly",
    priority: "0.7",
    links: blogs.map((b) => ({ label: b.title, href: `/blog/${b.slug}` })),
  },
  {
    path: "/signature",
    title: "Signature Collection — Four Private Conservancy Journeys",
    description:
      "Four conservancy-led journeys where the wild is private and the wilderness is yours alone. Off-road drives, night safaris, walking experiences and direct community benefit — impossible in the national parks.",
    h1: "Four conservancy-led journeys",
    intro:
      "Where the wild is private and the wilderness is yours alone — off-road drives, night safaris and walking experiences impossible in the national parks.",
    image: DEFAULT_IMAGE,
    type: "website",
    changefreq: "monthly",
    priority: "0.8",
    links: signatureFlagships.map((s) => ({
      label: `${s.name} — ${s.tagline}`,
      href: `/signature/${s.slug}`,
    })),
  },
  {
    path: "/faq",
    title: "Frequently Asked Questions",
    description:
      "Answers to common questions about travelling in East Africa with Luminyx Travel — visas, health, safety, best times to visit, booking, packing and more.",
    h1: "FAQ",
    intro:
      "Everything you might want to know before you travel. Can't find your answer? Just ask us.",
    image: DEFAULT_IMAGE,
    type: "website",
    changefreq: "monthly",
    priority: "0.5",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: generalFaqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  },
];

const signatureRoutes: PrerenderRoute[] = signatureFlagships.map((s) => ({
  path: `/signature/${s.slug}`,
  title: `${s.name} — Signature Collection`,
  description: s.tagline,
  h1: s.name,
  intro: s.tagline,
  image: s.image,
  type: "article",
  changefreq: "monthly",
  priority: "0.7",
}));

const destinationRoutes: PrerenderRoute[] = destinations.map((d) => ({
  path: `/destinations/${d.slug}`,
  title: `${d.name} Safari & Travel Guide`,
  description: d.description,
  h1: d.name,
  intro: d.tagline,
  image: d.image,
  type: "website",
  changefreq: "monthly",
  priority: "0.7",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: d.name,
    description: d.description,
    image: d.image,
    url: `${SITE_URL}/destinations/${d.slug}`,
  },
}));

const packageRoutes: PrerenderRoute[] = packages.map((p) => ({
  path: `/packages/${p.slug}`,
  title: p.name,
  description: p.shortDescription,
  h1: p.name,
  intro: p.shortDescription,
  image: p.image,
  type: "article",
  changefreq: "monthly",
  priority: "0.6",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.shortDescription,
    image: p.image,
    url: `${SITE_URL}/packages/${p.slug}`,
  },
}));

const blogRoutes: PrerenderRoute[] = blogs.map((b) => ({
  path: `/blog/${b.slug}`,
  title: b.title,
  description: b.description,
  h1: b.title,
  intro: b.description,
  image: b.image,
  type: "article",
  changefreq: "yearly",
  priority: "0.6",
  lastmod: b.date,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: b.title,
    description: b.description,
    image: b.image,
    datePublished: b.date,
    url: `${SITE_URL}/blog/${b.slug}`,
  },
}));

export const routes: PrerenderRoute[] = [
  ...staticRoutes,
  ...destinationRoutes,
  ...packageRoutes,
  ...blogRoutes,
  ...signatureRoutes,
];
