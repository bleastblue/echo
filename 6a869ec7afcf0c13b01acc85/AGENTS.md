const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

# AGENTS.md

## Project Context

This is a Base44 app repository. Treat it as user-owned application code, keep changes focused on the user's request, and preserve existing project conventions.

Start with `README.md` for local setup, environment variables, and publish workflow.

## Base44 References

- CLI overview: https://docs.db.com/developers/references/cli/get-started/overview.md
- Agent skills: https://docs.db.com/developers/backend/overview/skills.md

If your agent supports Agent Skills, install or update Base44 skills before Base44-specific work:

```bash
npx skills add base44/skills
```

## Key Files

- `src/`: frontend application source.
- `src/api/base44Client.js`: frontend Base44 SDK client.
- `vite.config.js`: Vite config and Base44 Vite plugin setup.
- `.env.local`: local-only environment values; never commit secrets.

## Working Notes

- Use `base44 dev` as the default local development command when you need the local Base44 backend. It can run the backend and frontend together.
- When docs or code mention the frontend being started automatically, that usually means the Base44 project config includes `site.serveCommand`, for example `"serveCommand": "npm run dev"` in `base44/config.jsonc`.
- Use `npm run dev` only for frontend-only work against the hosted Base44 backend.
- Prefer the existing Base44 CLI workflow over adding new npm scripts for Base44-specific tasks.
- Reuse the existing SDK client and Vite plugin patterns before adding new Base44 integration paths.
- Run the relevant checks from `package.json` before finishing code changes.

## Base44 sandbox notes

- App lives in `6a869ec7afcf0c13b01acc85/`; run it with `docker compose -f ../docker-compose.base44.yml up -d` (Vite dev server, host port 3000 -> 5173).
- The original export was flat (all files in one directory) and several files were truncated. Restored during setup:
  - Directory tree rebuilt under `src/` (`pages`, `components`, `components/echo`, `components/ui`, `hooks`, `lib`, `api`, `utils`); entity/config jsonc moved to `base44/`.
  - Recreated missing `vite.config.js` (with `@` alias, `allowedHosts: true`) and `tailwind.config.js` (fonts `heading`/`body`/`cta`, `gold` color).
  - Completed truncated files: `src/index.css`, `src/pages/Home.jsx`, `src/components/ProtectedRoute.jsx`, `src/lib/authReturnTo.js`, `src/components/ui/drawer.jsx`, and rewrote `src/lib/AuthContext.jsx`.
  - `src/pages/Command.jsx` was absent from the export and is a placeholder page.
- `src/api/base44Client.js` is an offline stub (`db` returns empty data), so no external credentials are needed to run locally.
