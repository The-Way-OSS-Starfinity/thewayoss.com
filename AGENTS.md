# The Way OSS Website Agent Guide

## Role

This repository is the canonical source for the public website at
`thewayoss.com`. It is distinct from the shipping The Way OSS application at
`/Users/monk/Projects/the-way-oss`.

Canonical path: `/Users/monk/Projects/thewayoss.com`

## Start Here

1. Read `production-current.json` to identify the active production snapshot.
2. Read that snapshot's `README.md` and `SHA256SUMS` before changing the site.
3. Read `docs/production-source-reconciliation-2026-09-20.md` before changing
   source, history, build configuration, or deployment behavior.
4. Read `docs/dependency-security-maintenance.md` before adding or restoring a
   package dependency or package-manager workspace.
5. Run `npm run verify:production` before and after production-source work.

## Canonical Production Source

- `production-current.json` is the audited pointer to the current release.
- `production-snapshots/<date>/static` is the exact deployable website bundle.
- `production-snapshots/<date>/SHA256SUMS` is the integrity contract for that
  bundle. Never edit a dated snapshot in place. Create a new dated snapshot and
  update the pointer only after verification and human approval.
- `scripts/build-production-snapshot.mjs` verifies the active snapshot before
  copying it to `dist/production`.
- `vercel.json` is the traceable Git-build contract for the production project.

The older Vite/React implementation remains under
`artifacts/thewayoss-website`. It is preserved history and a reference surface,
not the current production source. Do not silently replace the approved static
site with that older homepage or assume the two implementations are equivalent.

## Source And History Boundaries

- Inspect branch, status, HEAD, and the production pointer before editing.
- The preserved `archive/local-main-2026-07-15` branch has unrelated older
  history. Do not merge, rebase, delete, push, or rewrite it automatically.
- Do not use `/Users/monk/monk-workspace/projects/thewayoss-live-hero-patch` as
  current source or as a deployment target.
- The static production path has no package dependencies. Use the documented
  `npm run` verification commands without running an install or introducing a
  package-manager lockfile.
- Preserve dated snapshots. New releases get a new snapshot directory and hash
  manifest so every deployed byte remains attributable to Git history.

## Publishing Boundaries

- Source edits do not authorize publishing. Do not deploy, push, alter domains or
  Vercel settings, submit public forms, or invoke external publishing actions
  without explicit Cj/Monk approval.
- Do not read, copy, expose, or modify credentials, environment values, deployment
  tokens, or private form submissions.
- Keep website work separate from the application repository and from doctrine in
  `/Users/monk/monk-workspace/wiki`.

## Layout

- `production-snapshots`: immutable, dated production bundles and evidence
- `production-current.json`: active production-source pointer
- `scripts/build-production-snapshot.mjs`: integrity verification and build
- `artifacts/thewayoss-website`: preserved older Vite/React implementation
- `artifacts/api-server`: supporting API artifact
- `artifacts/mockup-sandbox`: non-canonical design sandbox
- `lib`: shared API, database, and client packages
- `attached_assets`: source media and reference assets

## Verification

Run:

```bash
npm run security:dependencies
npm run verify:production
npm run build:production
```

The dependency check enforces the dependency-free static boundary. The snapshot
check validates every file against the active manifest. The build repeats that
validation and produces `dist/production`. A local build never implies
deployment. For public-facing changes, also complete responsive browser
verification and compare the release candidate with the intended production
state before requesting publication.
