# CosmicBrain website

TanStack Start, React 19, TypeScript, Vite, Tailwind, and Three.js.

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

Read `DESIGN.md` for colors, typography, layout, interactions, and copy principles. The public site includes the homepage, robot catalog and detail pages, industry guides, project conversation page, newsroom, technical report, and sign-in. Operator/admin actions and access controls remain connected to the existing backend.

The homepage keeps its Musée-inspired gallery composition in the soft white palette: paper #fafbf9, ink #292b25, terracotta #b94e32, and sage #5b7054. The homepage leads with **“Robots in the world. One operating system.”** Oversized serif typography, sparse labels and an unbranded white-and-black humanoid form the presentation. The hardware-inspired model has a smooth black helmet, fitted curved visor, wider warm-white capsule eyes, subtle cyan indicators, and a smooth tapered white shell. White articulated hands are posed around the woven basket's side handles using handle contact points. Two serial folding central links meet a compact rounded rectangular wheeled chassis with amber accents. Painted shells, glass, metal, and rubber have distinct finishes under shared product-studio reflections and tighter contact shadows. This is an illustrative model, not CAD; the unchanged deployment photographs still show the original black robot.

The 3D model alternates sides and adjusts its framing alongside the editorial chapters, follows a near-full orbit as the page scrolls, and switches between laundry, kitchen, and floor-cleaning props. A visible task picker allows an immediate switch; scrolling into the next chapter restores the chapter’s task. On phones it becomes an integrated full-screen backdrop behind one reading rail, with a directional paper scrim keeping text legible. Quiet Explore and Pause controls reveal the head acknowledgment and blueprint options. They affect only the local visualization.

`DeploymentPhotoRail` displays all three supplied photographs, with numbered selectors and an accessible full-image dialog. The originals are preserved in `public/media/deployment/` as `hallway-delivery.png`, `doorstep-handoff.jpeg`, and `laundry-room.jpeg`. The supplied company mark is in `public/brand/cosmicbrain-logo.png`; the shared header and footer apply an SVG silhouette filter to fit the site palette.

The homepage presents CosmicBrain as the operating system for multi-brand robot deployment, with Robot as a Service (RaaS) as the primary offering. It includes deployment operations, live-site evaluations and benchmarks for physical AI models, real deployment datasets, teleoperation data licensing, and hardware partnerships. Hospitality and data centers are deployment verticals; cloud kitchens are explicitly exploratory. Partnership claims use more than 15 robotics brands, separately from the catalog's broader hardware coverage. Sales offers four inquiry paths for operators, model teams, data customers, and hardware partners.

The original gallery theme, 3D model and task controls, deployment photo rail, physics workbench, catalog, newsroom, technical report, and authenticated operator/admin pages remain. Evals and Datasets join the existing top navigation. The basket uses tapered inner walls, flat interlaced rattan strips, attached leather handles, and folded linen. Kitchen and cleaning props share the articulated hand solver and disposal owner.

The technical report (`/docs`) and Live Teleop (`/app`) have prominent desktop/mobile navigation links and a dedicated homepage feature. Live Teleop continues through the existing authenticated operator workspace, including approval, robot assignments, exclusive sessions, and headset handoff. The public 3D viewer has no connection to those control APIs.

The existing technical report at `https://www.cosmicbrain.ai/docs/cosmic-0-5.html` was recovered on September 11, 2026 into `public/docs/cosmic-0-5.html`. Its text and embedded figures are preserved. Only the old hosting-specific base tag was removed to restore local chapter anchors. The `/docs` page wraps that report. The robot catalog dataset and its external image source URLs are unchanged. The Meet the Makers directory has been removed, including its navigation links and sitemap entry; /brands returns the standard 404 page.

See `REDESIGN_QA.md` for verification status and limits, including which results belong to the initial redesign and which checks cover the current 3D/photo iteration.

## Interactive homepage and newsroom

`RobotAtmosphere` creates the persistent scene from the first page load. `immersive-home.css` composes alternating reading rails over the soft white gallery, while chapter positions drive the model's side, zoom, and elevation. Decorative rings are removed, and robot opacity stays at 1. Mobile uses the same full-screen scene with a paper readability scrim behind the single reading rail. The decorative backdrop ignores pointer hits; content and the fixed Explore/Pause controls remain interactive. Rendering settles when interaction stops, pauses in hidden tabs, respects reduced motion, and releases resources on unmount or context loss. Pause freezes the current pose and composition. An original black-robot deployment photograph and retry control cover unavailable WebGL.

`PhysicsWorkbench` replaces the static physics cards with keyboard-accessible Perception, Motion, and Touch tabs. Native sliders update a sensor scan, articulated arm geometry, or gripper illustration. These are local explanatory diagrams, not live hardware measurements.

`/newsroom` and the homepage preview use shared article data in `src/components/newsroom/articles.ts`. The three supplied TechCrunch, IBM Think, and Rest of World articles link to their original publications. IBM Think leads both views. Thumbnails use each original article’s verified sharing image with an accessible fallback; filtering is by publisher. The IBM article has no displayed publication date because one was not verified. Newsroom, Sales, Technical report, and Live Teleop remain accessible from the shared navigation. No new videos were added.

## Social sharing

Root Open Graph and Twitter metadata use the versioned `public/social/cosmicbrain-robotics-v5.jpg` card: 1200×630, the original light gallery palette, company mark, serif typography, and the website's white-and-black 3D robot in a neutral pose. The headline “Robots in the world. One operating system.” and supporting RaaS, model evaluation/benchmark, and dataset copy match the expanded company positioning.

The editable composition is `public/social/cosmicbrain-robotics-v5.html`; `scripts/render-social-card.mjs` renders it with Playwright. The robot poster is `public/social/cosmicbrain-robot-v5.jpg`, captured at 480×560 from the original model. To regenerate that poster, serve the project with Vite, open `/scripts/render-social-robot.html`, and capture its 480×560 canvas composition once ready. Newsroom and technical report shares use their own page URLs and descriptions while inheriting this image. Metadata uses the production domain so external previews work after deployment. Versioned image URLs let sharing services retrieve new assets; cached previews may still require refreshing by the sharing platform.
