/**
 * Post-build prerenderer.
 *
 * A Vite SPA ships one empty `<div id="root">` for every URL, so the first thing
 * a crawler sees has no title, no canonical and no content — react-helmet-async
 * only injects those once JS has executed. That is what puts pages in Search
 * Console's "Discovered - currently not indexed" bucket.
 *
 * This script rewrites the built shell into one real static HTML file per route
 * with the correct <title>, description, canonical, robots, Open Graph tags and
 * JSON-LD already in the markup, plus a crawlable text/link fallback inside
 * #root. React's createRoot().render() replaces those children on mount, so the
 * static copy is purely a pre-hydration view of the same content.
 *
 * It also emits sitemap.xml from the same manifest, so the sitemap can never
 * drift from the routes that actually exist.
 */
import { build } from "esbuild";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const srcDir = path.join(root, "src");

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** JSON-LD sits in a <script> block, so only `<` needs neutralising. */
const escapeJsonLd = (data) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

/**
 * Bundles the TS manifest so it can be imported from Node, resolving the "@"
 * alias the app uses. Written to dist/ then removed once loaded.
 */
async function loadManifest() {
  const outfile = path.join(distDir, ".seo-manifest.mjs");
  await build({
    entryPoints: [path.join(root, "scripts", "seo-manifest.ts")],
    outfile,
    bundle: true,
    format: "esm",
    platform: "node",
    target: "node18",
    alias: { "@": srcDir },
    logLevel: "silent",
  });
  try {
    return await import(`${new URL(`file://${outfile.replace(/\\/g, "/")}`)}?t=${Date.now()}`);
  } finally {
    await rm(outfile, { force: true });
  }
}

function buildHead(route, { SITE_URL, buildTitle, websiteSchema, siteNavigationSchema }) {
  const fullTitle = buildTitle(route.title);
  const canonical = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  const tags = [
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta property="og:site_name" content="Luminyx Travel" />`,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:type" content="${escapeHtml(route.type)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(route.image)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(fullTitle)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(route.image)}" />`,
    `<script type="application/ld+json">${escapeJsonLd(websiteSchema)}</script>`,
    `<script type="application/ld+json">${escapeJsonLd(siteNavigationSchema)}</script>`,
  ];
  if (route.structuredData) {
    tags.push(
      `<script type="application/ld+json">${escapeJsonLd(route.structuredData)}</script>`
    );
  }
  return tags.map((t) => `    ${t}`).join("\n");
}

/**
 * Pre-hydration content: a real <h1>, the intro copy and crawlable internal
 * links. React's createRoot().render() discards this on mount, so it must mirror
 * what the page renders — it is a pre-JS view of the same content, not cloaking.
 *
 * Styled inline (Tailwind classes would be purged, and the CSS bundle may not be
 * the thing painting yet) with the brand navy so the brief pre-mount frame reads
 * as an intentional loading state rather than broken markup. Kept visible rather
 * than display:none so crawlers give the text full weight.
 */
function buildShell(route, primaryNav) {
  const S = {
    wrap:
      "min-height:100vh;margin:0;padding:12vh 6vw 6vh;background:#0F172A;color:#f1f5f9;" +
      "font-family:Montserrat,system-ui,-apple-system,Segoe UI,sans-serif;box-sizing:border-box",
    nav: "margin:0 0 3rem;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:1.25rem;" +
      "font-size:.78rem;letter-spacing:.08em;text-transform:uppercase",
    navLink: "color:rgba(241,245,249,.65);text-decoration:none",
    h1: 'margin:0 0 1.25rem;font-family:"Playfair Display",Georgia,serif;font-weight:700;' +
      "font-size:clamp(2.25rem,5vw,4rem);line-height:1.08;max-width:52rem",
    rule: "width:4rem;height:2px;background:#C9A227;border:0;margin:0 0 1.5rem",
    lead: "margin:0 0 1rem;max-width:44rem;font-size:1.05rem;line-height:1.7;color:rgba(241,245,249,.82)",
    body: "margin:0;max-width:44rem;line-height:1.7;color:rgba(241,245,249,.6)",
    listWrap: "margin:3rem 0 0;padding:0;list-style:none;display:grid;gap:.6rem;max-width:44rem",
    listLink: "color:rgba(241,245,249,.72);text-decoration:none;font-size:.95rem",
  };

  const navLinks = primaryNav
    .map(
      (l) =>
        `<li><a style="${S.navLink}" href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a></li>`
    )
    .join("");

  const extraLinks = (route.links ?? [])
    .map(
      (l) =>
        `<li><a style="${S.listLink}" href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a></li>`
    )
    .join("");

  return [
    `<div id="prerender-content" style="${S.wrap}">`,
    `<nav aria-label="Primary"><ul style="${S.nav}">${navLinks}</ul></nav>`,
    `<h1 style="${S.h1}">${escapeHtml(route.h1)}</h1>`,
    `<hr style="${S.rule}" />`,
    `<p style="${S.lead}">${escapeHtml(route.intro)}</p>`,
    `<p style="${S.body}">${escapeHtml(route.description)}</p>`,
    extraLinks ? `<ul style="${S.listWrap}">${extraLinks}</ul>` : "",
    `</div>`,
  ]
    .filter(Boolean)
    .join("");
}

/** Maps a route path to its output file. "/" -> index.html, "/about" -> about.html. */
function outputFileFor(routePath) {
  if (routePath === "/") return path.join(distDir, "index.html");
  return path.join(distDir, `${routePath.replace(/^\//, "")}.html`);
}

function renderSitemap(routes, siteUrl, buildDate) {
  const entries = routes
    .map((r) => {
      const loc = `${siteUrl}${r.path === "/" ? "/" : r.path}`;
      return [
        "  <url>",
        `    <loc>${escapeHtml(loc)}</loc>`,
        `    <lastmod>${r.lastmod ?? buildDate}</lastmod>`,
        `    <changefreq>${r.changefreq}</changefreq>`,
        `    <priority>${r.priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

async function main() {
  const manifest = await loadManifest();
  const { routes, primaryNav, SITE_URL } = manifest;

  const templatePath = path.join(distDir, "index.html");
  let template;
  try {
    template = await readFile(templatePath, "utf8");
  } catch {
    throw new Error(
      "dist/index.html not found — run `vite build` before the prerender step."
    );
  }

  if (!template.includes('<div id="root"></div>')) {
    throw new Error(
      'Could not find `<div id="root"></div>` in dist/index.html; prerender aborted.'
    );
  }

  // Strip the shell's generic title/description so each page gets its own.
  const base = template
    .replace(/[ \t]*<title>[\s\S]*?<\/title>\r?\n?/i, "")
    .replace(/[ \t]*<meta\s+name="description"[\s\S]*?\/?>\r?\n?/i, "");

  // Untouched SPA shell for routes with no prerendered file (/admin, unknown
  // URLs). vercel.json rewrites to it; it can't be index.html, because that
  // becomes the home page below and cleanUrls 308-redirects /index.html anyway.
  await writeFile(
    path.join(distDir, "app-shell.html"),
    template.replace(
      /([ \t]*)<\/head>/i,
      `$1  <meta name="robots" content="noindex" />\n$1</head>`
    ),
    "utf8"
  );

  const buildDate = new Date().toISOString().slice(0, 10);
  const seen = new Set();

  for (const route of routes) {
    if (seen.has(route.path)) {
      throw new Error(`Duplicate route path in manifest: ${route.path}`);
    }
    seen.add(route.path);

    const html = base
      .replace(/([ \t]*)<\/head>/i, `${buildHead(route, manifest)}\n$1</head>`)
      .replace(
        '<div id="root"></div>',
        `<div id="root">${buildShell(route, primaryNav)}</div>`
      );

    const outFile = outputFileFor(route.path);
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, html, "utf8");
  }

  await writeFile(
    path.join(distDir, "sitemap.xml"),
    renderSitemap(routes, SITE_URL, buildDate),
    "utf8"
  );

  console.log(
    `prerender: wrote ${routes.length} HTML pages + sitemap.xml (${routes.length} URLs)`
  );
}

main().catch((err) => {
  console.error(`prerender failed: ${err.message}`);
  process.exit(1);
});
