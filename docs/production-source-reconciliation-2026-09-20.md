# The Way OSS production-source reconciliation — 2026-09-20

## Problem

The public website had advanced through direct static Vercel deployments while
the GitHub repository still described an older Vite/React homepage as current.
That made production visually correct but not reproducible from a Git commit.

## Evidence

- The live deployment was recovered and its complete 51-file inventory checked
  against `https://www.thewayoss.com`.
- Forty-nine files matched the recovered August bundle byte-for-byte.
- The two intentional differences were the approved 2026-09-20 homepage markup
  and responsive search-panel stylesheet.
- The prior local-only commit `e977dc6` changed only `AGENTS.md`; it contained no
  application or deployment code and has been preserved in history.

## Resolution

1. The exact live bundle is preserved under
   `production-snapshots/2026-09-20/static`.
2. `SHA256SUMS` makes that dated snapshot immutable and verifiable.
3. `production-current.json` selects the active production source.
4. `scripts/build-production-snapshot.mjs` fails closed on any missing, added,
   or changed file before copying the bundle to `dist/production`.
5. `vercel.json` builds that verified snapshot, so a future Git-connected Vercel
   release is attributable to a repository commit.
6. `CLAUDE.md` is a thin adapter to the canonical `AGENTS.md` instructions.

## Preserved history

The older React implementation remains in `artifacts/thewayoss-website` and in
Git history. It is no longer represented as the live source of truth. Rebuilding
the approved static editorial site as React would be a separate product and
visual migration, not a prerequisite for production-source integrity.

## Release procedure

For each approved future release:

1. Create a new dated snapshot; never alter an existing one.
2. Generate and review its `SHA256SUMS`.
3. Update `production-current.json`.
4. Run `pnpm verify:production` and `pnpm build:production`.
5. Complete responsive browser verification.
6. Commit and push the reviewed release.
7. Deploy only with explicit authorization and verify the public domain.
