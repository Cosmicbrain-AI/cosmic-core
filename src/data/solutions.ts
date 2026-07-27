export type UseCase = {
  code: string;
  name: string;
  desc: string;
  points: string[];
};

export type Solution = {
  slug: string;
  code: string;
  name: string;
  short: string;
  tagline: string;
  intro: string;
  useCases: UseCase[];
  checklist: { category: string; items: string[] }[];
  deployments?: { site: string; robot: string; note: string }[];
  /** robot tags/keywords used to surface matching platforms from the catalog */
  matchTags: string[];
};

export const solutions: Solution[] = [
  {
    slug: "manufacturing",
    code: "S-01",
    name: "Manufacturing",
    short: "Assembly, machine tending, inspection",
    tagline: "Humanoids on the line, working the same stations as people.",
    intro:
      "Factories are built around human reach, human tools, and human workflows — which makes them the natural first home for humanoid labor. The platforms below are being piloted for assembly assist, machine tending, inspection, and material movement. CosmicBrain adds the teleop, data, and deployment layer that turns a pilot cell into a production line.",
    useCases: [
      {
        code: "A",
        name: "Assembly Assist",
        desc: "Holding parts, feeding components, driving fasteners, and running repetitive sub-assembly steps next to human operators.",
        points: [
          "Start with one repeatable, ergonomically painful task",
          "Collaborative operation needs safety docs plus an on-site risk assessment",
          "Measure changeover time on your product mix, not the demo's",
        ],
      },
      {
        code: "T",
        name: "Machine Tending",
        desc: "Loading and unloading CNC machines, injection molders, and press brakes with consistent cycle discipline.",
        points: [
          "Prove one cell before assuming multi-machine coverage",
          "Test your real part geometry and fixturing, not sample parts",
          "Controller integration is a procurement requirement, not a nice-to-have",
        ],
      },
      {
        code: "Q",
        name: "Quality Inspection",
        desc: "Visual and tactile inspection of parts and packaging with data traceable to unit, batch, or work order.",
        points: [
          "Validate thresholds against your existing quality system",
          "Keep a human review path for ambiguous findings",
          "Traceability is the value — insist on exportable inspection data",
        ],
      },
      {
        code: "L",
        name: "Material Transport",
        desc: "Moving work-in-process, tools, and supplies between stations, staging areas, and storage.",
        points: [
          "Test navigation around forklifts and shifting layouts",
          "Verify payload against your actual containers",
          "MES / dispatch integration determines real operational value",
        ],
      },
    ],
    deployments: [
      { site: "BMW Spartanburg", robot: "Figure", note: "Factory pilot for parts handling in body-shop workflows." },
      { site: "Mercedes-Benz", robot: "Apptronik Apollo", note: "Automotive manufacturing collaboration for line-side logistics." },
      { site: "Tesla factories", robot: "Optimus", note: "Internal factory tasks; treat public demos as direction, not availability." },
    ],
    checklist: [
      {
        category: "Payload & Dexterity",
        items: [
          "Payload covers your heaviest part-plus-tool combination",
          "Gripper force control for delicate components",
          "Bimanual coordination for two-handed tasks",
          "Repeatability evidence matches application tolerance",
        ],
      },
      {
        category: "Environment & Safety",
        items: [
          "IP rating suits dust, coolant, and washdown",
          "Collaborative safety documentation available",
          "Operating temperature range matches the floor",
          "Noise level acceptable for shared workspaces",
        ],
      },
      {
        category: "Integration",
        items: [
          "PLC / MES / SCADA connectivity confirmed",
          "ROS 2 or vendor SDK for custom tasks",
          "Simulation support for offline validation",
          "Teleop fallback for exception handling",
        ],
      },
    ],
    matchTags: ["manufacturing", "industrial", "assembly", "factory"],
  },
  {
    slug: "warehousing-logistics",
    code: "S-02",
    name: "Warehousing & Logistics",
    short: "Picking, palletizing, trailer work",
    tagline: "Human-shaped labor for the most human-shaped jobs in the warehouse.",
    intro:
      "Warehouses have automated the easy conveyance problems; what's left — picking irregular items, palletizing mixed SKUs, unloading floor-stacked trailers — needs hands, legs, and judgment. That's the humanoid wedge. These platforms target the labor-intensive edges of the DC, and CosmicBrain supplies the remote-operation and data backbone to run them as a fleet.",
    useCases: [
      {
        code: "P",
        name: "Pick & Place",
        desc: "Vision-guided picking of items and cases from shelves, conveyors, and bins — including irregular and deformable stock.",
        points: [
          "Benchmark picks-per-hour on your SKU mix, not vendor demos",
          "No racking modifications is the point — verify it holds on site",
          "Exception handling defines the true automation rate",
        ],
      },
      {
        code: "D",
        name: "Palletizing & Depalletizing",
        desc: "Stacking and breaking down mixed-SKU pallets following optimized load patterns.",
        points: [
          "Verify per-lift payload against your heaviest case",
          "Variable case dimensions must be handled in real time",
          "Removes the highest repetitive-strain-injury task in the DC",
        ],
      },
      {
        code: "K",
        name: "Transport & Kitting",
        desc: "Moving material between zones and kitting parts for downstream lines, dispatched by the WMS.",
        points: [
          "Test navigation in live aisles alongside people and PIT",
          "WMS integration for task dispatch is mandatory",
          "Check real runtime between charges under load",
        ],
      },
      {
        code: "U",
        name: "Trailer Loading & Unloading",
        desc: "Working floor-stacked freight in trailers and containers — hot, tight, high-turnover work.",
        points: [
          "The hardest environment: heat, dust, uneven floors",
          "Case-weight distribution and wall stability matter",
          "Highest-turnover human role in the building — strongest ROI case",
        ],
      },
    ],
    checklist: [
      {
        category: "Throughput",
        items: [
          "Pick-rate benchmarked on your SKU profile",
          "Payload verified per lift, not per spec sheet",
          "Runtime and swap/charge strategy sized to shifts",
        ],
      },
      {
        category: "Environment",
        items: [
          "Operates across dock, aisle, and trailer conditions",
          "Safe among forklifts and human pickers",
          "Handles ambient temperature swings",
        ],
      },
      {
        category: "Systems",
        items: [
          "WMS / WES task-dispatch integration",
          "Fleet dashboard with per-unit telemetry",
          "Remote teleop takeover for exceptions",
        ],
      },
    ],
    matchTags: ["logistics", "warehouse", "warehousing", "material-handling"],
  },
  {
    slug: "healthcare",
    code: "S-03",
    name: "Healthcare",
    short: "Mobility assist, hospital logistics, rehab",
    tagline: "Extra hands for the most understaffed buildings in the economy.",
    intro:
      "Hospitals lose enormous nursing time to transport and lifting — and lifting is the top workplace injury in care. Humanoids are being evaluated for patient mobility assistance, internal logistics, and therapy support. Every healthcare deployment carries regulatory and safety obligations beyond the spec sheet; validate with your clinical governance from day one.",
    useCases: [
      {
        code: "M",
        name: "Patient Mobility Assistance",
        desc: "Supporting sit-to-stand, bed-to-wheelchair transfers, and assisted walking under force control.",
        points: [
          "Force-controlled lifting across realistic patient weights",
          "Directly targets the top injury among caregivers",
          "Around-the-clock availability for fall-risk patients",
        ],
      },
      {
        code: "H",
        name: "Hospital Logistics",
        desc: "Delivering medications, meals, linens, and lab samples between departments — through elevators and secured doors.",
        points: [
          "Chain-of-custody (RFID/barcode) for medication runs",
          "Frees meaningful nursing time from transport",
          "Access-control integration is the deployment blocker to check first",
        ],
      },
      {
        code: "R",
        name: "Rehabilitation Therapy",
        desc: "Guided exercises with repetition counts, motion-quality feedback, and progress reporting for recovery programs.",
        points: [
          "Consistency is the clinical value: same protocol, every session",
          "Engagement rises with interactive, gamified sessions",
          "Data should flow to the EHR for therapist review",
        ],
      },
      {
        code: "C",
        name: "Companionship & Cognitive Care",
        desc: "Social interaction, reminders, and cognitive engagement for elderly and memory-care residents.",
        points: [
          "Supervision model must be explicit — assistive, not autonomous care",
          "Privacy posture and recording policy reviewed by governance",
          "Measure outcomes, not novelty: engagement and staff load",
        ],
      },
    ],
    checklist: [
      {
        category: "Safety & Compliance",
        items: [
          "Force/torque limits documented for human contact",
          "Infection control: cleanable surfaces, protocols",
          "Regulatory pathway understood for your jurisdiction",
        ],
      },
      {
        category: "Clinical Fit",
        items: [
          "Pilot scoped with clinical staff, not just IT",
          "EHR / nurse-call integration available",
          "Fail-safe behavior around vulnerable patients",
        ],
      },
    ],
    matchTags: ["healthcare", "medical", "care", "assistance", "rehabilitation"],
  },
  {
    slug: "hospitality-retail",
    code: "S-04",
    name: "Hospitality & Retail",
    short: "Concierge, product guidance, back-of-house",
    tagline: "Front-of-house presence, back-of-house throughput.",
    intro:
      "Customer-facing humanoids trade on reliability and presence: a greeter that crashes is worse than no greeter. The near-term wins are repeatable guest interactions and back-of-house support where integration with POS and inventory systems does the heavy lifting. Measure customer-experience impact separately from operational throughput.",
    useCases: [
      {
        code: "G",
        name: "Greeting & Concierge",
        desc: "Welcoming guests, answering repeatable questions, and giving directions in lobbies, venues, and reception areas.",
        points: [
          "Design the staff handoff before the pilot, not after",
          "Verify multilingual support per vendor package",
          "Measure queue impact against the venue baseline",
        ],
      },
      {
        code: "P",
        name: "Retail Product Guidance",
        desc: "Helping shoppers locate products, compare specs, and check stock — with a clean handoff to staff.",
        points: [
          "Needs live inventory integration to be more than a kiosk",
          "Aggregate interaction analytics only with a privacy review",
          "Handoff path to humans is the make-or-break UX detail",
        ],
      },
      {
        code: "B",
        name: "Back-of-House Support",
        desc: "Inventory checks, shelf-readiness review, and stockroom-to-floor replenishment coordination.",
        points: [
          "Requires verified POS / inventory / task-routing integration",
          "Less glamorous, better ROI than front-of-house",
          "Pilot metrics: separate CX impact from throughput",
        ],
      },
      {
        code: "F",
        name: "Restaurant & Venue Service",
        desc: "Food running, bussing support, and event assistance in high-traffic spaces.",
        points: [
          "Navigation among crowds is the hard problem — test at peak",
          "Spill/breakage handling policy needed up front",
          "Uptime through a full service window, not a demo hour",
        ],
      },
    ],
    checklist: [
      {
        category: "Guest Experience",
        items: [
          "Reliability across a full operating day",
          "Voice interaction quality in noisy spaces",
          "Brand-appropriate appearance and behavior",
        ],
      },
      {
        category: "Operations",
        items: [
          "POS / inventory / booking system integrations",
          "Staff handoff and escalation flows designed",
          "Service and support SLA fits venue hours",
        ],
      },
    ],
    matchTags: ["retail", "hospitality", "service", "reception", "entertainment"],
  },
  {
    slug: "research-education",
    code: "S-05",
    name: "Research & Education",
    short: "Lab platforms, STEM programs, clinical studies",
    tagline: "The platforms the next generation of robotics gets built on.",
    intro:
      "Research buyers need something different from operators: full control access, sensor logs, simulation assets, and reproducibility. Education buyers need durability, curriculum, and a path from block programming to real code. This is where most humanoid platforms actually ship today — and where CosmicBrain's data tooling plugs directly into experiment pipelines.",
    useCases: [
      {
        code: "LAB",
        name: "University Research Labs",
        desc: "Locomotion, manipulation, perception, and whole-body control research with reproducible experiment design.",
        points: [
          "Match control access (torque-level vs. API) to your agenda",
          "Confirm simulation assets before hardware purchase",
          "Require logs, raw sensor access, repeatable setup",
        ],
      },
      {
        code: "EDU",
        name: "STEM Programs",
        desc: "Teaching programming, systems thinking, and embodied computing from K-12 through university.",
        points: [
          "Curriculum materials and beginner tooling matter most",
          "Plan charging, storage, and repair logistics",
          "Platform should grow from blocks to real code",
        ],
      },
      {
        code: "CARE",
        name: "Clinical & Rehab Research",
        desc: "Controlled social-interaction and therapy-adjacent studies with human subjects.",
        points: [
          "Ethics-board evidence and safety docs up front",
          "Data handling must meet human-subject standards",
          "Repeatability across sessions is the scientific requirement",
        ],
      },
      {
        code: "COMP",
        name: "Competitions & Benchmarks",
        desc: "RoboCup, challenge events, and standardized benchmark development on affordable hardware.",
        points: [
          "Crash-survivability and spare parts availability",
          "Community ecosystem and open tooling",
          "Cost per unit low enough for a team fleet",
        ],
      },
    ],
    checklist: [
      {
        category: "Openness",
        items: [
          "SDK depth: joint-level control vs. black box",
          "ROS 2 support and community packages",
          "Simulation model (URDF/MJCF) provided",
        ],
      },
      {
        category: "Practicality",
        items: [
          "Repairability and spare-part lead times",
          "Documentation quality and example code",
          "Total cost fits a grant cycle",
        ],
      },
    ],
    matchTags: ["research", "education", "developer-platform", "open-source"],
  },
  {
    slug: "general-purpose",
    code: "S-06",
    name: "General Purpose",
    short: "Multi-role pilots, home assistance, demos",
    tagline: "One platform, many jobs — evaluated honestly.",
    intro:
      "\"General purpose\" is the promise of the category and the easiest place to overbuy. The honest general-purpose pilot keeps scope flexible while converging on one production workflow; home assistance and demonstrations have their own, narrower success criteria. If your workload is clearly manufacturing or logistics, start on those pages instead.",
    useCases: [
      {
        code: "OPS",
        name: "Multi-Role Facility Operations",
        desc: "One platform covering material movement, inspection, stocking, and adjacent workflows in a single site.",
        points: [
          "Flexibility is for the pilot; production needs one owned workflow",
          "If a vertical page fits your site better, use it",
          "Test vendor support before assuming every task is ready",
        ],
      },
      {
        code: "HOME",
        name: "Personal & Home Assistance",
        desc: "Household chores, mobility around people, and remote-support operating models for the home.",
        points: [
          "Separate the consumer promise from what ships today",
          "Supervision, privacy, and household safety reviewed explicitly",
          "Track this even if you buy later — the space moves fast",
        ],
      },
      {
        code: "DEMO",
        name: "Technology Demonstration",
        desc: "Showrooms, investor demos, education, and internal alignment ahead of a production deployment.",
        points: [
          "Reliability and presentation beat raw capability here",
          "A demo unit teaches platform limits cheaply",
          "Natural stepping stone to a scoped operational pilot",
        ],
      },
      {
        code: "PILOT",
        name: "Exploratory Pilot Programs",
        desc: "Structured evaluation when the first production workflow hasn't been chosen yet.",
        points: [
          "Timebox the exploration and define exit criteria",
          "Instrument everything — the data is the deliverable",
          "CosmicBrain teleop covers the autonomy gaps during evaluation",
        ],
      },
    ],
    checklist: [
      {
        category: "Platform",
        items: [
          "Task breadth demonstrated, not just claimed",
          "Teleop fallback for tasks autonomy can't finish",
          "Fleet management and OTA update story",
        ],
      },
      {
        category: "Program",
        items: [
          "Pilot has an owner, budget, and exit criteria",
          "Data collection plan from day one",
          "Path from pilot to production priced up front",
        ],
      },
    ],
    matchTags: ["general-purpose", "commercial", "home-service", "bipedal"],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
