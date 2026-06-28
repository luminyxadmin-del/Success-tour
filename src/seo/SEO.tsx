import { Helmet } from "react-helmet-async";
import { company } from "@/data/company";

const SITE_URL = "https://luminyxtravel.net";
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=70";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  /** Optional JSON-LD structured data object */
  structuredData?: Record<string, unknown>;
  noIndex?: boolean;
}

export default function SEO({
  title,
  description,
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
  structuredData,
  noIndex = false,
}: SEOProps) {
  const fullTitle = `${title} | ${company.shortName} Kenya`;
  const canonical = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={company.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Global WebSite + Sitelinks schema — always present */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(siteNavigationSchema)}
      </script>

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

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
