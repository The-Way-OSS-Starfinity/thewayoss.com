import { pillars, type Pillar } from "@/data/pillars";

export function getAllPillars(): Pillar[] {
  return [...pillars].sort((a, b) => a.order - b.order);
}

export function getPillarBySlug(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}

export function getAdjacentPillars(slug: string): {
  prev: Pillar | null;
  next: Pillar | null;
} {
  const sorted = getAllPillars();
  const idx = sorted.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
}

export function formatDomainLabel(domain: string): string {
  return domain
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
