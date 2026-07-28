# SEO / Search Console indexing

How the two Google Search Console issues were fixed, and the steps that must be
done outside this repo.

## Problem 1 — "Page with redirect" (4 URLs)

`/destinations` was never redirecting in the router; the route is real and renders
`DestinationsPage`. The redirect was at the **domain level**.

The live site was configured **non-www → www**, while `sitemap.xml` and every
`<link rel="canonical">` pointed at **non-www**. So Google fetched the non-www URLs
we submitted, got a 308, and filed them as "Page with redirect".

Measured before the fix:

| Request | Result |
| --- | --- |
| `http://luminyxtravel.net` | 308 → `https://luminyxtravel.net/` → 308 → `https://www.luminyxtravel.net/` (**2 hops**) |
| `http://www.luminyxtravel.net` | 308 → `https://www.luminyxtravel.net/` |
| `https://www.luminyxtravel.net` | 200 (this was the host actually serving content) |
| `https://luminyxtravel.net` | 308 → `https://www.luminyxtravel.net/` |
| `https://luminyxtravel.net/destinations` | 308 → `https://www.luminyxtravel.net/destinations` |

### Required manual step (Vercel dashboard)

The `Server: Vercel` + `Refresh:` headers confirm this is Vercel's **domain-level**
redirect. It is not expressed in `vercel.json` and cannot be changed from this repo.

In **Vercel → Project → Settings → Domains**:

1. Set `luminyxtravel.net` as the **primary** domain (no redirect).
2. Set `www.luminyxtravel.net` to **Redirect to `luminyxtravel.net`** with **308**.

> **Do not** add a `www → non-www` rule to `vercel.json` while the dashboard still
> redirects non-www → www. The two rules would bounce against each other and
> produce an infinite redirect loop. Canonicalisation belongs in the dashboard,
> where it resolves in a single hop at the edge.

Expected afterwards:

- `https://www.luminyxtravel.net/*` → 308 → `https://luminyxtravel.net/*` (1 hop)
- `http://luminyxtravel.net/*` → 308 → `https://luminyxtravel.net/*` (1 hop)
- `http://www.luminyxtravel.net/*` → `https://luminyxtravel.net/*`

The `http://www` case costs two hops (TLS upgrade, then host) because Vercel does
not collapse them. That is normal, and HSTS (`max-age=63072000` is already set)
means browsers skip the plaintext hop after the first visit.

### Search Console property

Make sure the property being validated covers the non-www host — ideally a
**Domain property** (`luminyxtravel.net`), which covers both hosts and both schemes.

## Problem 2 — "Discovered – currently not indexed" (6 pages)

The meta tags were never the problem: all pages already rendered a unique title,
description, canonical and Open Graph tags through `SEO.tsx`, and none of the six
carried `noindex`.

The problem was **rendering**. This is a Vite SPA: every URL shipped the same
`index.html` containing an empty `<div id="root">` and the generic site-wide title.
`react-helmet-async` only injects the real tags after JS executes. Googlebot's
first pass therefore saw no title, no canonical and no content, which is the
classic cause of pages sitting in "Discovered – currently not indexed".

### Fix: build-time prerendering

`scripts/prerender.mjs` runs after `vite build` (wired into `npm run build`) and
writes one real static HTML file per route, each with its own `<title>`,
description, canonical, `robots: index, follow`, Open Graph/Twitter tags and JSON-LD
already present in the markup — plus a crawlable `<h1>`, intro copy and internal
links inside `#root`.

`React.createRoot().render()` replaces the container's children on mount, so the
static copy is only ever a pre-JS view of the same content — not cloaking. It is
styled inline in the brand navy so the brief pre-mount frame looks intentional,
and left visible (not `display:none`) so crawlers give the text full weight.

`scripts/seo-manifest.ts` is the single source of truth. It imports the same data
modules the app uses, so destination/package/blog/signature URLs cannot drift.
**50 routes** are prerendered, covering every indexable page — not just the six
reported — so the SPA fallback now only ever serves genuine 404s. (Previously a
non-prerendered route would have inherited the home page's canonical.)

`sitemap.xml` is generated from that same manifest with `<lastmod>`,
`<changefreq>` and `<priority>` per URL, so it can never disagree with the routes
that exist. The hand-maintained `public/sitemap.xml` was deleted to remove the
second source of truth.

### `vercel.json`

`cleanUrls: true` serves `about.html` at `/about`; `trailingSlash: false` collapses
`/about/` → `/about`. Both matter here: a stray trailing-slash or `.html` redirect
on a prerendered page would recreate the "Page with redirect" problem we just fixed.
Static files are matched before rewrites, so the SPA catch-all only fires for paths
with no prerendered file.

## Verify after deploy

```sh
# every one of these should be 200, not 3xx
for p in / /about /blog /contact /gallery /packages /services /destinations; do
  curl -s -o /dev/null -w "%{http_code} %{redirect_url} $p\n" "https://luminyxtravel.net$p"
done

# should be a single 308 straight to the non-www URL
curl -sI https://www.luminyxtravel.net/destinations | grep -i "^location"

# unique title + self-referencing canonical, present without running JS
curl -s https://luminyxtravel.net/about | grep -E "<title>|canonical"
```

## Then, in Search Console

1. Resubmit `https://luminyxtravel.net/sitemap.xml`.
2. URL Inspection → **Request Indexing** for the 10 affected URLs.
3. **Validate Fix** on both "Page with redirect" and "Discovered – currently not
   indexed".

Validation takes days to weeks; "Discovered – currently not indexed" often also
just reflects crawl budget on a new site, so some of the six may clear on their own
once the canonical host stops redirecting.
