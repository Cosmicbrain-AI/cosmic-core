# CosmicBrain design system

## Direction

CosmicBrain is focused on humanoid automation inside data centers. The opening is “The next shift in data center operations.” Lead with humanoid deployment at the facility level; keep task-specific detail in the workflow sections. Preserve the warm editorial identity: ivory paper, charcoal typography, sage architectural details, and terracotta actions.

## Type and color

- Instrument Serif for display headings, regular and italic; DM Sans for body and UI; DM Mono for short engineering labels.
- Paper #f7f4ec, card #fffdf7, ink #292b25, secondary ink #6c6d61, terracotta #b94e32, sage #5b7054, fine rules #d9d7cb.
- Keep the existing company mark and current font delivery. Use generous space and short copy rather than repeated cards and broad robotics messaging.

## Homepage

A persistent, client-lazy Three.js data center model is the central visual. Native page scroll moves through five scenes: facility overview, GPU/rack inspection, cooling inspection, electrical cabinet inspection, and equipment transport. Architectural geometry includes racks, GPU trays, overhead cooling pipes, electrical busways, switchgear, a cooling plant, and a logistics cart. The existing reference-inspired mobile humanoid moves through the service aisles with articulated arms and a visible task pose.

The scene is an illustrative environment, not a CAD model, customer deployment, or live telemetry. Keep this qualification concise and visible. Do not imply autonomous electrical repair, live cabinet intervention, guaranteed uptime or unsupported customer relationships.

Use a centered editorial composition. The opening headline and deployment action sit above the prominent architectural model. As scrolling enters the workflow chapters, the model becomes a low-opacity background. Photographs appear as substantial image-and-text blocks in the compute, cooling, and logistics chapters. Use a consistent wide 8:5 crop, transparent framing, and softly feathered edges to integrate each photograph into the blueprint. Avoid dark card backgrounds and drop shadows. Use a short workflow description and three ruled specification rows for observations, evidence and qualification. Alternate left and right. Let photography reach the page edges on phones above centered headings, keeping specification rows left-aligned. Keep captions off. The composition adapts to phones without text or control overlap. Essential content remains HTML. Stage controls, rotation, reset, blueprint and pause controls are keyboard accessible. Respect reduced motion, suspend rendering offscreen, cap pixel ratio, release GPU resources on unmount, and retain the static blueprint and retry fallback.

## Photography

Use the supplied photograph edited with the built-in image tool to give the humanoid a graphite-black finish. Display photographs without captions. Do not describe these images as evidence of CosmicBrain deployment.

Use the bright Wikimedia server-aisle photograph for compute rather than the dark rack-detail photograph. Real rack and cooling photographs provide context throughout the scroll sequence. Place required source and license credits on public/media/photo-credits.html, linked once from the shared footer. The server-aisle and cooling photographs remain CC BY-SA 3.0, including their displayed adaptations. Full provenance is in public/media/data-centers/attribution.json. Do not imply that photographed facilities belong to CosmicBrain or a partner.

## Navigation and Sales

Public navigation contains Evals, Datasets, Newsroom, Docs and Sales, plus a data center deployment action. Remove Deployments, Robots and Live Teleop links from shared navigation and footer. Retain existing routes and authenticated operator functionality.

Sales has one purpose: plan a humanoid deployment inside a data center. Qualify the first workflow, facility constraints, human supervision, operating limits, pilot timeline and acceptance criteria. The interactive workflow selector carries context into the existing inquiry endpoint. No broad hardware, dataset licensing, or unrelated project intake paths belong on Sales.

Keep Evals, Datasets, Newsroom and Docs available. On the homepage, connect evaluations and datasets to the deployment learning loop. Avoid invented metrics, testimonials, customer logos and autonomy promises.

## Technical pilot content

The homepage and Sales share a nine-measure operational scorecard: robot availability, round completion, site-adjudicated findings, sampled asset-tag accuracy, request-to-rack parts time, intervention rate, operator-control minutes per completed task, incidents with exposure, and robot-to-operator network health. Evals presents the same definitions separately from existing model-trial metrics and research results. Definitions live in src/data/data-center-pilot.ts. Label the scorecard as a proposed reporting protocol; numerical pilot results and fixed acceptance thresholds are not supplied.

Retain failed attempts, unread asset tags and blocked racks in the declared denominators. Keep operator control, passive supervision and reset labor distinct. Declare network endpoints, cadence and jitter method, with loss reported separately from delivered-probe latency. Keep the public scorecard focused on the nine metric rows; omit evidence-record downloads, technical reference lists and the trailing reference/capability paragraph.
