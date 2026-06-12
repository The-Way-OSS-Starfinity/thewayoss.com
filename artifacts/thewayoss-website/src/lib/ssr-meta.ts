import fieldNotesEntries, { type FieldNotesEntry } from "@/data/field-notes-entries";
import journalEntries from "@/data/journal-entries";
import { domains } from "@/data/domains";
import { pillars } from "@/data/pillars";
import { voices } from "@/data/voices";

const SITE_NAME = "The Way OSS";
const DEFAULT_TITLE = "The Way OSS — Infrastructure for practitioners becoming leaders.";
const DEFAULT_DESCRIPTION =
  "A practice-ground platform for those building what comes next, across six domains.";
const BASE_URL = "https://thewayoss.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

export interface PageMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  type: "website" | "article";
  jsonLd: object | object[];
  publishedDate?: string;
}

function appendSiteName(raw: string): string {
  return `${raw} — ${SITE_NAME}`;
}

function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    description: DEFAULT_DESCRIPTION,
    logo: `${BASE_URL}/favicon-512.png`,
  };
}

function articleSchema(opts: {
  headline: string;
  description: string;
  datePublished: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    url: opts.url,
  };
}

function getFirstSentence(text: string): string {
  const first = text.split(/\n\n/)[0] ?? "";
  const match = first.match(/^[^.!?]*[.!?]/);
  const raw = match ? match[0] : first;
  return raw.length > 160 ? raw.slice(0, 157) + "…" : raw;
}

export function getPageMeta(route: string): PageMeta {
  const canonicalUrl = route === "/" ? BASE_URL : `${BASE_URL}${route}`;

  const fnMatch = route.match(/^\/field-notes\/(.+)$/);
  if (fnMatch) {
    const entry = fieldNotesEntries.find((e) => e.slug === fnMatch[1]);
    if (entry) {
      return {
        title: appendSiteName(entry.title),
        description: entry.dek,
        canonicalUrl,
        ogImage: `${BASE_URL}/og/field-notes/${entry.slug}.svg`,
        type: "article",
        publishedDate: entry.date,
        jsonLd: [
          orgSchema(),
          articleSchema({
            headline: entry.title,
            description: entry.dek,
            datePublished: entry.date,
            url: canonicalUrl,
          }),
        ],
      };
    }
  }

  const jMatch = route.match(/^\/journal\/(.+)$/);
  if (jMatch) {
    const entry = journalEntries.find((e) => e.slug === jMatch[1]);
    if (entry) {
      const desc = (entry.body.split(/\n\n/)[0] ?? entry.title).slice(0, 160);
      return {
        title: appendSiteName(entry.title),
        description: desc,
        canonicalUrl,
        ogImage: DEFAULT_OG_IMAGE,
        type: "article",
        publishedDate: entry.date,
        jsonLd: [
          orgSchema(),
          articleSchema({
            headline: entry.title,
            description: desc,
            datePublished: entry.date,
            url: canonicalUrl,
          }),
        ],
      };
    }
  }

  const pillarMatch = route.match(/^\/pillars\/(.+)$/);
  if (pillarMatch) {
    const pillar = pillars.find((p) => p.slug === pillarMatch[1]);
    if (pillar) {
      return {
        title: appendSiteName(pillar.name),
        description: pillar.meaning,
        canonicalUrl,
        ogImage: `${BASE_URL}/og/pillars/${pillar.slug}.svg`,
        type: "article",
        jsonLd: [
          orgSchema(),
          articleSchema({
            headline: `${pillar.character} ${pillar.name} — ${pillar.meaning}`,
            description: pillar.meaning,
            datePublished: "2026-04-22",
            url: canonicalUrl,
          }),
        ],
      };
    }
  }

  const domainMatch = route.match(/^\/domains\/(.+)$/);
  if (domainMatch) {
    const domain = domains.find((d) => d.slug === domainMatch[1]);
    if (domain) {
      return {
        title: `${domain.name} — A Practice of The Way OSS`,
        description: domain.resonance,
        canonicalUrl,
        ogImage: DEFAULT_OG_IMAGE,
        type: "article",
        jsonLd: [orgSchema()],
      };
    }
  }

  const voiceMatch = route.match(/^\/voices\/(.+)$/);
  if (voiceMatch) {
    const voice = voices.find((v) => v.slug === voiceMatch[1]);
    if (voice) {
      const desc = getFirstSentence(voice.body);
      return {
        title: appendSiteName(`${voice.firstName} — A Voice from The Way OSS`),
        description: desc,
        canonicalUrl,
        ogImage: DEFAULT_OG_IMAGE,
        type: "article",
        publishedDate: voice.date,
        jsonLd: [
          orgSchema(),
          articleSchema({
            headline: `${voice.firstName} — A Voice from The Way OSS`,
            description: desc,
            datePublished: voice.date,
            url: canonicalUrl,
          }),
        ],
      };
    }
  }

  const staticPages: Record<string, Omit<PageMeta, "jsonLd">> = {
    "/": {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      canonicalUrl: BASE_URL,
      ogImage: DEFAULT_OG_IMAGE,
      type: "website",
    },
    "/journal": {
      title: appendSiteName("Journal — The Practice of Building"),
      description:
        "What we shipped, what we learned, and what comes next. Field notes from the practitioners of The Way OSS.",
      canonicalUrl,
      ogImage: DEFAULT_OG_IMAGE,
      type: "website",
    },
    "/pillars": {
      title: appendSiteName("Five Pillars — The Immutable Foundation"),
      description:
        "The principles that do not change. Five pillars that form the foundation of The Way OSS — internalized by practitioners and made visible through the work.",
      canonicalUrl,
      ogImage: DEFAULT_OG_IMAGE,
      type: "website",
    },
    "/domains": {
      title: appendSiteName("Six Practices — Where Leaders Are Being Forged"),
      description:
        "The six domains where The Way OSS is being practiced — from the mat to the studio to the workshop.",
      canonicalUrl,
      ogImage: DEFAULT_OG_IMAGE,
      type: "website",
    },
    "/voices": {
      title: appendSiteName("Voices — Practitioners in Their Own Words"),
      description:
        "Stories from practitioners on the mat and in life. Unedited, honest accounts of what the practice does.",
      canonicalUrl,
      ogImage: DEFAULT_OG_IMAGE,
      type: "website",
    },
    "/begin": {
      title: appendSiteName("Begin — The Way OSS"),
      description:
        "The room is being built by the practitioners who will train in it. While we finish the floor, walk the rest of the house.",
      canonicalUrl,
      ogImage: DEFAULT_OG_IMAGE,
      type: "website",
    },
  };

  const staticMeta = staticPages[route];
  if (staticMeta) {
    return { ...staticMeta, jsonLd: orgSchema() };
  }

  return {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    canonicalUrl,
    ogImage: DEFAULT_OG_IMAGE,
    type: "website",
    jsonLd: orgSchema(),
  };
}

export function getAllRoutes(): string[] {
  return [
    "/",
    "/journal",
    "/pillars",
    "/domains",
    "/voices",
    "/begin",
    ...pillars.map((p) => `/pillars/${p.slug}`),
    ...domains.map((d) => `/domains/${d.slug}`),
    ...voices.map((v) => `/voices/${v.slug}`),
    ...fieldNotesEntries.map((fn) => `/field-notes/${fn.slug}`),
    ...journalEntries.map((je) => `/journal/${je.slug}`),
  ];
}

export function getFieldNotesForRss(): FieldNotesEntry[] {
  return [...fieldNotesEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
