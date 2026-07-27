# CosmicBrain — Redesign Brief: "The American Dream, Automated"

Branch: `redesign/american-dream` · Deploy: Vercel **preview** first → promote to www.cosmicbrain.ai on approval.
Media: **Higgsfield** (video + graphics). Model build: **Fable 5**.

## The story we're selling
CosmicBrain is the **data & deployment layer for humanoids** — and the human on-ramp to it.
Two engines, one loop:
1. **Deployment (Teleoperation)** — We put humanoids into every factory, warehouse, and plant in America. **Anyone can make a living logging into a US factory from their home** and operating a robot. This is the new American Dream: a good living, from anywhere, powering American industry.
2. **Data** — Every teleop session and human demonstration captures **rare, first-person physical-world data** you can't get anywhere else. That data trains the **CosmicBrain Robot Foundation Model** — one model that **generalizes across every robot** (we're robot-agnostic, a whole fleet) — driving America to **full automation by 2030.**

Tone: cinematic, patriotic-but-modern, inspiring, ambitious. Think SpaceX × Palantir × a Ford assembly-line poster reimagined for the robot age.

## Section map (single-page scroll)
| # | Section | Message | Media (Higgsfield) |
|---|---------|---------|--------------------|
| 0 | **Hero** | "The American Dream, now runs on robots." Data & deployment layer for humanoids. | HERO video — cinematic humanoid on a sunlit US factory floor, American flag subtle in bg |
| 1 | **Teleop highlight** | "Clock in from your couch. Power a factory in Ohio." Earn a living operating robots from home. | SPLIT video — operator in home office (headset) ⇄ humanoid moving in real warehouse |
| 2 | **Fleet / robot-agnostic** | "One platform. Every robot." A fleet of humanoids, any make. | FLEET video — row of diverse humanoids powering on in unison |
| 3 | **Deployment** | "A humanoid in every American factory." Warehouses, manufacturing, logistics. | FACTORY montage — humanoids working across warehouse/auto-plant/logistics |
| 4 | **Data layer** | "The rarest data in robotics." Captured direct from robots + humans. | DATA viz — first-person robot vision + human demo, streams of tactile/depth data |
| 5 | **Foundation model** | "One model. Every robot. Full automation by 2030." | MODEL viz — abstract neural/brain forming from data streams, generalizing to many robots |
| 6 | **The American Dream** | Inspirational manifesto close — everyone can participate in the automation of America. | GRAPHIC — heroic wide shot, operators + robots, sunrise over industrial America |
| 7 | **CTA** | "Become an operator" / "Deploy a fleet" / "Partner on the model." | — |

## Higgsfield generation queue (fire on auth)
> All prompts assume Higgsfield's cinematic video models. Aspect 16:9, ~5s loops for hero/section backdrops; 9:16 variants for mobile where noted. We'll pick the exact model from `higgsfield model list --video` once authed (Sora 2 / Kling tier).

**V1 — HERO** (16:9, 5s, loopable):
> "Cinematic slow dolly-in on a sleek white-and-orange humanoid robot standing on a sunlit modern American factory floor, golden hour light through tall windows, faint stars-and-stripes motif on a far wall, volumetric dust, shallow depth of field, photoreal, epic and hopeful mood, 35mm."

**V2 — TELEOP SPLIT** (16:9, 6s):
> "Split-screen: left, a relaxed person at home wearing a lightweight VR headset and haptic gloves, cozy sunlit home office; right, in perfect sync a humanoid robot in a busy warehouse picks and places a box. Seamless mirrored motion, warm inviting on the left, crisp industrial on the right, photoreal, inspiring."

**V3 — FLEET** (16:9, 5s):
> "A long row of ten diverse humanoid robots of different designs powering on in unison in a clean hangar, chest lights blink alive down the line, dramatic rim lighting, sense of scale and readiness, photoreal, cinematic."

**V4 — FACTORY MONTAGE** (16:9, 6s):
> "Fast cinematic montage of humanoid robots working across American industry: sorting parcels in a logistics center, assembling cars on an auto line, moving pallets in a warehouse, hopeful energetic tone, natural light, photoreal, motivational commercial feel."

**V5 — DATA VIZ** (16:9, 5s):
> "Abstract data visualization: a humanoid robot's first-person camera view overlaid with glowing depth maps, tactile force rings on fingertips, and streaming point clouds flowing into a bright core, dark background with orange accent light, high-tech, elegant."

**V6 — FOUNDATION MODEL** (16:9, 6s):
> "A luminous brain-like neural network forming out of thousands of flowing data streams, then radiating connections outward to silhouettes of many different robot types that all light up together, dark cinematic space, orange and white glow, awe-inspiring, 2030 futuristic."

**G1 — DREAM HERO STILL** (image, 16:9, for section 6 backdrop):
> "Heroic wide cinematic shot at sunrise over an American industrial skyline, silhouettes of humanoid robots and human operators standing together on a rooftop, warm golden light, hopeful patriotic modern tone, photoreal."

(Plus 9:16 mobile crops of V1, V2 as needed.)

## What's blocked on you
1. **Recharge + auth Higgsfield:** `higgsfield auth login` then `higgsfield account status` (confirm credits). This machine's CLI is ready.
2. **Fable 5:** recharge the claude-cli subscription so OpenClaw routes core back to Fable 5 for the heavy build.

## Build stack (free, no keys)
GSAP + ScrollTrigger (scroll-driven cinematics), Motion (spring/gesture), optional Three.js/R3F for a hero WebGL layer. Higgsfield clips as autoplaying muted looped `<video>` backdrops behind text, with graceful poster-image fallbacks.
