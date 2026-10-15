# CosmicBrain design system

## Direction

CosmicBrain is focused on humanoid automation inside data centers. The opening is “AI runs the data center. Now it can work the floor.” Preserve the warm editorial identity: ivory paper, charcoal typography, sage architectural details, and terracotta actions.

## Type and color

- Instrument Serif for display headings, regular and italic; DM Sans for body and UI; DM Mono for short engineering labels.
- Paper #f7f4ec, card #fffdf7, ink #292b25, secondary ink #6c6d61, terracotta #b94e32, sage #5b7054, fine rules #d9d7cb.
- Keep the existing company mark and current font delivery. Use generous space and short copy rather than repeated cards and broad robotics messaging.

## Homepage

A persistent, client-lazy Three.js data center model is the central visual. Native page scroll moves through five scenes: facility overview, GPU/rack inspection, cooling inspection, electrical cabinet inspection, and equipment transport. Architectural geometry includes racks, GPU trays, overhead cooling pipes, electrical busways, switchgear, a cooling plant, and a logistics cart. The existing reference-inspired mobile humanoid moves through the service aisles with articulated arms and a visible task pose.

The scene is an illustrative environment, not a CAD model, customer deployment, or live telemetry. Keep this qualification concise and visible. Do not imply autonomous electrical repair, live cabinet intervention, guaranteed uptime or unsupported customer relationships.

Use a centered editorial composition. The opening headline and deployment action sit above the prominent architectural model. As scrolling enters the workflow chapters, the model becomes a low-opacity background behind large centered headings and one short sentence. Photographs appear as substantial image-and-text blocks in the compute, cooling, and logistics chapters. Use consistent large image sizes and short text alongside, alternating left and right. Stack full-width photography above centered text on phones. Keep captions off. The composition adapts to phones without text or control overlap. Essential content remains HTML. Stage controls, rotation, reset, blueprint and pause controls are keyboard accessible. Respect reduced motion, suspend rendering offscreen, cap pixel ratio, release GPU resources on unmount, and retain the static blueprint and retry fallback.

## Photography

Use the supplied photograph edited with the built-in image tool to give the humanoid a graphite-black finish. Display photographs without captions. Do not describe these images as evidence of CosmicBrain deployment.

Real rack and cooling photographs provide context throughout the scroll sequence. Place required source and license credits on public/media/photo-credits.html, linked once from the shared footer. The cooling photograph remains CC BY-SA 3.0, including its web-sized adaptation. Full provenance is in public/media/data-centers/attribution.json. Do not imply that photographed facilities belong to CosmicBrain or a partner.

## Navigation and Sales

Public navigation contains Evals, Datasets, Newsroom, Docs and Sales, plus a data center deployment action. Remove Deployments, Robots and Live Teleop links from shared navigation and footer. Retain existing routes and authenticated operator functionality.

Sales has one purpose: plan a humanoid deployment inside a data center. Qualify the first workflow, facility constraints, human supervision, operating limits, pilot timeline and acceptance criteria. The interactive workflow selector carries context into the existing inquiry endpoint. No broad hardware, dataset licensing, or unrelated project intake paths belong on Sales.

Keep Evals, Datasets, Newsroom and Docs available. On the homepage, connect evaluations and datasets to the deployment learning loop. Avoid invented metrics, testimonials, customer logos and autonomy promises.
