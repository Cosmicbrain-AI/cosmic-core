# CosmicBrain website

TanStack Start, React 19, TypeScript, Vite, Tailwind, and Three.js. The redesign lives on `codex/warm-robotics-redesign`.

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

The homepage now uses the supplied CosmicBrain company logo and `DeploymentRobot`, a real WebGL scene built with Three.js. The scene is imported on the client after mount. Its black shell, camera head, articulated arms, basket, folding support, and wheeled base are reconstructed from the supplied photographs; proportions and movement are illustrative rather than engineering specifications. Visitors can drag to orbit, zoom, select carry/rest/wave poses, adjust elbow bend, enable the turntable, or inspect a wireframe blueprint. The focused viewer supports Left/Right arrows, `+`/`-`, and Home. Controls affect the local visualization only. A supplied deployment photo remains available if WebGL cannot start, with an option to retry.

`DeploymentGallery` displays all three supplied robot photographs, with photo selection and an accessible full-image dialog. The originals are preserved in `public/media/deployment/` as `hallway-delivery.png`, `doorstep-handoff.jpeg`, and `laundry-room.jpeg`. The supplied company mark is in `public/brand/cosmicbrain-logo.png` and reused across the site's brand surfaces.

The technical report (`/docs`) and Live Teleop (`/app`) have prominent desktop/mobile navigation links and a dedicated homepage feature. Live Teleop continues through the existing authenticated operator workspace, including approval, robot assignments, exclusive sessions, and headset handoff. The public 3D viewer has no connection to those control APIs.

The existing technical report at `https://www.cosmicbrain.ai/docs/cosmic-0-5.html` was recovered on September 11, 2026 into `public/docs/cosmic-0-5.html`. Its text and embedded figures are preserved. Only the old hosting-specific base tag was removed to restore local chapter anchors. The `/docs` page wraps that report. Catalog/brand datasets and their external image source URLs are unchanged.

See `REDESIGN_QA.md` for verification status and limits, including which results belong to the initial redesign and which checks cover the current 3D/photo iteration.
