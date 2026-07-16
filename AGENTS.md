# The Way OSS Website Agent Guide

## Role

This repository is the canonical source for the public website at
`thewayoss.com`. It is distinct from the shipping The Way OSS application at
`/Users/monk/Projects/the-way-oss`.

Canonical path: `/Users/monk/Projects/thewayoss.com`

## Start Here

1. Read the root `package.json` for workspace commands.
2. Read `artifacts/thewayoss-website/package.json` for the website package.
3. Work primarily in `artifacts/thewayoss-website/src` for website UI and content.
4. Read
   `/Users/monk/monk-workspace/workspace/audits/2026-07-15-thewayoss-production-source-reconciliation.md`
   before changing source, history, build configuration, or deployment behavior.

## Source And History Boundaries

- Local `main` tracks the reconciled production-source branch. Inspect branch,
  status, and HEAD before editing.
- The preserved `archive/local-main-2026-07-15` branch has unrelated older
  history. Do not merge, rebase, delete, push, or rewrite it automatically.
- Do not use `/Users/monk/monk-workspace/projects/thewayoss-live-hero-patch` as
  current source or as a deployment target.
- Use `pnpm`; do not introduce npm or Yarn lockfiles.

## Publishing Boundaries

- Source edits do not authorize publishing. Do not deploy, push, alter domains or
  Vercel settings, submit public forms, or invoke external publishing actions
  without explicit Cj/Monk approval.
- Do not read, copy, expose, or modify credentials, environment values, deployment
  tokens, or private form submissions.
- Keep website work separate from the application repository and from doctrine in
  `/Users/monk/monk-workspace/wiki`.

## Layout

- `artifacts/thewayoss-website`: primary Vite/React website and prerender build
- `artifacts/api-server`: supporting API artifact
- `artifacts/mockup-sandbox`: non-canonical design sandbox
- `lib`: shared API, database, and client packages
- `scripts`: workspace support scripts
- `attached_assets`: source media and reference assets

## Verification

Run `pnpm typecheck` for the workspace-level static check. `pnpm build` is a local
build only and never implies deployment; the macOS native optional-dependency
path has failed before, so report that failure rather than modifying lockfiles or
dependencies outside a separately scoped repair.
