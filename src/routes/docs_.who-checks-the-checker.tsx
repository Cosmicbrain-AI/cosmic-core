import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "@/components/explore/explore.css";
import "@/components/explore/research-article.css";

const title = "Who Checks the Checker? · CosmicBrain Research";
const description =
  "An independent audit of automated demonstration scoring on 323 teleoperated robot episodes, a proposed telemetry-first verifier stack and a protocol for testing downstream predictive validity.";
const url = "https://www.cosmicbrain.ai/docs/who-checks-the-checker";
const image = "https://www.cosmicbrain.ai/docs/who-checks-the-checker/score-distribution.png";

export const Route = createFileRoute("/docs_/who-checks-the-checker")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1124" },
      { property: "og:image:height", content: "551" },
      {
        property: "og:image:alt",
        content:
          "Quality scores for 323 robot episodes cluster near the top of the scale, with mean 8.88 out of 10.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:url", content: url },
      { name: "twitter:image", content: image },
      {
        name: "twitter:image:alt",
        content:
          "Quality scores for 323 robot episodes cluster near the top of the scale, with mean 8.88 out of 10.",
      },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: WhoChecksTheCheckerArticle,
});

const contents = [
  ["abstract", "Abstract"],
  ["introduction", "Introduction"],
  ["related-work", "Related work"],
  ["audit-setup", "Audit setup"],
  ["results", "Results"],
  ["verifier-stack", "Verifier stack"],
  ["validation", "Validation protocol"],
  ["discussion", "Discussion and limits"],
  ["conclusion", "Conclusion"],
  ["references", "References"],
  ["implementation", "Implementation plan"],
  ["capture-schema", "Capture schema"],
  ["reproducibility", "Reproducibility"],
];

