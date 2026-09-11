# Redesign verification

Branch: `codex/warm-robotics-redesign`. Initial redesign verified September 11, 2026. The second iteration adds the supplied company logo, deployment photographs, a Three.js robot reconstruction, and prominent technical-report/Live Teleop entry points. Historical results below are labeled separately from current verification.

## Second iteration: implementation and verification status

- Supplied company logo reused through the shared brand mark and local asset.
- Three supplied robot photos copied to `public/media/deployment/`; SHA-256 comparison verified that each matches its original bytes. Gallery offers one featured photo, two selectable alternatives, numbered selectors, descriptive captions, and an accessible full-image dialog.
- The homepage robot is a client-lazy Three.js WebGL reconstruction from those photos. Proportions and movement are labeled illustrative. Implemented controls cover carry/rest/wave, manual elbow bend, drag orbit, zoom, turntable, blueprint, reset, and keyboard equivalents. A photograph and retry control handle WebGL failure.
- Added `three` and `@types/three` at version `0.186.0`; package metadata and lockfile changes are part of this iteration.
- Technical report and Live Teleop links appear in desktop/mobile navigation and a dedicated homepage feature. The existing authentication, approval, assignment, exclusive-session, and headset-handoff flow is preserved.
- Integrated TypeScript, production build, and focused ESLint pass. Independent pre-deploy review found no introduced auth/session or credential regressions.
- Desktop and 390px mobile browser review confirms the actual logo, rendered 3D model, carry/rest/wave controls, wireframe, rotation buttons, keyboard rotation/zoom/reset, turntable start/pause, and manual elbow slider through 135 degrees.
- Gallery selection and full-image dialogs pass on desktop/mobile; Escape dismisses the dialog. Technical report renders, and Live Teleop navigates signed-out visitors to the existing login page.
- Isolated local browser harness simulated actual WebGL context loss with Blueprint and Turntable active. The canvas was removed, photo fallback appeared, and controls disabled. Retry restored one canvas with carry/solid/stopped state and a 90-degree slider. Unmount/remount also restored exactly one canvas. The temporary harness was removed.
- Removed the sparse manifesto side column after user review; heading and eyebrow now align to the left page edge, with body/signature alongside and a mobile stack. Added a sage engineering diagram beneath the heading: human experience → robot learning → a helping hand.
- Reduced-motion listener and resource rollback were source-reviewed; OS preference switching was not emulated.

## Initial redesign: build and source checks

- `npx tsc --noEmit`: passed.
- `npm run build`: passed, producing the configured Vercel output.
- ESLint on all changed TypeScript components/routes: zero errors; one pre-existing dependency warning in the operator heartbeat effect. The heartbeat and backend control logic were preserved.
- The initial redesign added no dependencies; this does not apply to the second iteration's Three.js dependencies.
- Build retains existing TanStack server-function deprecation and bundle-size warnings.

## Initial redesign: browser checks

- Homepage: desktop and 390px mobile visual review; narrow 320px layout checks.
- Original SVG robot: blueprint on/off, native range keyboard End key to 135°, hello wave/state announcements. Nine additional component-state assertions covered timer restoration, cancellation, repeat clicks, and accessibility state. These results do not validate the replacement Three.js viewer.
- Learning tabs: pointer switching and ArrowRight keyboard selection update explanation, diagram labels, and formula.
- FAQ: native disclosure opens the matching answer.
- Video: existing showreel opens in a dialog and Escape closes it; keyboard focus returns to its trigger.
- Mobile navigation: opens, closes with Escape, and restores toggle focus. Header fits at 320px.
- Catalog: `NEO` returns 2, adding In Stock returns 1; unmatched search produces an empty state; reset restores 107 entries. Healthcare filter returns 7.
- Robot detail: image/specification layout checked on desktop and 390px.
- Solutions: index and manufacturing guide checked; pilot checklist count changes 0 → 1 → 2, then resets to 0.
- Makers: Japan search returns 12, Manufacturing filter narrows to 8; empty and reset states checked across 68 entries.
- Sales: all three project types change the brief; contact prompt follows the chosen type. Dialog fits the 390px viewport.
- Login: sign-in/sign-up mode switching and desktop/mobile visual checks using inert preview-only environment values.
- Technical report: new wrapper fits desktop/mobile; original 31 headings and 14 embedded figures preserved; chapter links navigate within the local report.
- Sitemap: valid XML at `/sitemap.xml`, with 119 URLs including `/docs`. Corrected the old filename that routed it to `/sitemap/xml` despite robots.txt advertising `/sitemap.xml`.
- Canonical URLs now belong to each public page rather than inheriting the homepage canonical.

## Verification limits

No messages were submitted, no login attempted, and no hardware commands sent. Contact success/error behavior is implemented against the existing Formspree endpoint but external delivery was not tested. Authenticated operator/admin surfaces retain their real access gates; their source and styling were reviewed without an authenticated session. Real authentication needs the deployment's existing Supabase configuration. External robot photography and the YouTube showreel retain their upstream availability dependencies.

The public report was recovered from the live website because it was missing from the supplied repository. Its content was not rewritten; the hosting-specific base tag was removed so its own anchor links work locally.

Production has not been deployed.
