# CosmicBrain website

TanStack Start, React 19, TypeScript, Vite, Tailwind, and Three.js. The current local preview work is on `codex/interactive-newsroom-preview`.

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

The configured production build outputs Vercel artifacts to `.vercel/output`. Building does not publish them. Route definitions live in `src/routes`; TanStack generates `src/routeTree.gen.ts` automatically.

## Design and content

Read `DESIGN.md` for colors, typography, layout, interactions, and copy principles. The public site includes the homepage, robot catalog and detail pages, maker directory, industry guides, project conversation page, newsroom, technical report, and sign-in. Operator/admin actions and access controls remain connected to the existing backend.

The homepage keeps its Musée-inspired gallery composition in the original warm light palette: paper #f7f4ec, ink #292b25, terracotta #b94e32, and sage #5b7054. The exact tagline is **“A human touch to a robotic world.”** Oversized serif typography, sparse labels, a soft sage ring, and an unbranded white-and-black humanoid form the presentation. The hardware-inspired model has a smooth black helmet, fitted curved visor, wider warm-white capsule eyes, subtle cyan indicators, and a smooth tapered white shell. White articulated hands are posed around the woven basket's side handles using handle contact points. Two serial folding central links meet a compact rounded rectangular wheeled chassis with amber accents. Painted shells, glass, metal, and rubber have distinct finishes under shared product-studio reflections and tighter contact shadows. This is an illustrative model, not CAD; the unchanged deployment photographs still show the original black robot.

The 3D model alternates sides and adjusts its framing alongside the editorial chapters, follows a near-full orbit as the page scrolls, and retains its carrying pose through the footer. On phones it becomes an integrated full-screen backdrop behind one reading rail, with a directional paper scrim keeping text legible. Quiet Explore and Pause controls reveal the head acknowledgment and blueprint options. They affect only the local visualization.

`DeploymentPhotoRail` displays all three supplied photographs, with numbered selectors and an accessible full-image dialog. The originals are preserved in `public/media/deployment/` as `hallway-delivery.png`, `doorstep-handoff.jpeg`, and `laundry-room.jpeg`. The supplied company mark is in `public/brand/cosmicbrain-logo.png` and reused across brand surfaces.

The technical report (`/docs`) and Live Teleop (`/app`) have prominent desktop/mobile navigation links and a dedicated homepage feature. Live Teleop continues through the existing authenticated operator workspace, including approval, robot assignments, exclusive sessions, and headset handoff. The public 3D viewer has no connection to those control APIs.

The existing technical report at `https://www.cosmicbrain.ai/docs/cosmic-0-5.html` was recovered on September 11, 2026 into `public/docs/cosmic-0-5.html`. Its text and embedded figures are preserved. Only the old hosting-specific base tag was removed to restore local chapter anchors. The `/docs` page wraps that report. Catalog/brand datasets and their external image source URLs are unchanged.

See `REDESIGN_QA.md` for verification status and limits, including which results belong to the initial redesign and which checks cover the current 3D/photo iteration.

## Interactive homepage and newsroom

`RobotAtmosphere` creates the persistent scene from the first page load. `immersive-home.css` composes alternating reading rails over the warm paper gallery, while chapter positions drive the model's side, zoom, and elevation. The softer sage ring follows the model, and robot opacity stays at 1. Mobile uses the same full-screen scene with a paper readability scrim behind the single reading rail. The decorative backdrop ignores pointer hits; content and the fixed Explore/Pause controls remain interactive. Rendering settles when interaction stops, pauses in hidden tabs, respects reduced motion, and releases resources on unmount or context loss. Pause freezes the current pose and composition. An original black-robot deployment photograph and retry control cover unavailable WebGL.

`PhysicsWorkbench` replaces the static physics cards with keyboard-accessible Perception, Motion, and Touch tabs. Native sliders update a sensor scan, articulated arm geometry, or gripper illustration. These are local explanatory diagrams, not live hardware measurements.

`/newsroom` and the homepage preview use shared article data in `src/components/newsroom/articles.ts`. The three supplied TechCrunch, IBM Think, and Rest of World articles link to their original publications. IBM Think leads both views. Thumbnails use each original article’s verified sharing image with an accessible fallback; filtering is by publisher. The IBM article has no displayed publication date because one was not verified. Newsroom, Sales, Technical report, and Live Teleop remain accessible from the shared navigation. No new videos were added.

## Social sharing

Root Open Graph and Twitter metadata use the versioned `public/social/cosmicbrain-robotics-v4.png` card: 1200×630, the original warm light palette, the exact tagline “A human touch to a robotic world,” the actual company logo, and unchanged black-robot deployment photography. The editable composition is `public/social/cosmicbrain-robotics-v4.html`; `scripts/render-social-card.mjs` renders it with Playwright. Newsroom and technical report shares use their own page URLs and descriptions while inheriting this image. Metadata uses the production domain so external previews work after deployment. Local preview changes do not update published social cards until released.
