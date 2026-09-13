# CosmicBrain design system

## Direction

A Musée-inspired gallery for physical intelligence in the original warm light palette: paper, dark editorial typography, terracotta accents, a soft sage ring, and an oversized robot moving through the composition. Keep labels sparse and let the model, typography, and personal copy lead. The exact tagline is **“A human touch to a robotic world.”** The current unbranded white-and-black 3D model is an illustrative study inspired by the latest supplied hardware reference. The original deployment photographs show the earlier black robot and remain unchanged.

## Type and color

- Display: Instrument Serif, regular and italic. The homepage uses desktop headlines 84–140px and section headlines 58–98px, scaling down on phones. Supporting pages use headlines 41–82px and section headlines 41–56px.
- Body/UI: DM Sans, 400–700. Body 14–18px, comfortable 1.75–1.9 line height.
- Technical notes: DM Mono, 400/500. Use short 9–11px labels, never long body text.
- Homepage and supporting pages: paper/background #f7f4ec; card #fffdf7; ink #292b25; secondary ink #6c6d61. Terracotta/action #b94e32 and sage #5b7054 retain their roles in controls and scientific diagrams.
- Borders: #d9d7cb and #b6b7a7. Quiet sage #eeeee2 and clay #f0e8da section backgrounds. The gallery ring is soft sage #c4ccb8 with a restrained glow.
- Preserve the supplied cyan-to-purple company mark and its dark image background. Use the same asset wherever the company mark appears rather than redrawing it in the terracotta palette.
- Robot materials distinguish painted white shells, dark display glass, metal joints, and rubber details, with amber accents and the existing warm woven basket. Keep the model unbranded. Shared product-studio reflections and tighter contact shadows give these finishes depth against paper; retain the dark face and friendly warm-white eyes with cyan indicators.
- Operational status colors retain distinct meanings.

## Composition

The homepage uses an 83%-wide gallery composition, capped at 1400px, with generous chapter spacing and fine vertical rules. Reading rails occupy roughly 46% of the chapter width and alternate sides. Below 760px, a single reading rail uses approximately 25px page margins. Supporting pages retain 1240px content, generous whitespace, and asymmetric editorial layouts. Fine rules and graph-paper diagrams carry the engineering notebook detail through the site. Keep chapter labels and annotations to the few that help orientation. Cards are reserved for meaningful collections and interactive workbenches. Desktop and mobile navigation expose the technical report and Live Teleop alongside approach, robot catalog, solutions, Sales, and Newsroom links.

The homepage draws on the persistent 3D subject and editorial scroll composition of https://musee.barvian.me/. The oversized humanoid and soft sage ring form a full-screen backdrop from hero to footer. The model alternates sides by chapter, with framing and scale adapting to the neighboring text, photographs, diagrams, and articles. Phone layouts integrate the model behind the reading rail with a directional paper scrim for legibility. The photo rail keeps all originals viewable in a dialog.

## Interaction

The homepage uses client-lazy Three.js rendering with page-scroll orbit and chapter-based framing. Quiet fixed Explore and Pause controls keep the gallery clear; Explore reveals a head acknowledgment and wireframe blueprint. Pointer movement gently turns the head. Basket and arms remain in their carrying pose throughout. Pause freezes the current pose and composition. Preserve reduced-motion handling, cleanup, keyboard access, and a photo fallback with retry when WebGL is unavailable. The model remains explicitly illustrative; the local scene is not a live robot connection or telemetry feed.

Photo selection and an accessible full-image dialog complement the model. Keep learning-loop tabs, native FAQ disclosure, existing catalog filtering, industry pilot checklist, and contextual contact dialog. Inputs need visible labels, keyboard focus and clear selected states. Honor reduced motion. Scientific equations include plain-language meanings.

## Content

People first, concrete tasks, small steps. Preserve product scope: capture/refine/deploy, teleoperation, robotics data, robot catalog and industry discovery. Use the existing contact endpoint. No new videos are included. Avoid unverified deployment metrics, autonomy promises, invented team quotations, customer testimonials and guaranteed commercial outcomes. Keep backend authentication, operator approvals, robot assignments, session ownership, and headset handoff intact. Give Live Teleop and the technical report visible entry points without bypassing the existing access gates.

Social sharing uses the versioned 1200×630 `cosmicbrain-robotics-v4.png` card: the original warm light palette, the exact tagline “A human touch to a robotic world,” the supplied company mark, and unchanged black-robot deployment photography. Keep Open Graph and Twitter image metadata aligned with that asset.

## Scroll and exploration

Use the latest hardware-inspired silhouette for the illustrative 3D scene: a continuous black helmet with a fitted visor, wider warm-white capsule eyes and subtle cyan indicators, a smooth tapered white shell, two serial folding central links, and a compact rounded rectangular wheeled chassis with amber accents. White articulated hands are posed around the prior woven laundry basket's side handles using handle contact points. The carrying pose stays fixed through the scroll; pointer responses and explicit gestures move only the head. Keep the hardware unbranded and describe it as an illustrative model, not CAD. Preserve the original black-robot deployment photographs and distinguish those photographs from this newer reference-inspired model.

The scroll scene stays at opacity 1 from hero to footer and moves between chapter compositions. Place the model beside the active desktop reading rail; use the phone paper scrim to keep text clear over the integrated backdrop. Never hijack scrolling. Pause freezes the current pose; reduced motion produces a still view. Keep Explore and Pause reachable on short phone layouts, with the decorative scene ignoring pointer hits. Interactive physics uses sliders and explanatory diagrams without claiming telemetry. Newsroom features IBM Think first and uses original article preview images and links, with a shared data source for page and homepage cards.
