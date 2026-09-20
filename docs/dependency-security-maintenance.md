# Dependency and repository-security architecture

## Production dependency boundary

The deployed website is a verified static snapshot. Its production build uses
only Node.js built-in modules to verify and copy the active snapshot into
`dist/production`. It has no npm runtime, build, or development dependencies.
Vercel intentionally skips dependency installation.

The React/Vite website, mockup sandbox, API server, shared libraries, and
code-generation sources remain in the repository as historical/reference
artifacts. They are not active production implementations and are not
installable from the current branch. Their former package manifests and the
workspace lockfile remain recoverable from Git history at commit `b582603`.
Reactivating any artifact is a separate architecture decision: restore only the
needed source into a dedicated project, select currently supported packages,
review the resulting dependency graph, and add its own build and security
checks. Do not restore the archived monorepo lockfile wholesale.

## 2026-09-20 alert classification

GitHub's baseline contained 45 Dependabot alerts: 11 critical, 23 high, 7
medium, and 4 low. No alert was reachable from the static production build or
browser runtime.

| Dependency lineage | GitHub alert numbers | Role in archived graph | Production reachability |
| --- | --- | --- | --- |
| `orval` | 27–29, 34–42 | Direct development/code-generation dependency (11 critical, 1 high) | None |
| `brace-expansion` | 11, 18, 20 | Transitive through Orval/TypeDoc | None |
| `fast-uri` | 14, 15, 21, 30, 32, 33 | Transitive through Orval/OpenAPI parser/AJV | None |
| `js-yaml` | 10, 17, 22, 48 | Transitive through Orval | None |
| `linkify-it` | 9, 13 | Transitive through Orval/TypeDoc/Markdown-It | None |
| `markdown-it` | 5 | Transitive through Orval/TypeDoc | None |
| `vite` | 6, 7 | Direct development/build dependency of the archived React surfaces | None |
| `@babel/core` | 8 | Transitive through the Vite React plugin | None |
| `browserslist` | 43, 44 | Transitive through Babel | None |
| `baseline-browser-mapping` | 46 | Transitive through Browserslist | None |
| `postcss` | 19, 25 | Transitive through Vite | None |
| `nanoid` | 24, 26 | Transitive through PostCSS | None |
| `sharp` | 16, 47 | Transitive through `vite-imagetools` | None |
| `body-parser` | 12 | Transitive runtime dependency of the archived API server | None |
| `qs` | 31, 45 | Transitive runtime dependency of the archived API server | None |
| `esbuild` | 1, 2 | Direct development dependency of the archived API server and shared transitive build tool | None |

Classification summary:

- Active production dependencies: none.
- Development/build-only dependencies: Orval, Vite, and esbuild alert roots.
- Legacy implementation dependencies: the React/Vite, API, database, and
  code-generation package manifests removed by this maintenance change.
- Transitive dependencies: all remaining alert packages listed above.
- False/non-reachable production exposure: all 45 alerts; they described an
  installable legacy workspace, not the deployed static snapshot.
- Uncertain: none after manifest, import, build-script, Vercel, and lockfile
  tracing.

## Maintenance procedure

1. Run `npm run security:dependencies`. It rejects dependency declarations,
   root workspaces, nested package manifests, lockfiles, workspace configuration,
   and installed `node_modules` trees.
2. Run `npm run verify:production` to verify every active snapshot byte against
   `SHA256SUMS`.
3. Run `npm run build:production` to create the deterministic Vercel output.
4. For an approved release, follow `AGENTS.md` and the dated-snapshot procedure.
5. Review GitHub's Dependabot alert inventory after GitHub indexes the merged
   manifest changes. Do not dismiss alerts merely to reach zero.

The `Static production security` GitHub Actions workflow performs the first
three checks without installing third-party packages.
