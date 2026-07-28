import { company } from "@/data/company";

/**
 * Canonical origin for the site. Non-www is the primary host — the Vercel
 * domain config must redirect www -> non-www so this matches what is served.
 */
export const SITE_URL = "https://luminyxtravel.net";

export const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=70";

/** Title suffix applied to every page title, shared by SEO.tsx and the prerenderer. */
export const TITLE_SUFFIX = `${company.shortName} Kenya`;

export const buildTitle = (title: string) => `${title} | ${TITLE_SUFFIX}`;

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Luminyx Travel",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/packages?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    { "@type": "SiteNavigationElement", position: 1, name: "Destinations", url: `${SITE_URL}/destinations` },
    { "@type": "SiteNavigationElement", position: 2, name: "Packages",     url: `${SITE_URL}/packages` },
    { "@type": "SiteNavigationElement", position: 3, name: "Services",     url: `${SITE_URL}/services` },
    { "@type": "SiteNavigationElement", position: 4, name: "About",        url: `${SITE_URL}/about` },
    { "@type": "SiteNavigationElement", position: 5, name: "Contact",      url: `${SITE_URL}/contact` },
  ],
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: company.name,
  url: SITE_URL,
  email: company.email,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address,
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  description:
    "Bespoke luxury safaris, beach escapes and cultural journeys across Kenya.",
};
