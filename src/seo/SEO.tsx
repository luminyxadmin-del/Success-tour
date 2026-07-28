import { Helmet } from "react-helmet-async";
import { company } from "@/data/company";
import {
  SITE_URL,
  DEFAULT_IMAGE,
  buildTitle,
  websiteSchema,
  siteNavigationSchema,
} from "@/seo/schemas";

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
  const fullTitle = buildTitle(title);
  const canonical = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
      />

      {/* Open Graph */}
      <meta property="og:site_name" content={company.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content="en_US" />

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

/** Re-exported for backwards compatibility — pages import these from here. */
export {
  websiteSchema,
  siteNavigationSchema,
  organizationSchema,
} from "@/seo/schemas";
