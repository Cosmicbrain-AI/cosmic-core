export const annotationExample = {
  provenance:
    "Transcribed from the supplied CosmicBrain figures; underlying episode and judge run were not supplied.",
  episodes: 1,
  seconds: 42,
  segments: 20,
  coveragePercent: 98.5,
  overlaps: 0,
  gapMilliseconds: 33,
  objectsWithAttributes: 15,
  objectCount: 15,
  scores: [
    {
      label: "Label consistency",
      value: 99,
      detail: "1.98 / 2 · reported confidence 0.98",
      kind: "Rubric score",
      color: "#c45734",
    },
    {
      label: "Annotation completeness",
      value: 91,
      detail: "2.73 / 3 · reported confidence 0.73",
      kind: "Rubric score",
      color: "#397e65",
    },
    {
      label: "Task success",
      value: 89,
      detail: "Judge probability 0.89",
      kind: "Model judgment",
      color: "#c88a26",
    },
    {
      label: "Ready for hierarchical policies",
      value: 77,
      detail: "Judge probability 0.77",
      kind: "Model judgment",
      color: "#b95e87",
    },
    {
      label: "Hospitality relevance",
      value: 50,
      detail: "0.99 / 2, rounded · toy sorting task",
      kind: "Rubric score",
      color: "#57764d",
    },
  ],
};

export const protocolSteps = [
  [
    "Freeze the question",
    "Name the workflow, robot embodiment, model checkpoint and task population. Register success predicates, time limit, permitted assistance, stop rules and a trial budget before seeing outcomes.",
  ],
  [
    "Separate the splits",
    "Keep calibration and tuning outside the held-out test set. Group by site, recording session and object instance; do not scatter adjacent frames or near-duplicate trajectories across splits.",
  ],
  [
    "Match the conditions",
    "Record start states, resets, camera calibration, payload and control frequency. Randomize or counterbalance model order within matched site, task and shift blocks. Blind reviewers to model identity where practical.",
  ],
  [
    "Run and record",
    "Log every initiated attempt, including timeouts, interventions and aborts. Timestamp observations, actions, model latency and control ownership against synchronized video. Link each result to its episode manifest.",
  ],
  [
    "Score and adjudicate",
    "Apply the registered success predicate at the required final state. Report subgoal progress separately. Have human reviewers adjudicate ambiguous cases and audit model-judge outputs against a held-out human-labeled set.",
  ],
  [
    "Publish the evidence",
    "Report per-task and per-condition denominators, uncertainty, failure categories and exclusions. Release the protocol version, checkpoint identifiers and permitted artifacts so another team can reproduce the comparison.",
  ],
] as const;

export const metricDefinitions = [
  [
    "Unassisted task success",
    "Attempts meeting the final-state predicate within the time budget, with no human takeover, divided by valid initiated attempts after pre-registered infrastructure exclusions. Publish all initiated and excluded counts.",
    "k / N, with interval",
  ],
  [
    "Assisted completion",
    "Attempts that finish after operator input or physical help. Record assistance type, count and duration; keep these separate from autonomous success.",
    "k assisted / N",
  ],
  [
    "Subgoal completion",
    "Completed required predicates divided by the registered predicate count. A partial score does not count as binary task success.",
    "Per-episode fraction",
  ],
  [
    "Cycle time & latency",
    "Start-to-terminal-state time, with timeouts retained. Show median and p95 for successful runs, the timeout fraction, and policy latency separately.",
    "Seconds / milliseconds",
  ],
  [
    "Interventions & recovery",
    "Share of attempts requiring a takeover; time under human control. Recovery is autonomous completion after a defined recoverable disturbance, on a separately declared subset.",
    "Episodes, seconds, subset N",
  ],
  [
    "Operational incidents",
    "Unexpected contacts, dropped items, boundary violations and stops. Define events and severity before trials; report exposure hours and affected attempts.",
    "Count / exposure",
  ],
] as const;

