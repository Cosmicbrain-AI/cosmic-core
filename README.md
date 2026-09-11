# CosmicBrain website

TanStack Start, React 19, TypeScript, Vite, and Tailwind. The redesign lives on `codex/warm-robotics-redesign`.

## Develop

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4173
```

Public marketing pages work without service credentials. Operator sign-in and authenticated workspaces require the existing Supabase environment from `.env.example`; the browser client currently requires both public settings at module load. For a **visual-only local preview** of sign-in, use inert process-local placeholders:

```sh
VITE_SUPABASE_URL=https://preview.invalid VITE_SUPABASE_ANON_KEY=preview-only-not-a-real-key npm run dev -- --host 127.0.0.1 --port 4173
```

These placeholders do not provide working authentication. Do not use them in deployment. Keep the deployment's existing service configuration. Contact forms retain the existing Formspree destination; browser QA must not submit test messages to the team.

## Validate and build

```sh
npx tsc --noEmit
npm run build
```

The configured production build outputs Vercel artifacts to `.vercel/output`. This task has not deployed them. Route definitions live in `src/routes`; TanStack generates `src/routeTree.gen.ts` automatically.

## Design and content

Read `DESIGN.md` for colors, typography, layout, interactions, and copy principles. The public site includes the homepage, robot catalog and detail pages, maker directory, industry guides, project conversation page, technical report, and sign-in. Operator/admin actions and access controls remain connected to the existing backend.

`RobotPlayground` is a self-contained SVG concept illustration, with local-only arm and blueprint controls. It never sends commands to hardware.

The existing technical report at `https://www.cosmicbrain.ai/docs/cosmic-0-5.html` was recovered on September 11, 2026 into `public/docs/cosmic-0-5.html`. Its text and embedded figures are preserved. Only the old hosting-specific base tag was removed to restore local chapter anchors. The new `/docs` page wraps that report. Catalog/brand datasets and external image source URLs are unchanged.
