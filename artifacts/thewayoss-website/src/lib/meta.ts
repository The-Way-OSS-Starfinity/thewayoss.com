import { useEffect } from "react";

const SITE_NAME = "The Way OSS";
const DEFAULT_TITLE = "The Way OSS — Infrastructure for practitioners becoming leaders.";
const DEFAULT_DESCRIPTION = "A practice-ground platform for those building what comes next, across six domains.";
const DEFAULT_URL = "https://thewayoss.com";
const DEFAULT_IMAGE = "https://thewayoss.com/og-image.png";

interface MetaOptions {
  title?: string;
  description?: string;
  url?: string;
  type?: "website" | "article";
  image?: string;
  /** When true, use `title` exactly as provided without appending the site name. */
  rawTitle?: boolean;
}

function upsertMeta(attrName: string, attrValue: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(
    `meta[${attrName}="${attrValue}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.href = href;
}

function removeCanonical() {
  const el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (el) el.remove();
}

function applyMeta(
  resolvedTitle: string,
  resolvedDesc: string,
  resolvedUrl: string,
  resolvedImage: string,
  type: string
) {
  document.title = resolvedTitle;
  upsertMeta("name", "description", resolvedDesc);
  upsertMeta("property", "og:title", resolvedTitle);
  upsertMeta("property", "og:description", resolvedDesc);
  upsertMeta("property", "og:type", type);
  upsertMeta("property", "og:url", resolvedUrl);
  upsertMeta("property", "og:image", resolvedImage);
  upsertMeta("property", "og:site_name", SITE_NAME);
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", resolvedTitle);
  upsertMeta("name", "twitter:description", resolvedDesc);
  upsertMeta("name", "twitter:image", resolvedImage);
}

export function useMeta({
  title,
  description,
  url,
  type = "website",
  image,
  rawTitle = false,
}: MetaOptions = {}) {
  useEffect(() => {
    const resolvedTitle = title
      ? rawTitle
        ? title
        : `${title} — ${SITE_NAME}`
      : DEFAULT_TITLE;
    const resolvedDesc = description ?? DEFAULT_DESCRIPTION;
    const resolvedUrl = url ? `${DEFAULT_URL}${url}` : DEFAULT_URL;
    const resolvedImage = image ?? DEFAULT_IMAGE;

    applyMeta(resolvedTitle, resolvedDesc, resolvedUrl, resolvedImage, type);

    if (url) {
      upsertCanonical(resolvedUrl);
    }

    return () => {
      applyMeta(DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_URL, DEFAULT_IMAGE, "website");
      removeCanonical();
    };
  }, [title, description, url, type, image, rawTitle]);
}
