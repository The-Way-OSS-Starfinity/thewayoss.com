import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderToString } from "react-dom/server";
import App from "./App";
import { getAllRoutes, getPageMeta, getFieldNotesForRss } from "./lib/ssr-meta";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPublic = path.resolve(__dirname, "..", "public");
const template = fs.readFileSync(path.join(distPublic, "index.html"), "utf-8");
const TODAY = new Date().toISOString().split("T")[0]!;
const BASE_URL = "https://thewayoss.com";

// ---------------------------------------------------------------------------
// HTML helpers
// ---------------------------------------------------------------------------

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function injectIntoTemplate(
  tmpl: string,
  meta: ReturnType<typeof getPageMeta>,
  bodyHtml: string,
): string {
  let html = tmpl;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(meta.title)}</title>`);

  html = html.replace(
    /(<meta name="description" content=")[^"]*(")/,
    `$1${escapeAttr(meta.description)}$2`,
  );
  html = html.replace(
    /(<meta property="og:title" content=")[^"]*(")/,
    `$1${escapeAttr(meta.title)}$2`,
  );
  html = html.replace(
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${escapeAttr(meta.description)}$2`,
  );
  html = html.replace(/(<meta property="og:type" content=")[^"]*(")/,
    `$1${meta.type}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/,
    `$1${meta.canonicalUrl}$2`);
  html = html.replace(/(<meta property="og:image" content=")[^"]*(")/,
    `$1${meta.ogImage}$2`);
  html = html.replace(
    /(<meta name="twitter:title" content=")[^"]*(")/,
    `$1${escapeAttr(meta.title)}$2`,
  );
  html = html.replace(
    /(<meta name="twitter:description" content=")[^"]*(")/,
    `$1${escapeAttr(meta.description)}$2`,
  );
  html = html.replace(/(<meta name="twitter:image" content=")[^"]*(")/,
    `$1${meta.ogImage}$2`);

  const canonical = `<link rel="canonical" href="${meta.canonicalUrl}" />`;
  const jsonLdArr = Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd];
  const jsonLd = `<script type="application/ld+json">${JSON.stringify(jsonLdArr)}</script>`;
  html = html.replace("</head>", `  ${canonical}\n  ${jsonLd}\n</head>`);

  html = html.replace(`<div id="root"></div>`, `<div id="root">${bodyHtml}</div>`);

  return html;
}

// ---------------------------------------------------------------------------
// Route rendering
// ---------------------------------------------------------------------------

function renderRoute(url: string): string {
  return renderToString(<App ssrPath={url} />);
}

function writeRoute(route: string): void {
  const bodyHtml = renderRoute(route);
  const meta = getPageMeta(route);
  const html = injectIntoTemplate(template, meta, bodyHtml);

  let outPath: string;
  if (route === "/") {
    outPath = path.join(distPublic, "index.html");
  } else {
    const dir = path.join(distPublic, route.slice(1));
    fs.mkdirSync(dir, { recursive: true });
    outPath = path.join(dir, "index.html");
  }

  fs.writeFileSync(outPath, html, "utf-8");
  console.log(`  ✓ ${route}`);
}

// ---------------------------------------------------------------------------
// Sitemap
// ---------------------------------------------------------------------------

function sitemapPriority(route: string): { changefreq: string; priority: string } {
  if (route === "/") return { changefreq: "weekly", priority: "1.0" };
  if (["/pillars", "/journal", "/voices", "/domains"].includes(route))
    return { changefreq: "weekly", priority: "0.9" };
  if (/^\/(pillars|voices|field-notes|journal)\//.test(route))
    return { changefreq: "monthly", priority: "0.8" };
  if (/^\/domains\//.test(route)) return { changefreq: "monthly", priority: "0.7" };
  return { changefreq: "monthly", priority: "0.7" };
}

function buildSitemap(routes: string[]): string {
  const urls = routes
    .map((route) => {
      const { changefreq, priority } = sitemapPriority(route);
      return [
        "  <url>",
        `    <loc>${BASE_URL}${route}</loc>`,
        `    <lastmod>${TODAY}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

// ---------------------------------------------------------------------------
// llms.txt
// ---------------------------------------------------------------------------

function buildLlmsTxt(routes: string[]): string {
  const fieldNotes = getFieldNotesForRss();

  const pillarLines = routes
    .filter((r) => /^\/pillars\/.+$/.test(r))
    .map((r) => {
      const m = getPageMeta(r);
      const label = m.title.split(" — ")[0] ?? m.title;
      return `- [${label}](${BASE_URL}${r})`;
    })
    .join("\n");

  const domainLines = routes
    .filter((r) => /^\/domains\/.+$/.test(r))
    .map((r) => {
      const m = getPageMeta(r);
      const label = m.title.split(" —")[0] ?? m.title;
      return `- [${label}](${BASE_URL}${r})`;
    })
    .join("\n");

  const voiceLines = routes
    .filter((r) => /^\/voices\/.+$/.test(r))
    .map((r) => {
      const m = getPageMeta(r);
      const label = m.title.split(" — ")[0] ?? m.title;
      return `- [${label}](${BASE_URL}${r})`;
    })
    .join("\n");

  const fieldNoteLines =
    fieldNotes.length > 0
      ? fieldNotes
          .map((fn) => `- [${fn.title}](${BASE_URL}/field-notes/${fn.slug}) — ${fn.dek}`)
          .join("\n")
      : "_(No field notes published yet.)_";

  return `# The Way OSS

> Infrastructure for practitioners becoming leaders.

The Way OSS is building AI-native infrastructure for practice communities — starting with the grappling and martial arts world, and expanding across six domains where transformation happens through repeated, embodied work. Human first. AI augmented.

## Who it serves

Practitioners across six domains who are in the process of becoming: Martial Arts, Contemplative, Creative, Entrepreneurial, Healing, and Technical. The platform serves coaches, founders, artists, healers, and builders who are shaping what comes next.

## Key pages

- [Home](${BASE_URL}/)
- [Five Pillars](${BASE_URL}/pillars) — The immutable foundation: MA, KANSO, SHIZEN, SHIBUI, MAKOTO
- [Six Domains](${BASE_URL}/domains) — The practice communities The Way OSS serves
- [Voices](${BASE_URL}/voices) — Practitioners in their own words
- [Journal](${BASE_URL}/journal) — Builder's log from the team
- [Begin](${BASE_URL}/begin) — Start here

## The Five Pillars

${pillarLines}

## Six Domains

${domainLines}

## Voices

${voiceLines}

## Field Notes

${fieldNoteLines}

## Feeds

- RSS: ${BASE_URL}/feed.xml
- Sitemap: ${BASE_URL}/sitemap.xml
- This file: ${BASE_URL}/llms.txt
`;
}

// ---------------------------------------------------------------------------
// RSS feed
// ---------------------------------------------------------------------------

function toRfc2822(dateStr: string): string {
  return new Date(dateStr + "T00:00:00Z").toUTCString();
}

function buildRssFeed(): string {
  const fieldNotes = getFieldNotesForRss();

  const items = fieldNotes
    .map((fn) => {
      const link = `${BASE_URL}/field-notes/${fn.slug}`;
      return [
        "  <item>",
        `    <title>${escapeXml(fn.title)}</title>`,
        `    <link>${link}</link>`,
        `    <description>${escapeXml(fn.dek)}</description>`,
        `    <pubDate>${toRfc2822(fn.date)}</pubDate>`,
        `    <guid isPermaLink="true">${link}</guid>`,
        "  </item>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>The Way OSS — Field Notes</title>",
    `    <link>${BASE_URL}</link>`,
    "    <description>Dispatches from the practitioners building The Way OSS.</description>",
    "    <language>en</language>",
    `    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log("Prerendering routes...");
const routes = getAllRoutes();
for (const route of routes) {
  writeRoute(route);
}

console.log("\nGenerating crawler files...");

fs.writeFileSync(path.join(distPublic, "sitemap.xml"), buildSitemap(routes), "utf-8");
console.log("  ✓ sitemap.xml");

fs.writeFileSync(path.join(distPublic, "llms.txt"), buildLlmsTxt(routes), "utf-8");
console.log("  ✓ llms.txt");

fs.writeFileSync(path.join(distPublic, "feed.xml"), buildRssFeed(), "utf-8");
console.log("  ✓ feed.xml");

console.log(`\nDone — ${routes.length} routes prerendered.\n`);
