# AGENTS.md

## Project Context

Base44 app repository (Vite + React 18 + Tailwind + shadcn/ui). Marketing/booking site for
"Echo Knuckles", a luxury villa in Sri Lanka. Keep changes focused and follow existing conventions.

## Run it

```bash
docker compose -f docker-compose.base44.yml up -d   # Vite dev server on host port 3000
docker compose -f docker-compose.base44.yml logs -f web
```

The compose service is `node:22` with the repo bind-mounted at `/app`; `npm install` runs at
startup and `node_modules` lives in a named volume. HMR works; Vite is configured with
`host: true`, `allowedHosts: true` and polling for bind mounts.

## Non-obvious findings (import cleanup)

This repo arrived as a **flat Base44 export**: every file sat at the repo root and several were
truncated mid-file. Setup reconstructed the standard layout expected by the `@/*` alias
(`src/pages`, `src/components`, `src/components/ui`, `src/components/echo`, `src/hooks`,
`src/lib`, `src/api`) and re-added the missing `vite.config.js` and `tailwind.config.js`.

Other quirks worth knowing:

- The export prepends a `const db = globalThis.__B44_DB__ || {...}` stub to files that use `db`
  (and, harmlessly, to `AGENTS.md`/`CLAUDE.md`). `src/api/base44Client.js` is a **stub** too —
  there is no live backend, so auth and entity calls resolve to empty results.
- Files completed by hand because the export cut them off: `src/pages/Home.jsx`,
  `src/components/ProtectedRoute.jsx`, `src/lib/AuthContext.jsx`, `src/lib/authReturnTo.js`,
  `src/components/ui/drawer.jsx`, `src/index.css` (theme vars + `--ring`/`--radius`).
- `src/App.jsx` imported `@/pages/Command`, which does not exist in the export; that route was
  removed. Re-add the page if you need it.
- Auth pages (`Login`, `Register`, `ForgotPassword`, `ResetPassword`, `OAuthConsent`) exist but
  are not routed in `App.jsx` — only `/` is.
- Custom Tailwind tokens live in `tailwind.config.js`: `font-heading` (Fraunces),
  `font-body` (Inter), `font-cta` (Space Grotesk), `tracking-luxe`, `tracking-wide-caps`, `gold`.

## Checks

`npm run lint`, `npm run build`.
