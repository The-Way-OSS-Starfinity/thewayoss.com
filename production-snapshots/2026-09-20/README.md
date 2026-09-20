# Production snapshot — 2026-09-20

This directory preserves the exact static bundle verified at
`https://www.thewayoss.com` after the approved mobile search-panel release on
2026-09-20.

## Evidence

- Vercel production deployment: `dpl_BzUzkdrzAzwFbjrCrtM42TV3Pe9Z`
- Homepage SHA-256:
  `b71d514fe0ea511b05ee36f70737f9e12ccf30dea67be3412e6efe902b3bd2dc`
- Stylesheet SHA-256:
  `aa63d50541fcf5a10dba107bde1dd858a8f609c082bfada2a7b99ac93e18dd0a`
- Client script SHA-256:
  `660dceeee1370505cb9ada8fe7dd0fdfb48f8de8bcd5ac1cba668c05f56924c5`

All 51 deployed files were compared with the public domain. The recovered
August bundle already matched 49 files byte-for-byte; `index.html` and
`styles.css` were updated to their approved production bytes. `SHA256SUMS`
records the complete immutable bundle contract.

Run `pnpm verify:production` from the repository root to prove integrity. Do not
modify this snapshot in place; create a new dated snapshot for the next release.