export const workflows = [
  {
    id: "data-centers",
    label: "Data centers",
    status: "Current deployment vertical",
    task: "Move a sealed parts tote to a designated service staging bay.",
    success:
      "Correct tote reaches the marked bay within the time budget; payload remains intact and the route stays inside the authorized zone.",
    shifts: [
      "Aisle layout and route",
      "Tote instance and payload",
      "Lighting and reflective surfaces",
      "Pedestrian traffic windows",
    ],
    exclusions:
      "Work near live electrical equipment requires a separately authorized task and site-specific operating limits.",
  },
  {
    id: "hospitality",
    label: "Hospitality",
    status: "Current deployment vertical",
    task: "Deliver a supply tote to a designated service point.",
    success:
      "Correct contents reach the correct handoff zone within the time budget, with no unauthorized entry or operator takeover.",
    shifts: [
      "Corridor and floor layout",
      "Door and handoff geometry",
      "Guest traffic and occlusion",
      "Instructions and destination names",
    ],
    exclusions:
      "Agree access permissions and human handoff criteria with the site before evaluation.",
  },
  {
    id: "cloud-kitchens",
    label: "Cloud kitchens",
    status: "Exploratory vertical",
    task: "Sort closed, room-temperature containers into marked staging zones.",
    success:
      "All containers reach their prescribed zones without spills, drops or help, and the station is left in the required final state.",
    shifts: [
      "Container geometry and labels",
      "Counter layout and clutter",
      "Lighting and occlusion",
      "Ordering and task composition",
    ],
    exclusions:
      "Food contact, hot surfaces and sharp tools require additional validation. This example is a protocol scope, not a deployed kitchen capability.",
  },
] as const;

export const generalizationAxes = [
  [
    "Object",
    "Held-out instances, geometry, texture and payload",
    "Known category / new instance; new category separately",
  ],
  [
    "Environment",
    "New site or layout; cameras, lighting and clutter",
    "Within-site changes / held-out sites",
  ],
  [
    "Instruction",
    "Paraphrases, new referents and task compositions",
    "Same intent / new composition",
  ],
  [
    "Temporal",
    "A later session, shift or deployment day",
    "Session-disjoint and time-disjoint results",
  ],
  [
    "Embodiment",
    "A different platform, gripper or action interface",
    "Per-platform results; adaptation budget disclosed",
  ],
] as const;

export const benchmarkReferences = [
  {
    name: "RoboArena",
    type: "Real hardware · distributed evaluation",
    url: "https://robo-arena.github.io/",
    lesson:
      "Distributed, double-blind comparisons across institutions and real environments on the DROID platform.",
    use: "Borrow matched-condition comparisons and blind review for field trials.",
    limit: "Its current platform does not establish performance across every robot brand.",
  },
  {
    name: "LIBERO",
    type: "Simulation · lifelong manipulation",
    url: "https://github.com/Lifelong-Robot-Learning/LIBERO",
    lesson: "Task suites vary spatial relationships, objects, goals and longer-horizon behavior.",
    use: "Use separate suites to examine transfer and retention, rather than one aggregate score.",
    limit: "Simulation success is evidence about that suite, not deployment reliability.",
  },
  {
    name: "RoboCasa",
    type: "Simulation · kitchen manipulation",
    url: "https://robocasa.ai/docs/build/html/benchmarking/benchmarking_overview.html",
    lesson:
      "Kitchen tasks with controlled scene and object diversity, plus training and evaluation splits.",
    use: "Pin the task split, scenario seeds and horizon when comparing policies.",
    limit: "Kitchen simulation does not validate food handling or an operational kitchen.",
  },
  {
    name: "BEHAVIOR",
    type: "Simulation · long-horizon activities",
    url: "https://behavior.stanford.edu/challenge/evaluation.html",
    lesson:
      "Goal-predicate completion and efficiency metrics distinguish progress from complete task execution.",
    use: "Track required subgoals alongside binary completion and time.",
    limit: "Partial progress and human-normalized efficiency are different metrics.",
  },
  {
    name: "ManiSkill",
    type: "Simulation · manipulation tooling",
    url: "https://maniskill.readthedocs.io/en/latest/user_guide/learning_from_demos/setup.html",
    lesson: "Distinguishes success at any point in a rollout from success at its end.",
    use: "Specify terminal-state criteria, simulator backend and control configuration.",
    limit: "Backend differences and reset conditions can change results.",
  },
  {
    name: "LeRobot",
    type: "Open tooling · policy evaluation",
    url: "https://huggingface.co/docs/lerobot/il_robots",
    lesson: "Open policy evaluation tooling records outcomes and rollout videos for inspection.",
    use: "Preserve model, environment and rollout configuration with evaluation artifacts.",
    limit: "Using the tooling alone does not define a standardized field benchmark.",
  },
  {
    name: "DROID",
    type: "Real-world data · policy learning",
    url: "https://github.com/droid-dataset/droid_policy_learning",
    lesson: "Real-world demonstration data, policy training code and a reproducible robot setup.",
    use: "Document camera calibration, data provenance and target-domain adaptation.",
    limit: "A training dataset is not itself a deployment leaderboard.",
  },
] as const;
