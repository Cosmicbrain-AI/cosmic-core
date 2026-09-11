# Redesign verification

Verified September 11, 2026, on branch `codex/warm-robotics-redesign`.

## Build and source checks

- `npx tsc --noEmit`: passed.
- `npm run build`: passed, producing the configured Vercel output.
- ESLint on all changed TypeScript components/routes: zero errors; one pre-existing dependency warning in the operator heartbeat effect. The heartbeat and backend control logic were preserved.
- No package dependencies or lockfile changes.
- Build retains existing TanStack server-function deprecation and bundle-size warnings.

## Browser checks

- Homepage: desktop and 390px mobile visual review; narrow 320px layout checks.
- Robot: blueprint on/off, native range keyboard End key to 135°, hello wave/state announcements. Nine additional component-state assertions cover timer restoration, cancellation, repeat clicks, and accessibility state.
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