const corpus = [
  ["Episodes / duration", "323 episodes / 9.4 h; mean 105 s (range 20 to 291 s)"],
  [
    "Categories (service)",
    "Bimanual manipulation 188, insertion 75, pick and place 43, other 11, pouring 5, folding 1",
  ],
  ["Distinct task titles", "189 titles describing roughly 10 underlying tasks"],
  ["Operator identifiers", "None"],
  ["Review coverage", "100% of episodes carry a quality grade"],
];
const scoreBands = [
  ["9.5 to 10.0", "70", "22%"],
  ["9.0 to 9.5", "96", "30%"],
  ["8.0 to 9.0", "126", "39%"],
  ["7.0 to 8.0", "20", "6%"],
  ["6.0 to 7.0", "6", "2%"],
  ["Below 6.0", "5", "2%"],
];
const taskScores = [
  ["RAM insertion", "86", "9.30", "9.4", "7.4", "10.0", "31 s"],
  ["Alcohol lamp", "26", "9.12", "9.4", "3.7", "9.9", "232 s"],
  ["Documents / drawer", "37", "9.06", "9.4", "7.0", "9.8", "121 s"],
  ["Other", "17", "9.05", "9.1", "7.0", "9.9", "126 s"],
  ["Box packing", "74", "8.95", "8.95", "8.5", "10.0", "158 s"],
  ["First aid / medicine", "69", "8.34", "8.6", "5.3", "9.2", "80 s"],
  ["Locker / cloth", "14", "7.41", "7.6", "5.2", "8.8", "106 s"],
];
const cases = [
  ["3.7", "Success", "Turn on the desk lamp", "Completion 10; arm visibility 0 from wrist camera"],
  [
    "10.0",
    "Needs review",
    "Place the RAM stick into the yellow tray",
    "Completion raised 2.0 to 10; label agreement 50%",
  ],
  ["5.2", "Needs review", "Place the towel on the cabinet door", "Lowest-scoring locker task"],
  [
    "5.3",
    "Needs review",
    "Place the white medicine bottle into the first aid box",
    "Small-object placement",
  ],
  ["5.3", "Inconclusive", "Place the clothes into the laundry basket", "20 s episode"],
  [
    "5.7",
    "Inconclusive",
    "Place the white medicine bottles into the medical kit",
    "Small-object placement",
  ],
];
const findings = [
  [
    "F1",
    "Video-only scoring",
    "0% weight on robot measurements",
    "Ignores recorded state and actions",
  ],
  [
    "F2",
    "Camera-dependent facets",
    "3.7 on a successful episode (wrist view)",
    "Scores track camera choice",
  ],
  [
    "F3",
    "One-way correction",
    "Review can only raise low readings",
    "Upward bias; compressed top of scale",
  ],
  [
    "F4",
    "Low reviewer agreement",
    "70% flagged; 59 to 70% grade agreement",
    "Verdicts are contested",
  ],
  [
    "F5",
    "Score and grade disagree",
    "90% score at least 8; about 1% clean",
    "Unclear which signal to trust",
  ],
  ["F6", "Efficiency ignored", "Duration vs score r = 0.07", "Slow and fast demos rank equally"],
  [
    "F7",
    "Label vocabulary drift",
    "Partial vs inconclusive across views",
    "Brittle downstream automation",
  ],
  ["F8", "Task-title sprawl", "189 titles for about 10 tasks", "Fragmented per-task statistics"],
  ["F9", "No operator attribution", "Every category not attributed", "Operator scoring inactive"],
];
const verifiers = [
  [
    "Telemetry rules",
    "State, actions, gripper, F/T, timing",
    "Drops, collisions, stalls, unsafe velocity",
    "High (in scope)",
    "Near zero",
    "Hard gates",
  ],
  [
    "Multi-view VLM judge",
    "All cameras",
    "Semantic success, wrong object or placement",
    "Medium",
    "Low",
    "Outcome and evidence text",
  ],
  [
    "Learned success detector",
    "Video and telemetry",
    "Task-specific success at scale",
    "Medium-high",
    "Low",
    "Runtime hand-off; RL reward",
  ],
  [
    "Calibrated human panel",
    "Replay and ledger",
    "Ambiguous cases; ground truth",
    "High",
    "High",
    "Disagreements; audits",
  ],
  [
    "Simulation replay",
    "Recorded actions",
    "Kinematic infeasibility; sync errors",
    "Medium",
    "Medium",
    "Dataset certification",
  ],
];
const metrics = [
  [
    "Episode verdict",
    "Success, partial or fail with calibrated confidence and evidence spans",
    "All",
  ],
  [
    "Readiness",
    "Share of hard gates passed (synchronization, completeness, telemetry present, rights)",
    "Data QC; buyer receipts",
  ],
  [
    "Execution quality",
    "Completion × efficiency (vs task baseline) × smoothness × safety events",
    "Operator scoring; ranking",
  ],
  [
    "Operator score",
    "Difficulty-adjusted execution quality per operator, with trend",
    "Coaching; certification",
  ],
  [
    "Policy success rate",
    "Verified successes over attempts on a fixed suite, with 95% CI",
    "Policy evaluation",
  ],
  [
    "Operator minutes per task",
    "Teleoperation and supervision minutes per verified completed task",
    "Operations KPI",
  ],
  [
    "Verifier agreement",
    "Cohen’s kappa between verifiers and against human audits",
    "Health of the stack",
  ],
];
const validation = [
  [
    "Predictive validity",
    "Train the same policy (e.g., ACT or diffusion in LeRobot [4]) on equal-size top-ranked, bottom-ranked and random subsets; evaluate on a fixed simulated and real suite.",
    "Top > random > bottom, significant at the 95% level",
  ],
  [
    "Human agreement",
    "Expert panel labels a stratified random sample of 100 episodes, including high scorers.",
    "Cohen’s kappa at least 0.6; no directional bias",
  ],
  [
    "Invariance",
    "Re-score the same episodes from different single cameras and with telemetry withheld.",
    "Stable verdicts across cameras; telemetry improves agreement",
  ],
];
const buildBuy = [
  [
    "Service A (audited) [8]",
    "Operator, task and episode scoring; readable evidence",
    "Video-only; one-way correction; no evals",
    "Triage once data has operator IDs",
  ],
  [
    "Data-readiness service [10]",
    "Readiness checks; annotation layers",
    "Hosted only; early",
    "Monitor",
  ],
  [
    "Commercial visualization platform",
    "Mature visualization and fleet data",
    "No verdicts or evals",
    "Later, fleet operations",
  ],
  ["Open-source visualization tool", "Inspection and queries", "No verdicts", "Inspection now"],
  ["In-house stack", "Telemetry verifiers, ledger, takeover data", "Engineering effort", "Build"],
];
const milestones = [
  [
    "0 to 2",
    "Licensing review for third-party data; written questions to scoring vendors",
    "Policy documented; vendor answers received",
  ],
  [
    "1 to 7",
    "Recorder: MCAP, telemetry, operator, site and task IDs",
    "50 labeled episodes export to LeRobot and replay in simulation",
  ],
  [
    "4 to 10",
    "Verifier v0: telemetry rules and all-camera VLM judge",
    "Agreement with human audit measured",
  ],
  [
    "6 to 10",
    "Predictive-validity experiment (Table 8)",
    "Top, bottom and random results with CIs",
  ],
  [
    "9 to 14",
    "Evidence ledger and operator scoring",
    "Per-operator trends on first-party sessions",
  ],
  ["12 to 18", "Runtime success and stuck detector", "Used for hand-off on the first pilot"],
];

