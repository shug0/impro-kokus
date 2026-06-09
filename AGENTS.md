# AGENTS.md

## Cursor Cloud specific instructions

Kokus is a **frontend-only** React + Vite SPA (French improvisation prompt generator). There is no backend, database, or Docker setup.

### Services

| Service | Command | URL |
|---------|---------|-----|
| Dev server (primary) | `pnpm dev` | http://localhost:5173 |
| Production preview | `pnpm build && pnpm preview` | http://localhost:4173 |

Only the Vite dev or preview server needs to run for local development and E2E testing.

### Common commands

See `package.json` scripts:

- **Install deps:** `pnpm install`
- **Dev:** `pnpm dev`
- **Build:** `pnpm build` (runs `tsc && vite build`)
- **Preview:** `pnpm preview`
- **Format check:** `npx prettier --check "src/**/*.{ts,tsx,css}"` (no ESLint configured)

### Gotchas

- **Package manager:** Use `pnpm` (lockfile: `pnpm-lock.yaml`). Do not use npm or yarn.
- **esbuild scripts:** pnpm may warn that `esbuild` build scripts were ignored. `pnpm dev` and `pnpm build` still work in this environment; no interactive `pnpm approve-builds` step is required.
- **Lockfile version:** The lockfile targets pnpm 9+ (`lockfileVersion: '9.0'`). If pnpm warns about an incompatible lockfile, `pnpm install` will regenerate it.
- **No test suite:** There is no test runner configured in `package.json`.
- **Long-running dev server:** Start `pnpm dev` in a tmux session (e.g. `vite-dev-server`) so it stays up across shell commands.

### Hello-world verification

1. Open http://localhost:5173
2. Confirm title **Kokus** and subtitle **Outil pour improvisateur audacieux**
3. Confirm a random prompt (job, animal, emotion, color swatch) appears on load
4. Click **Un.e autre !** and confirm all four values change
