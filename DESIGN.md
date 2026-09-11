# CosmicBrain design system

## Direction

A welcoming robotics workshop: warm paper, thoughtful engineering, actual robot photography, and the people behind physical intelligence. The user requested a personal, warm, physics and robotics themed redesign with interactive robot elements, then supplied the company logo and photographs to make the robot match what customers see in deployment. The second iteration replaces the homepage's cream SVG concept robot with a Three.js reconstruction of that black robot. This direction supersedes the earlier cinematic American Dream brief for this redesign.

## Type and color

- Display: Instrument Serif, regular and italic. Headlines 41–82px; section headlines 41–56px.
- Body/UI: DM Sans, 400–700. Body 14–18px, comfortable 1.75–1.9 line height.
- Technical notes: DM Mono, 400/500. Use short 9–11px labels, never long body text.
- Paper/background #f7f4ec; card #fffdf7; ink #292b25; secondary ink #6c6d61.
- Terracotta/action #b94e32, white action text. Sage #5b7054 for scientific diagrams.
- Border #d9d7cb; stronger border #b6b7a7. Quiet sage #eeeee2 and clay #f0e8da section backgrounds.
- Preserve the supplied cyan-to-purple company mark and its dark image background. Use the same asset wherever the company mark appears rather than redrawing it in the terracotta palette.
- Robot materials follow the supplied hardware: black/graphite shells, metal joints, subtle cyan details, and a warm woven basket. Warm studio lighting keeps the model legible against the paper interface.
- No forced dark mode. Operational status colors retain distinct meanings.

## Composition

1240px content, generous whitespace, asymmetric editorial layouts. 40–104px combined side margins; single columns below 760px. Fine rules and graph-paper diagrams create an engineering notebook. Cards reserved for meaningful collections and interactive workbenches. Buttons are lightly rounded; drawings can be irregular. Desktop and mobile navigation expose the technical report and Live Teleop alongside approach, robot catalog, and solutions links.

The homepage pairs the interactive model with a deployment gallery: one large selected photograph and two smaller selectable photographs, with all originals viewable in a dialog. Captions describe visible scenes without adding customer names or performance claims. A dedicated teleoperation feature explains the existing operator journey and links directly to the workspace and technical report.

## Interaction

The robot viewer uses client-lazy Three.js rendering with orbit, zoom, carry/rest/wave poses, a manual elbow slider, a turntable toggle, a wireframe blueprint, and reset controls. Keyboard equivalents include Left/Right arrows to rotate, plus/minus to zoom, and Home to reset. Preserve reduced-motion handling, cleanup, and a photo fallback with retry when WebGL is unavailable. The photo-based model's proportions and motion must remain explicitly illustrative; the local viewer is not a live robot connection or live telemetry.

Photo selection and an accessible full-image dialog complement the model. Keep learning-loop tabs, native FAQ disclosure, existing catalog filtering, industry pilot checklist, and contextual contact dialog. Inputs need visible labels, keyboard focus and clear selected states. Honor reduced motion. Scientific equations include plain-language meanings.

## Content

People first, concrete tasks, small steps. Preserve product scope: capture/refine/deploy, teleoperation, robotics data, robot catalog and industry discovery. Use existing contact endpoint and video. Avoid unverified deployment metrics, autonomy promises, invented team quotations, customer testimonials and guaranteed commercial outcomes. Keep backend authentication, operator approvals, robot assignments, session ownership, and headset handoff intact. Give Live Teleop and the technical report visible entry points without bypassing the existing access gates.