function ArticleTable({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="research-table-scroll" role="region" aria-label={caption} tabIndex={0}>
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {headers.map((header) => (
              <th scope="col" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, ...values], rowIndex) => (
            <tr key={`${label}-${rowIndex}`}>
              <th scope="row">{label}</th>
              {values.map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ArticleFigure({
  file,
  width,
  height,
  alt,
  children,
}: {
  file: string;
  width: number;
  height: number;
  alt: string;
  children: ReactNode;
}) {
  const src = `/docs/who-checks-the-checker/${file}.png`;
  return (
    <figure className="research-figure">
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open full-size figure: ${alt}`}
      >
        <img src={src} width={width} height={height} alt={alt} loading="lazy" />
      </a>
      <figcaption>{children}</figcaption>
    </figure>
  );
}

function WhoChecksTheCheckerArticle() {
  return (
    <div className="explore-page research-page">
      <SiteHeader />
      <main id="article-top">
        <header className="research-header explore-wrap">
          <Link to="/docs" className="research-back">
            <ArrowLeft size={15} /> All research
          </Link>
          <p className="eyebrow">CosmicBrain AI / Independent evaluation</p>
          <h1>
            Who checks
            <br />
            <em>the checker?</em>
          </h1>
          <p className="research-subtitle">
            Auditing Automated Demonstration Scoring for Teleoperated Robot Data, and a
            Telemetry-First Verifier Stack
          </p>
          <div className="research-meta">
            <time dateTime="2026-10-02">October 2, 2026</time>
            <span>Preprint</span>
            <span>CosmicBrain AI</span>
            <span>Read online</span>
          </div>
          <p className="research-deck">
            An audit of automated demonstration scoring on 323 teleoperated bimanual episodes, and a
            proposed verifier stack that connects robot telemetry, human review and an auditable
            evidence ledger.
          </p>
          <p className="research-scope">
            One commercial service and one public teleoperation sample. The proposed stack and
            downstream predictive-validity experiment are a design and validation protocol; policy
            training to test that validity had not yet been run.
          </p>
        </header>

        <div className="research-layout explore-wrap">
          <nav className="research-contents" aria-label="In this paper">
            <span className="eyebrow">In this paper</span>
            {contents.map(([id, label]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </nav>
          <article className="research-body" aria-label="Who Checks the Checker research paper">
            <section id="abstract" aria-labelledby="abstract-title">
              <h2 id="abstract-title">Abstract</h2>
              <p>
                Deciding whether a robot completed a task underlies training-data curation, policy
                evaluation, reinforcement-learning reward and the decision to hand control to a
                remote operator. Automated scoring services now offer such verdicts for teleoperated
                demonstrations, but their reliability is rarely measured. We audit one commercial
                service on <strong>323 teleoperated bimanual episodes (9.4 hours)</strong> from a
                public humanoid teleoperation sample.
              </p>
              <p>
                Headline scores are high (mean 8.88 of 10; 84.2% success) yet fail several
                reliability checks: scores are derived entirely from a single camera view with zero
                weight on robot telemetry; human corrections only raise scores; 70% of episodes are
                flagged for reviewer disagreement; about 1% of episodes receive a clean quality
                grade despite 90% scoring 8 or higher; and score is uncorrelated with episode
                duration (Pearson r = 0.07). Operator-level scoring could not run because the data
                carried no operator identifiers. We conclude that video-only scoring is suitable for
                triage but not for filtering training data.
              </p>
              <p>
                We then propose a telemetry-first verifier ensemble with two-way correction,
                disagreement routing to calibrated humans and an auditable evidence ledger that
                serves data quality control, policy evaluation and runtime operations from a single
                stack, together with a validation protocol that accepts a scoring method only if it
                predicts downstream policy performance.
              </p>
            </section>

            <section id="introduction" aria-labelledby="introduction-title">
              <h2 id="introduction-title">1 / Introduction</h2>
              <p>
                Physical-AI systems are increasingly trained on teleoperated demonstrations and
                deployed with a remote human in the loop. Every stage of this pipeline relies on a
                verifier: a procedure that decides whether an attempted task succeeded and how well
                it was executed. Verifiers select training data, compare policies, supply reward for
                reinforcement learning, and decide at run time when a robot is stuck and an operator
                must intervene. A recent survey of roughly 150 verifiers for robot policies argues
                that verification faces an inherent trade-off: credibility falls as availability
                rises <a href="#ref-1">[1]</a>. Human experts are credible but slow and costly;
                automated checks are cheap and constant but less trustworthy.
              </p>
              <p>
                Commercial services have begun to sell automated demonstration scoring to robotics
                teams <a href="#ref-8">[8]</a>, <a href="#ref-10">[10]</a>. If such scores are used
                to filter training data or to certify datasets for buyers, their failure modes
                propagate directly into trained policies and into commercial claims. Yet independent
                audits of these scores are scarce. This paper makes three contributions:
              </p>
              <ul>
                <li>
                  An audit of a commercial demonstration-scoring service on 323 public teleoperation
                  episodes, quantifying score distribution, label consistency, reviewer agreement
                  and sensitivity to camera choice (Sections 3 and 4).
                </li>
                <li>
                  A design for a telemetry-first verifier stack and evidence ledger that serves data
                  curation, policy evaluation and runtime operations from a single set of verdicts
                  (Section 5).
                </li>
                <li>
                  A validation protocol that accepts a scoring method only if it predicts downstream
                  policy performance, agrees with expert humans without directional bias, and is
                  invariant to camera choice (Section 6).
                </li>
              </ul>
            </section>

            <section id="related-work" aria-labelledby="related-work-title">
              <h2 id="related-work-title">2 / Related work</h2>
              <h3>Verifiers for robot policies</h3>
              <p>
                Wan et al. <a href="#ref-1">[1]</a> categorize verifiers by judgment source (human,
                rule-based or formal, learned, and model-intrinsic) and document the
                credibility-availability trade-off and the risk of reward hacking when verifiers are
                used for training. Our audit is an empirical instance of that trade-off for a
                learned, video-based verifier.
              </p>
              <h3>Policy evaluation infrastructure</h3>
              <p>
                RoboArena <a href="#ref-2">[2]</a> scales real-world evaluation through double-blind
                pairwise comparisons across institutions. XPolicyLab <a href="#ref-3">[3]</a>{" "}
                standardizes the interface between policies and simulated or real evaluation
                environments. Open simulation benchmarks <a href="#ref-7">[7]</a> provide
                reproducible evaluation in simulation. These systems address where policies are
                evaluated; we focus on how success is judged, which all of them depend on.
              </p>
              <h3>Data formats and multimodal signals</h3>
              <p>
                LeRobot <a href="#ref-4">[4]</a> standardizes robot-learning datasets, including
                tabular state and action streams alongside video. Tactile-aware VLAs such as T-Rex{" "}
                <a href="#ref-5">[5]</a> show that touch substantially improves force-sensitive
                manipulation, implying that verifiers which ignore non-visual channels miss the
                signals most relevant to contact-rich tasks. DUET <a href="#ref-6">[6]</a> shows
                that human-human demonstrations can substitute for much robot teleoperation,
                increasing the importance of judging the quality of whatever robot data remains.
              </p>
              <h3>Data-quality products</h3>
              <p>
                Commercial services now score teleoperation, handheld-gripper and egocentric
                demonstrations per operator, task and episode <a href="#ref-8">[8]</a>, or offer
                data-readiness checks and annotation layers <a href="#ref-10">[10]</a>. Robotics
                visualization platforms support inspection but do not issue verdicts.
              </p>
            </section>

            <section id="audit-setup" aria-labelledby="audit-setup-title">
              <h2 id="audit-setup-title">3 / Audit setup</h2>
              <h3>3.1 / Data</h3>
              <p>
                We use a publicly released, access-gated teleoperation sample of about ten hours{" "}
                <a href="#ref-9">[9]</a>, recorded on a wheeled bimanual humanoid and stored in the
                LeRobot v3.0 format <a href="#ref-4">[4]</a> at 30 fps. Each frame carries a
                52-dimensional action, a 290-dimensional state vector, a flag indicating the action
                source, and five camera streams. Tasks include RAM-module insertion, refilling and
                extinguishing alcohol lamps, packing medicine into first-aid kits, packing and
                taping boxes, wiping lockers and handling documents.
              </p>
              <h3>3.2 / Scoring system under audit</h3>
              <p>
                The episodes were indexed by a commercial demonstration-scoring service, hereafter
                Service A <a href="#ref-8">[8]</a>, in a workspace we control. The service assigns
                each episode a quality score out of 10 (a weighted blend of facet scores such as arm
                visibility, task engagement, object interaction and task completion), an analysis
                outcome label, a review quality grade (clean, mixed, rough or needs review), and
                free-text evidence with reviewer dissent.
              </p>
              <h3>3.3 / Protocol</h3>
              <p>
                On 2 October 2026 we read all 323 rows of the episode table (score, outcome label,
                issue tag, category, duration and task title), the three report views, and the full
                evidence pages of two episodes selected for contradictory score and label. Task
                titles were mapped to seven task families by keyword rules (first match wins;
                families can overlap semantically). Table 1 summarizes the corpus.
              </p>
              <ArticleTable
                caption="Table 1. Summary of the audited corpus"
                headers={["Property", "Value"]}
                rows={corpus}
              />
            </section>

            <section id="results" aria-labelledby="results-title">
              <h2 id="results-title">4 / Results</h2>
              <h3>4.1 / Score and label distributions</h3>
              <p>
                Scores are concentrated near the top of the scale (Figure 1, Table 2): 90% of
                episodes score 8 or higher and 51% score 9 or higher. The outcome distribution
                reported by the service is 272 success, 39 partial and 12 needs review, an 84.2%
                success rate (Figure 2). The episode table, however, labels the middle group
                inconclusive (38 episodes) while the report labels it partial and lists zero
                inconclusive episodes, indicating vocabulary drift between views.
              </p>
              <ArticleFigure
                file="score-distribution"
                width={1124}
                height={551}
                alt="Histogram of quality scores for 323 episodes, concentrated between 8 and 10, with mean 8.88 marked by a dashed line."
              >
                <strong>Figure 1.</strong> Distribution of quality scores over 323 episodes. The
                dashed line marks the mean (8.88). Select any figure to inspect it at full size.
              </ArticleFigure>
              <ArticleTable
                caption="Table 2. Episodes by score band"
                headers={["Score band", "Episodes", "Share"]}
                rows={scoreBands}
              />
              <ArticleFigure
                file="outcome-labels"
                width={1262}
                height={345}
                alt="Reported outcomes: 272 success (84%), 39 partial or inconclusive (12%), and 12 needs review (4%)."
              >
                <strong>Figure 2.</strong> Analysis outcome labels as reported by the service.
              </ArticleFigure>

              <h3>4.2 / Variation across tasks</h3>
              <p>
                Contact-rich and fine-placement tasks score lowest: locker and cloth tasks average
                7.41 and medicine-to-first-aid-kit tasks 8.34, while short RAM insertions average
                9.30 (Figure 3, Table 3). Insertion episodes are short (31 s on average) and end in
                a visually distinctive state, which plausibly favors a video-based judge;
                contact-rich tasks are where a single camera is least informative.
              </p>
              <ArticleFigure
                file="task-family-scores"
                width={1451}
                height={611}
                alt="Box plots of quality scores by seven task families, with lower means for first aid and medicine (8.34) and locker and cloth (7.41) than RAM insertion (9.30)."
              >
                <strong>Figure 3.</strong> Quality score by task family, sorted by mean. Boxes show
                the interquartile range; red points are outliers.
              </ArticleFigure>
              <ArticleTable
                caption="Table 3. Score statistics by task family"
                headers={["Task family", "n", "Mean", "Median", "Min", "Max", "Mean length"]}
                rows={taskScores}
              />

              <h3>4.3 / Reliability of verdicts</h3>
              <p>
                The service reports reviewer agreement per category (Figure 4). Outcome agreement
                ranges from 67% (insertion) to 86% (bimanual), and quality-grade agreement from 59%
                to 70%. In total 227 of 323 episodes (70%) are flagged for panel disagreement,
                reaching 81% for insertion. Quality grades are almost uniformly mixed: the clean
                share is 1% for bimanual manipulation (2 of 188), 0% for insertion and 2% for pick
                and place, which is difficult to reconcile with a score distribution in which 90% of
                episodes score at least 8.
              </p>
              <ArticleFigure
                file="reviewer-agreement"
                width={1124}
                height={596}
                alt="Outcome agreement, quality-grade agreement and panel-disagreement share, in percent: bimanual 86/64/69; insertion 67/59/81; pick and place 69/63/67; manipulation other 75/66/not reported; pouring 83/70/20."
              >
                <strong>Figure 4.</strong> Reviewer agreement and the share of episodes flagged for
                panel disagreement, by category. The disagreement share for manipulation other was
                not reported in the view we accessed.
              </ArticleFigure>
              <p>
                Score is also unrelated to execution time. Across all episodes the Pearson
                correlation between duration and score is 0.07 (Figure 5); the visible clusters
                correspond to tasks, not to execution quality. A slow, hesitant demonstration and a
                fast, clean one can therefore receive the same score. Finally, score and label
                frequently disagree: 6 episodes labeled success score below 7, and 5 non-success
                episodes score 9 or higher.
              </p>
              <ArticleFigure
                file="duration-and-score"
                width={1205}
                height={627}
                alt="Scatter plot of episode length in seconds against quality score, colored by category. Clusters reflect tasks and Pearson correlation is 0.07."
              >
                <strong>Figure 5.</strong> Episode duration against quality score, colored by the
                service’s category (Pearson r = 0.07).
              </ArticleFigure>

              <h3>4.4 / Case analysis</h3>
              <p>
                We inspected the evidence pages of the two most contradictory episodes (Figure 6,
                Table 4). Both state that the score is a provisional blend of 100% recorded view and
                0% robot measurements, although the dataset includes full joint state and actions.
              </p>
              <ul>
                <li>
                  <strong>Turn on the desk lamp (score 3.7, labeled success).</strong> The lamp is
                  lit at the end and task completion scores 10. The total is pulled down by an
                  arm-visibility facet of 0, because the scored camera is a wrist view that cannot
                  show the robot’s arms. The low score reflects camera selection, not execution.
                </li>
                <li>
                  <strong>
                    Place the RAM stick into the yellow tray (score 10.0, labeled needs review).
                  </strong>{" "}
                  The written evidence states that the insertion attempt is clear but completion is
                  not. Automated completion read 2.0 and was raised to 10 by video review; the
                  service notes that review only examines low readings and can only raise them.
                  Label agreement is 50%, and the task title does not match the observed behavior.
                </li>
              </ul>
              <ArticleFigure
                file="contradictory-facets"
                width={1280}
                height={486}
                alt="Lamp episode facets: arm visibility 0, task engagement 1.1, task completion 10. RAM episode facets: arm visibility, task engagement, object interaction and task completion all 10, with completion raised from automated 2.0 by one-way video review."
              >
                <strong>Figure 6.</strong> Published facet scores for the two contradictory
                episodes. Facets are equally weighted within each episode.
              </ArticleFigure>
              <ArticleTable
                caption="Table 4. Lowest-scoring and contradictory episodes"
                headers={["Score", "Label", "Task", "Observation"]}
                rows={cases}
              />

              <h3>4.5 / Summary of findings</h3>
              <ArticleTable
                caption="Table 5. Findings of the audit"
                headers={["ID", "Finding", "Evidence", "Consequence"]}
                rows={findings}
              />
              <p>
                Taken together, the scores are useful for triage: they surface, within minutes, the
                20 to 60 episodes that merit human review, with readable evidence. They are not yet
                credible enough to filter training data or to certify datasets for third parties,
                and the decisive test of whether higher-scored episodes yield better policies has
                not been run.
              </p>
            </section>

            <section id="verifier-stack" aria-labelledby="verifier-stack-title">
              <h2 id="verifier-stack-title">5 / A telemetry-first verifier stack</h2>
              <p>
                We propose an evaluation layer in which a single ensemble of verifiers produces one
                verdict per episode, policy rollout or live task attempt, recorded with its
                confidence and evidence in a versioned ledger (Figure 7). The same verdicts drive
                data quality control, policy evaluation and runtime hand-off; takeovers and failures
                flow back into capture as labeled training data.
              </p>
              <ArticleFigure
                file="verifier-stack"
                width={1063}
                height={702}
                alt="Capture and normalization feed a verifier ensemble and a versioned evidence ledger. The ledger serves data QC, policy evaluations and runtime operations. Takeovers, failures and recoveries return to capture as labeled training data."
              >
                <strong>Figure 7.</strong> Architecture of the proposed evaluation layer: capture
                and normalization, a verifier ensemble, an evidence ledger, and three consumers. The
                dashed path returns takeovers, failures and recoveries to capture as labeled data.
              </ArticleFigure>
              <details className="research-data-details">
                <summary>Read the architecture in Figure 7</summary>
                <ul>
                  <li>
                    <strong>Capture:</strong> teleop recorder, MCAP + protobuf, all cameras, joint
                    state, actions, F/T, tactile, operator + site IDs.
                  </li>
                  <li>
                    <strong>Normalize:</strong> episodize, clock-align, task-name ontology, standard
                    dataset export, provenance + rights tag.
                  </li>
                  <li>
                    <strong>Verifier ensemble:</strong> telemetry rules (contact, force, pose,
                    timing), multi-view VLM judge (all cameras), learned success detector,
                    calibrated human panel, two-way correction, disagreement routed to a human.
                  </li>
                  <li>
                    <strong>Evidence ledger:</strong> per-episode verdict + confidence + evidence
                    spans, operator / task / site attribution, versioned and content-hashed,
                    auditable; the insurer- and buyer-facing record.
                  </li>
                  <li>
                    <strong>Data QC:</strong> keep / fix / drop per episode, operator scores +
                    coaching, dataset readiness receipts for OEM data buyers.
                  </li>
                  <li>
                    <strong>Policy evals:</strong> fixed simulation suites, fixed real-robot
                    protocol, A/B on site tasks, reward for RL fine-tuning.
                  </li>
                  <li>
                    <strong>Runtime ops:</strong> success / stuck detection, hand-off to remote
                    operator, log takeover as labeled data, operator-minutes-per-task KPI.
                  </li>
                </ul>
              </details>
              <h3>5.1 / Design principles</h3>
              <ul>
                <li>
                  <strong>Telemetry first.</strong> Joint state, actions, gripper state,
                  force/torque and tactile channels are cheaper and more objective than pixels;
                  video is used where telemetry is silent (addresses F1).
                </li>
                <li>
                  <strong>All cameras, camera-invariant facets.</strong> No facet may depend on
                  which single camera was selected (F2).
                </li>
                <li>
                  <strong>Two-way correction.</strong> Humans audit a random sample of high scores
                  as well as low ones, and every correction is logged (F3).
                </li>
                <li>
                  <strong>Disagreement as a routing signal.</strong> When verifiers disagree, the
                  episode is routed to a calibrated human and the disagreement is stored (F4, F5).
                </li>
                <li>
                  <strong>Efficiency as a facet.</strong> Time to completion relative to a per-task
                  baseline enters execution quality (F6).
                </li>
                <li>
                  <strong>Attribution and ontology at capture.</strong> Operator, site, robot, task
                  (from a fixed ontology), outcome vocabulary and data-rights tags are written at
                  recording time (F7 to F9).
                </li>
              </ul>
              <h3>5.2 / Verifier ensemble</h3>
              <p>
                Table 6 lists the verifier families. Their combination aims to move the operating
                point up and to the right of the credibility-availability frontier (Figure 8).
              </p>
              <ArticleTable
                caption="Table 6. Verifier families in the proposed ensemble"
                headers={["Verifier", "Signal", "Detects", "Credibility", "Cost", "Role"]}
                rows={verifiers}
              />
              <ArticleFigure
                file="credibility-and-availability"
                width={1127}
                height={537}
                alt="Illustrative credibility versus availability diagram: expert human review is credible but less available; a single-camera VLM and policy self-confidence are more available but less credible. The proposed target combines telemetry rules, all-camera judges and calibrated humans."
              >
                <strong>Figure 8.</strong> Qualitative placement of verifier families on the
                credibility-availability trade-off described in <a href="#ref-1">[1]</a>. Positions
                are illustrative. The diagram includes expert human review, crowd / panel review,
                telemetry rules, a learned success detector, a VLM on one camera (the audited
                service), and policy self-confidence.
              </ArticleFigure>
              <h3>5.3 / Metrics</h3>
              <ArticleTable
                caption="Table 7. Metrics produced by the evaluation layer"
                headers={["Metric", "Definition", "Consumer"]}
                rows={metrics}
              />
            </section>

            <section id="validation" aria-labelledby="validation-title">
              <h2 id="validation-title">6 / Validation protocol</h2>
              <p>
                A scoring method should be trusted for training-data selection only if it passes the
                three tests in Table 8. The first is decisive: a score that does not predict policy
                performance has no value as a filter, however plausible its evidence text.
              </p>
              <ArticleTable
                caption="Table 8. Validation protocol for scoring methods"
                headers={["Test", "Procedure", "Acceptance criterion"]}
                rows={validation}
              />
              <p>
                Policy evaluation follows the same discipline: fixed task suites in simulation{" "}
                <a href="#ref-7">[7]</a> and a written real-robot protocol per deployment site (task
                list, trial counts, reset procedure and success definitions), results reported with
                confidence intervals, and a shared policy-environment adapter in the style of
                XPolicyLab <a href="#ref-3">[3]</a>.
              </p>
            </section>

            <section id="discussion" aria-labelledby="discussion-title">
              <h2 id="discussion-title">7 / Discussion and limitations</h2>
              <h3>Implications</h3>
              <p>
                Verification is the layer through which data quality, policy quality and operational
                cost are all measured. For an operator of supervised robots, the central business
                metric, operator minutes per completed task, is only as trustworthy as the verifier
                that decides a task was completed. This argues for owning the verifier stack while
                using external services for triage and inspection (Table 9).
              </p>
              <ArticleTable
                caption="Table 9. Build-versus-buy summary"
                headers={["Option", "Strength", "Gap", "Use"]}
                rows={buildBuy}
              />
              <h3>Limitations</h3>
              <p>
                We audit one dataset and one service version through its web interface;
                quality-grade counts were available per category rather than per episode; task
                families are keyword-derived; the trade-off figure is qualitative; and we have not
                yet trained policies to test predictive validity. Results may not transfer to other
                robots, tasks or vendors.
              </p>
              <h3>Data and anonymization</h3>
              <p>
                The audited episodes come from an access-gated public dataset{" "}
                <a href="#ref-9">[9]</a>. We report aggregate statistics, and short quoted excerpts
                of published evidence; we do not reproduce dataset imagery or vendor interface
                images, and we anonymize the scoring vendor and the dataset source. The purpose of
                this audit is to characterize a class of methods, video-only demonstration scoring,
                rather than to rank a particular product. Future audits should use first-party
                recordings collected with explicit consent and attribution.
              </p>
            </section>

            <section id="conclusion" aria-labelledby="conclusion-title">
              <h2 id="conclusion-title">8 / Conclusion</h2>
              <p>
                Automated, video-only demonstration scoring produced high and compressed scores that
                disagreed with its own quality grades, depended on camera choice, were corrected
                only upward, and were contested by its own reviewers. Such scores help locate
                episodes worth inspecting but should not yet decide what enters a training set. A
                telemetry-first ensemble with two-way correction, disagreement routing and an
                auditable ledger, validated against downstream policy performance, offers a path to
                verdicts that are both available and credible.
              </p>
            </section>

            <section id="references" aria-labelledby="references-title">
              <h2 id="references-title">References</h2>
              <p id="ref-1">
                [1] Y. Wan, X. Yue, Z. Liu, et al.{" "}
                <em>No free checker: A survey of verifiers for robot policies.</em>{" "}
                <a
                  href="https://arxiv.org/abs/2609.09250"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  arXiv:2609.09250
                </a>
                , 2026.
              </p>
              <p id="ref-2">
                [2]{" "}
                <em>RoboArena: Distributed real-world evaluation of generalist robot policies.</em>{" "}
                <a
                  href="https://arxiv.org/abs/2506.18123"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  arXiv:2506.18123
                </a>
                , 2025.{" "}
                <a href="https://robo-arena.github.io/" target="_blank" rel="noopener noreferrer">
                  robo-arena.github.io
                </a>
                .
              </p>
              <p id="ref-3">
                [3]{" "}
                <em>
                  XPolicyLab: A unified standard and open ecosystem for robot policy evaluation and
                  deployment.
                </em>{" "}
                <a
                  href="https://arxiv.org/abs/2608.09892"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  arXiv:2608.09892
                </a>
                , 2026.
              </p>
              <p id="ref-4">
                [4] <em>LeRobot: An open-source library for end-to-end robot learning.</em>{" "}
                <a
                  href="https://arxiv.org/abs/2602.22818"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  arXiv:2602.22818
                </a>
                , 2026.
              </p>
              <p id="ref-5">
                [5] D. Niu, Z. Liu, Z. Wang, et al.{" "}
                <em>T-Rex: Tactile-reactive dexterous manipulation.</em>{" "}
                <a href="https://tactile-rex.github.io/" target="_blank" rel="noopener noreferrer">
                  tactile-rex.github.io
                </a>
                , 2026.
              </p>
              <p id="ref-6">
                [6] <em>DUET: Dual-robot understanding via efficient teaching.</em>{" "}
                <a href="https://zhaoy37.github.io/Duet/" target="_blank" rel="noopener noreferrer">
                  zhaoy37.github.io/Duet
                </a>
                , 2026.
              </p>
              <p id="ref-7">
                [7] B. Liu, Y. Zhu, C. Gao, et al.{" "}
                <em>LIBERO: Benchmarking knowledge transfer for lifelong robot learning.</em>{" "}
                NeurIPS Datasets and Benchmarks, 2023.
              </p>
              <p id="ref-8">
                [8] Service A. Commercial demonstration-quality scoring service (vendor anonymized);
                workspace accessed 2 October 2026.
              </p>
              <p id="ref-9">
                [9] Public humanoid teleoperation sample, about 10 hours, access-gated release
                (source anonymized), 2026.
              </p>
              <p id="ref-10">
                [10] Commercial data-readiness and annotation service (vendor anonymized), 2026.
              </p>
            </section>

            <section id="implementation" aria-labelledby="implementation-title">
              <h2 id="implementation-title">A / Implementation plan</h2>
              <p>Figure 9 and Table 10 give a 16-week plan for the components in Section 5.</p>
              <ArticleFigure
                file="implementation-plan"
                width={1038}
                height={488}
                alt="Implementation timeline: data rights and vendor questions weeks 0–2; recorder weeks 1–7; verifier v0 weeks 4–10; score-validity experiment weeks 6–10; evidence ledger and operator scoring weeks 9–14; runtime success and stuck detector weeks 12–18."
              >
                <strong>Figure 9.</strong> Implementation plan in weeks.
              </ArticleFigure>
              <ArticleTable
                caption="Table 10. Milestones"
                headers={["Weeks", "Deliverable", "Exit criterion"]}
                rows={milestones}
              />
            </section>

            <section id="capture-schema" aria-labelledby="capture-schema-title">
              <h2 id="capture-schema-title">B / Capture schema</h2>
              <p>
                Episodes are recorded as MCAP with protobuf messages and exported to LeRobot v3.
                Each episode contains all camera streams; measured joint state; commanded actions
                after safety clamps; raw operator XR input; gripper, force/torque and tactile
                channels where present; safety and watchdog events; takeover events (operator, time,
                reason code); and metadata for operator, site, robot, task (from a fixed ontology),
                outcome and data rights. The per-frame action-source flag in{" "}
                <a href="#ref-9">[9]</a> is a useful precedent for recording whether a human or a
                policy was in control.
              </p>
            </section>

            <section id="reproducibility" aria-labelledby="reproducibility-title">
              <h2 id="reproducibility-title">C / Reproducibility</h2>
              <p>
                The per-episode table used for all figures (score, duration, category, outcome
                label, task family and issue flag for 323 episodes) and the scripts that generate
                every figure and table are available from CosmicBrain AI on request. Figures use a
                colorblind-validated categorical palette; green, amber and red are reserved for
                outcome states.
              </p>
            </section>

            <footer className="research-article-footer">
              <p className="eyebrow">CosmicBrain AI / Research</p>
              <p>Independent evaluation and verification for physical AI.</p>
              <Link to="/docs" className="text-link">
                <ArrowLeft size={15} /> Back to all research
              </Link>
              <a className="text-link" href="#article-top">
                Back to top <ArrowUpRight size={15} />
              </a>
            </footer>
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
