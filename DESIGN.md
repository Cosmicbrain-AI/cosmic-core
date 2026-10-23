# CosmicBrain design system

## Direction

CosmicBrain is focused on humanoid automation inside data centers. The opening is “The next shift in data center operations.” Lead with humanoid deployment at the facility level; keep task-specific detail in the workflow sections. Preserve the warm editorial identity: ivory paper, charcoal typography, sage architectural details, and terracotta actions.

## Type and color

- Instrument Serif for display headings, regular and italic; DM Sans for body and UI; DM Mono for short engineering labels.
- Paper #f7f4ec, card #fffdf7, ink #292b25, secondary ink #6c6d61, terracotta #b94e32, sage #5b7054, fine rules #d9d7cb.
- Keep the existing company mark and current font delivery. Use generous space and short copy rather than repeated cards and broad robotics messaging.

## Homepage

The homepage uses the two supplied films as decorative section backgrounds. The replacement datacenter film from the supplied MOV opens the page beneath a centered editorial headline; the cable close-up sits behind the compute workflow. Warm ivory gradients, restrained saturation, charcoal type and terracotta actions blend the films into the established palette. The interactive 3D facility and its stage, blueprint and rotation controls are removed from the homepage.

Keep all essential content in HTML. The homepage workflow sequence contains only 01 / Compute and 02 / Logistics; Cooling checks and Power checks are removed. Preserve the remaining workflow descriptions, specification rows, operational scorecard and existing pages. Logistics retains its large, softly feathered photography block. On phones, move the video emphasis below the reading area and keep the robot and cable connection in the crop.

Background films are muted, loop inline, and use audio-free H.264 MP4s with faststart. Use 1080p on desktop and 720p on phones. Load video only when its section enters the viewport, pause offscreen and in hidden tabs, and keep a poster available on load or playback failure. Respect reduced-motion and data-saving preferences by showing the poster until explicit play. Each film has a keyboard-accessible play/pause control with a visible focus indicator.

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
