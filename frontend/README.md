# Fin AI — Frontend

Next.js 14 (App Router), TypeScript, Tailwind e shadcn/ui. Pacote do monorepo **fin-ai**; use **pnpm** na raiz do repositório.

## Comandos

Na **raiz** (`..`):

- `pnpm dev` — mesmo que `pnpm --filter frontend dev`
- `pnpm build` — build de todos os pacotes

Nesta pasta (`frontend/`):

- `pnpm dev` — `next dev`
- `pnpm build` — `next build`
- `pnpm start` — `next start` (após build)
- `pnpm lint` — ESLint

## Variáveis

Defina na raiz (arquivo `.env`): `NEXT_PUBLIC_API_URL` apontando para a API (ex.: `http://localhost:4000`).

## Rotas de exemplo

- `/login`, `/register`, `/recover` — grupo `(auth)`
- `/dashboard` — grupo `(dashboard)`
- `GET /api/health` — health do Next
