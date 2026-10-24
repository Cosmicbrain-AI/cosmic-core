import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "@/components/explore/explore.css";
import "@/components/explore/research-article.css";

const title = "The Robot Already Knows · CosmicBrain Research";
const description =
  "Physical evidence as a verifier for Cosmos, GR00T and real-world evaluation: label-free robot-log scores, public-code audits and six pre-registered negative results.";
const url = "https://www.cosmicbrain.ai/docs/the-robot-already-knows";
const assetPath = "/docs/the-robot-already-knows/";
const image = `https://www.cosmicbrain.ai${assetPath}figure-03-rollout-judgments.png`;

export const Route = createFileRoute("/docs_/the-robot-already-knows")({
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
      { property: "og:image:width", content: "2325" },
      { property: "og:image:height", content: "655" },
      {
        property: "og:image:alt",
        content: "Robot-log scores and vision critics compared on real RoboArena rollouts.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:url", content: url },
      { name: "twitter:image", content: image },
      {
        name: "twitter:image:alt",
        content: "Robot-log scores and vision critics compared on real RoboArena rollouts.",
      },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: RobotAlreadyKnowsArticle,
});

const contents = [
  ["overview", "Overview"],
  ["method", "Method and protocol"],
  ["experiments", "Real-robot evidence"],
  ["code-audits", "Public-code audits"],
  ["handover", "GB300 handover"],
  ["negative-results", "Six negative results"],
  ["limitations", "Limitations"],
  ["next-steps", "Next steps and sources"],
];

const applications = [
  [
    "Robot log beats and boosts Cosmos Reason 2 on real rollouts (73% vs 56%; 41% lower error when fused)",
    "Cosmos Reason as a critic for real rollouts and synthetic trajectories",
    "Give the critic the robot log as a second channel; veto “success” when the log shows no hold.",
  ],
  [
    "Label-free policy ranking (ρ = 0.95) and anytime-valid A/B tests (0 wrong calls)",
    "GR00T checkpoint evaluation on real robots and RoboArena-style evaluations",
    "Rank checkpoints without a rater per rollout; stop A/B tests as soon as one is reliably better.",
  ],
  [
    "Flagged teleoperation demonstrations are 62–76% failed or flawed in blind review",
    "GR00T humanoid teleoperation datasets",
    "Filter or down-weight flawed demonstrations before training.",
  ],
  [
    "Loss update flips sign with batch layout",
    "GR00T training code, mixed embodiments",
    "An opt-in explicit objective that is invariant to layout.",
  ],
  [
    "Stale normalization statistics after dataset growth",
    "GR00T data statistics cache",
    "A source-bound cache that regenerates when data changes.",
  ],
  [
    "Contact check can never succeed; labels fire 50 frames early",
    "DexMimicGen subtask annotations",
    "A two-line patch.",
  ],
  [
    "Measured-holding release gate",
    "GB300 cable-connector workcell",
    "Release only on measured contact, load and no slip; diagnose failures from the log.",
  ],
];

const comparisons = [
  ["Cosmos Reason 2 (8B)", "3 frames", "1.25", "56%"],
  ["Log, one bit (closed at all)", "Log", "n/a", "64%"],
  ["Frontier VLM critic", "3 frames", "0.87", "70%"],
  ["Log, label-free Z", "Log", "n/a", "73%"],
  ["Log, learned", "Log, task", "0.75", "76%"],
  ["Log + Cosmos Reason 2", "Both", "0.74", "75%"],
];

function ResearchFigure({
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
  return (
    <figure className="research-figure">
      <a
        href={`${assetPath}${file}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open full-size figure: ${alt}`}
      >
        <img src={`${assetPath}${file}`} width={width} height={height} loading="lazy" alt={alt} />
      </a>
      <figcaption>{children} Select the figure to inspect it at full size.</figcaption>
    </figure>
  );
}

function RobotAlreadyKnowsArticle() {
  return (
    <div className="explore-page research-page">
      <SiteHeader />
      <main id="article-top">
        <header className="research-header explore-wrap">
          <Link to="/docs" className="research-back">
            <ArrowLeft size={15} /> All research
          </Link>
          <p className="eyebrow">CosmicBrain AI / Physical AI research</p>
          <h1>
            The robot
            <br />
            <em>already knows.</em>
          </h1>
          <p className="research-subtitle">
            Physical evidence as a verifier for Cosmos, GR00T and real-world evaluation
          </p>
          <div className="research-meta">
            <time dateTime="2026-10">October 2026</time>
            <span>CosmicBrain AI / San Francisco</span>
            <span>Research report</span>
            <span>Read online</span>
          </div>
          <p className="research-deck">
            Pixels guess. Fingers measure. A robot already records whether a grasp, lift, carry and
            release happened. On 1,000 human-judged A/B sessions, a label-free score from that
            record agrees with the human choice 73% of the time, against 56% for Cosmos Reason 2
            given three frames. Adding the log lowers the model’s progress-scoring error by 41%.
          </p>
          <p className="research-scope">
            Public code, models and datasets. All studies were pre-registered, with six negative
            results reported alongside the positive ones. The GB300 coordination layer has been
            tested in software only.
          </p>
        </header>

        <div className="research-layout explore-wrap">
          <nav className="research-contents" aria-label="In this report">
            <span className="eyebrow">In this report</span>
            {contents.map(([id, label]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </nav>
          <article className="research-body" aria-label="The Robot Already Knows research report">
            <aside className="research-takeaway">
              <p className="eyebrow">The central result</p>
              <p>
                Physical evidence gives vision critics a second channel: whether the fingers met an
                object, whether it stayed in the hand and where it slipped. The same record supports
                policy ranking, data audits and checks of the code that creates training labels.
              </p>
            </aside>

            <section id="overview" aria-labelledby="overview-title">
              <h2 id="overview-title">What the robot records</h2>
              <p>
                NVIDIA’s robot-learning flywheel grades data, rollouts and checkpoints with
                automated judges, notably Cosmos Reason used as a critic for real and synthetic
                trajectories. A simpler judge is already on the robot. When a gripper closes on an
                object, its fingers stop short of the commanded position. This gap, together with
                how the hand moves while holding, records whether a grasp, lift, carry and release
                happened.
              </p>
              <p>
                On RoboArena, the real-robot evaluation NVIDIA has cited for GR00T, this label-free
                signal ranks ten policies at <strong>Spearman ρ = 0.95</strong> against 10,783 human
                judgments. Applying the same check of what really happened to public code exposed a
                GR00T loss whose update changes sign with batch layout, normalization statistics
                that go stale when a dataset grows, and DexMimicGen subtask labels that fire 50
                frames early. A separate software-only coordination layer addresses the two-arm
                GB300 connector handover described in NVIDIA’s October factory report.
              </p>
              <ResearchFigure
                file="figure-01-signal.png"
                width={2081}
                height={824}
                alt="Two real RoboArena rollouts: a held object creates a gap between commanded and measured gripper closure; an empty grasp closes fully even as the arm moves as if carrying."
              >
                <strong>Figure 1. The signal.</strong> In the first rollout, the shaded gap means an
                object is in the hand, and the hand then rises more than 3 cm. In the second, the
                fingers close all the way: nothing was grasped. Cosmos Reason must infer this
                difference from pixels; the robot records it directly.
              </ResearchFigure>
              <h3>Why a second channel matters</h3>
              <p>
                GR00T policies train on mixtures of teleoperated demonstrations and synthetic
                trajectories generated with Cosmos and DexMimicGen, then are evaluated on real
                robots and in Isaac Lab. At every step, data-pipeline labels, Cosmos Reason, world
                models or human raters decide what counts as success. Optimistic or quietly wrong
                graders compound the error: bad demonstrations are kept, failed rollouts are
                rewarded and checkpoints are ranked on noise.
              </p>
              <p>
                Cosmos Reason judges from a few frames and must infer contact, holding and slip. The
                robot measures these quantities at every control step. This report asks how far that
                signal goes and where it could fit into NVIDIA’s stack.
              </p>
              <h3>Contributions</h3>
              <ul>
                <li>
                  A label-free log score that reaches 73% human A/B agreement against 56% for Cosmos
                  Reason 2 (8B), ranks ten policies at ρ = 0.95 and reduces the model’s error by 41%
                  when fused with it.
                </li>
                <li>
                  Evaluation and data uses: anytime-valid A/B decisions with zero wrong calls in the
                  reported test, a veto for weak critics on real assembly failures and an audit of
                  public GR00T humanoid teleoperation data.
                </li>
                <li>
                  Three silent failure modes in public GR00T and DexMimicGen code, each with a
                  minimal witness and an opt-in fix.
                </li>
                <li>A fail-closed coordination layer for the GB300 two-arm connector handover.</li>
                <li>
                  A full pre-registered ledger with six negative results, including distillation
                  into Cosmos Reason 2.
                </li>
              </ul>
              <div
                className="research-table-scroll"
                role="region"
                aria-label="Where the findings could apply in NVIDIA’s stack"
                tabIndex={0}
              >
                <table>
                  <caption>Table 1. Where each finding plugs into NVIDIA’s stack</caption>
                  <thead>
                    <tr>
                      <th scope="col">Finding</th>
                      <th scope="col">NVIDIA component</th>
                      <th scope="col">What it changes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(([finding, component, change]) => (
                      <tr key={finding}>
                        <th scope="row">{finding}</th>
                        <td>{component}</td>
                        <td>{change}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="research-caveat">
                All results use public NVIDIA code, models and datasets. These proposed applications
                do not establish results on NVIDIA’s internal systems.
              </p>
              <h3>Related work</h3>
              <p>
                Vision-language critics and reward models, including Cosmos Reason, score rollouts
                from images or video to filter synthetic data and rank policies; critics trained
                mostly on successes tend to call attempts successful. World-model evaluation runs
                policies inside action-conditioned video models. Self-supervised grasp labels from
                gripper closure date to early large-scale grasping work; this report uses that
                physical cue as a verifier for evaluation and data. Data-curation methods rank
                demonstrations by influence or mutual information. Anytime-valid testing gives error
                guarantees under continuous monitoring.
              </p>
            </section>

            <section id="method" aria-labelledby="method-title">
              <h2 id="method-title">Method and protocol</h2>
              <h3>Three signals, five physical events</h3>
              <p>
                The method reads commanded gripper closure, measured gripper closure and
                end-effector position from standard robot logs in LeRobot and GR00T parquet layouts.
                A <strong>hold</strong> is a settled measured closure that stops short of the
                command by more than 0.05, with the fingers not fully closed. An{" "}
                <strong>empty grasp</strong> closes fully, with a gap below 0.03. A{" "}
                <strong>lift</strong> is a rise of at least 3 cm while holding; a{" "}
                <strong>carry</strong> is a horizontal move of at least 5 cm; and a{" "}
                <strong>release</strong> is an opening after a hold.
              </p>
              <h3>The fixed, label-free score</h3>
              <p>
                <code>
                  Z = held + lifted + carried + released − 0.25 · min(empty grasps, 4) − 1[idle &gt;
                  0.9]
                </code>
              </p>
              <p>
                The formula and thresholds were fixed before any human score was viewed. It needs no
                training, camera or labels and runs at about 0.3 seconds of CPU per robot-hour.
              </p>
              <h3>Learned score and fusion</h3>
              <p>
                A gradient-boosted model uses about 30 physics features to predict human progress.
                It is trained leave-one-policy-out, so it never sees the policy it scores. Fusion
                adds Cosmos Reason 2’s output as one more feature.
              </p>
              <h3>Decisions and pre-registration</h3>
              <p>
                To compare two checkpoints, an anytime-valid sequential test uses
                empirical-Bernstein confidence sequences on per-session score differences. Every
                study was registered before results were viewed, with its data split, metric, pass
                bar and a SHA-256 hash: 23 registrations in total. Human feedback used for diagnosis
                was coded blind.
              </p>
              <ResearchFigure
                file="figure-02-method.png"
                width={1668}
                height={595}
                alt="Robot state and action logs become physical events, then a fixed label-free score, a learned score or a fusion with Cosmos Reason 2, supporting ranking, A/B tests, data audits, diagnosis and vetoes."
              >
                <strong>Figure 2. Method.</strong> The same physical events support all three scores
                and the downstream uses. Only the fixed label-free score needs no video, model or
                labels.
              </ResearchFigure>
            </section>

            <section id="experiments" aria-labelledby="experiments-title">
              <h2 id="experiments-title">Evidence from real robots</h2>
              <h3>Setup</h3>
              <p>
                The main testbed is RoboArena:{" "}
                <strong>10,783 real rollouts from ten generalist policies</strong> on the
                single-arm, parallel-gripper DROID platform, run by many labs, with human progress
                scores and A/B preferences. Critic comparisons sample 1,000 A/B sessions, or 2,000
                rollouts. Cosmos Reason 2 (8B, NVIDIA Open Model License) and a frontier proprietary
                critic see the same three frames and rubric.
              </p>
              <h3>Judging real rollouts</h3>
              <p>
                The label-free log score picks the human-preferred rollout in <strong>73%</strong>{" "}
                of sessions, against 56% for Cosmos Reason 2 and 70% for the frontier critic. Fusing
                the log with Cosmos Reason 2 lowers progress-scoring error from 1.25 to 0.74, a
                <strong> 41% reduction</strong>. Under the model’s recommended reasoning mode with
                seven frames, Cosmos reaches 52% A/B agreement against 72% for the log on the same
                sessions; fusion still lowers error by 37%.
              </p>
              <p>
                A trivial baseline provides context: one bit, “did the gripper close at all,”
                already reaches 64%. Much of the gap is what three frames cannot show; the full
                formula adds nine percentage points over that bit. The log improves Cosmos Reason by
                supplying evidence the images may miss.
              </p>
              <div
                className="research-table-scroll"
                role="region"
                aria-label="Comparison of judges on the same 2,000 RoboArena rollouts"
                tabIndex={0}
              >
                <table>
                  <caption>Table 2. Judges on the same 2,000 rollouts</caption>
                  <thead>
                    <tr>
                      <th scope="col">Judge</th>
                      <th scope="col">Input</th>
                      <th scope="col">Progress error</th>
                      <th scope="col">A/B agreement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map(([judge, input, error, agreement]) => (
                      <tr key={judge}>
                        <th scope="row">{judge}</th>
                        <td>{input}</td>
                        <td>{error}</td>
                        <td>{agreement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="research-caveat">
                Error is mean absolute error against human progress on a 1–5 scale. Always
                predicting the median gives 1.13. The seven-frame reasoning-mode comparison uses a
                pre-registered subset of 100 sessions.
              </p>
              <ResearchFigure
                file="figure-03-rollout-judgments.png"
                width={2325}
                height={655}
                alt="Three-panel comparison: human A/B agreement is 56% for Cosmos Reason 2, 70% for a frontier VLM and 73% for label-free log scoring; fusion reduces progress error to 0.74; seven-frame reasoning mode reaches 52% against the log’s 72%."
              >
                <strong>Figure 3. Judging real RoboArena rollouts.</strong> (a) Human A/B agreement
                on 1,000 sessions, with baselines in gray. (b) Progress-scoring error, with the
                median-prediction error marked by the dotted line. (c) Recommended reasoning mode
                with seven frames, on a pre-registered 100-session subset.
              </ResearchFigure>
              <h3>Ranking GR00T-class checkpoints without raters</h3>
              <p>
                Averaged per policy, the label-free score ranks the ten policies at
                <strong> ρ = 0.95</strong> against human progress. Scaling every threshold from 0.5×
                to 2× keeps ρ between 0.92 and 0.98; removing the lowest policy gives 0.93. No
                single feature matches the formula: lift height alone gives 0.84 and “closed at all”
                gives 0.29 in the report’s prose.
              </p>
              <ResearchFigure
                file="figure-04-policy-ranking.png"
                width={2080}
                height={640}
                alt="Ten policies across 10,783 rollouts show Spearman 0.95 between mean log score and human progress; single-feature correlations range from 0.28 for gripper closed at all to 0.84 for lift height."
              >
                <strong>Figure 4. Ranking without raters.</strong> (a) Mean label-free score per
                policy against mean human progress on 10,783 rollouts. (b) Single log features
                compared with the full formula. The original figure labels “gripper closed at all”
                as 0.28; the report’s prose gives 0.29. Both are retained here.
              </ResearchFigure>
              <h3>Faster A/B decisions</h3>
              <p>
                Across all 28 policy pairs, the anytime-valid test on the label-free score made
                <strong> no wrong calls</strong> against human verdicts. It decided half of the
                human-decided pairs at a median of 44 sessions and abstained on close pairs. For
                checkpoint comparisons on real robots, this supports stopping once sufficient
                evidence is available.
              </p>
              <ResearchFigure
                file="figure-05-ab-decisions.png"
                width={1084}
                height={667}
                alt="Policy-pair scatter plot showing no wrong calls among 28 pairs, with large differences often decided in about 40 sessions and close pairs taking longer or remaining undecided."
              >
                <strong>Figure 5. Anytime-valid A/B tests.</strong> Each point is a policy pair.
                Large differences are decided in about 40 sessions; close pairs take longer or
                remain undecided. No decision disagreed with the humans. Undecided pairs are shown
                at zero on the vertical axis.
              </ResearchFigure>
              <h3>Contact-rich assembly and a critic veto</h3>
              <p>
                On 758 labelled actions from public REASSEMBLE contact-rich assembly recordings, a
                log-only verifier reaches held-out AUROC 0.86 overall and 0.95 on insertions. An
                exploratory analysis lets the log’s completion check veto any “success” call from 23
                saved vision critics on 240 real actions, including 80 failures. Critics starting
                below 0.70 balanced accuracy rise from as low as 0.52 to about 0.79; false-pass
                rates fall from 16–85% to 7.5–30%. This offers a low-cost check against accepting
                failures when a Cosmos Reason-style critic filters trajectories.
              </p>
              <ResearchFigure
                file="figure-06-critic-veto.png"
                width={2080}
                height={639}
                alt="Before-and-after lines for 23 vision critics show how a log veto changes balanced accuracy and the share of 80 real failures passed as successes."
              >
                <strong>Figure 6. The log as a veto, exploratory.</strong> Each line is one critic
                on 240 real assembly actions. (a) Balanced accuracy before and after the veto; blue
                lines started below 0.70. (b) The share of real failures each critic passed as
                successes.
              </ResearchFigure>
              <h3>Auditing GR00T teleoperation data</h3>
              <p>
                On NVIDIA’s public GR00T humanoid teleoperation dataset, the physics check flags
                about 11% of demonstrations. In blind review, 62–76% of flagged demonstrations were
                failed or flawed, versus 5–20% of unflagged or random ones. The finding includes a
                task the check was not designed on. On the robomimic multi-operator benchmark, a log
                quality score separates the best operators’ demonstrations from the worst at AUROC
                0.94, and 0.92 on a second task, without operator labels.
              </p>
              <ResearchFigure
                file="figure-07-data-audit.png"
                width={2080}
                height={642}
                alt="Blind GR00T demo audits find 76% versus 20%, 62% versus 7%, and 71% versus 5% failed or flawed for flagged versus comparison demos; robomimic quality scores separate hidden operator ratings at AUROC 0.94 and 0.92."
              >
                <strong>Figure 7. Auditing data.</strong> (a) Failed or flawed GR00T humanoid
                demonstrations in three blind audits, comparing flagged with unflagged or random
                demonstrations. (b) Log quality scores of robomimic demonstrations grouped by the
                hidden operator rating; black bars mark medians.
              </ResearchFigure>
              <h3>Diagnosis and progress</h3>
              <p>
                On fresh sessions, a refined missed-grasp rule agrees with blind-coded human
                feedback at κ = 0.60, up from 0.56, and catches 55% of the missed grasps humans
                described, up from 32%. Partial-log scores track the final human score better as
                more of the rollout is seen: ρ rises from 0.35 at 25% to 0.55 at 100%. On DROID,
                success prediction reaches AUROC 0.81 on labs held out from training. A replication
                without task instructions was inconclusive: 0.64 against 0.58 for Cosmos Reason 2.
              </p>
              <ResearchFigure
                file="figure-08-diagnosis-progress.png"
                width={2072}
                height={580}
                alt="Refined failure rules increase human-feedback agreement from 0.56 to 0.60 and missed-grasp capture from 0.32 to 0.55; partial-log progress correlation rises from 0.35 to 0.47, 0.53 and 0.55."
              >
                <strong>Figure 8. Diagnosis and progress.</strong> (a) The first and refined failure
                rules against blind-coded human feedback on fresh sessions. (b) Correlation with the
                final human score at 25%, 50%, 75% and 100% of the rollout.
              </ResearchFigure>
            </section>

            <section id="code-audits" aria-labelledby="code-audits-title">
              <h2 id="code-audits-title">Auditing public robot-learning code</h2>
              <p>
                The same habit of checking physical and numerical facts was applied to the public
                Isaac GR00T repository and DexMimicGen. Each finding reproduces on unchanged public
                code, with a minimal witness and an opt-in fix that changes no default. These
                findings make no claim about internal training runs or released checkpoint quality.
              </p>
              <h3>GR00T: the loss depends on batch layout</h3>
              <p>
                Mixed-embodiment GR00T batches hold different numbers of valid action values in one
                padded tensor: 112 for LIBERO versus 680 for DROID in a 40 × 132 extent, from the
                public processors. The action head divides each microbatch’s masked error by its own
                valid count. The Trainer then averages microbatches and distributed data parallel
                (DDP) averages ranks. An average of ratios differs from a ratio of totals, so batch
                composition becomes part of the objective.
              </p>
              <p>
                With four fixed examples and one optimizer step through the unchanged Trainer, a
                shared parameter moves to <strong>−0.0576 as one batch</strong> and
                <strong> +0.0500 as two batches</strong>. An opt-in adapter makes the objective
                explicit, per value or per example, and invariant to layout across 36 Trainer cases
                and 24 two-process DDP cases. Update error is at most 1.3 × 10<sup>−8</sup> in FP32.
                The witness is constructed to expose the effect, rather than measure it in released
                models.
              </p>
              <ResearchFigure
                file="figure-09-batch-layout.png"
                width={1245}
                height={551}
                alt="The same four examples move a shared parameter to minus 0.0576 in one stock GR00T batch or plus 0.0500 in two batches; either explicit objective stays consistent across layouts."
              >
                <strong>Figure 9. Same examples, opposite update.</strong> Red shows the stock
                objective. Blue shows that each explicit objective produces the same update across
                layouts, while the two objectives retain their distinct meanings.
              </ResearchFigure>
              <h3>GR00T: stale normalization statistics</h3>
              <p>
                After a real DROID episode is appended and metadata updated without a schema change,
                GR00T reuses its statistics cache. A clean recompute changes 24 statistic arrays. A
                cache bound to source data regenerates correctly and matches all 4,044 clean values.
                Cold computation is 47.6 times faster than the stock code, with all 36,396 values
                identical. A fully vectorized control is just as fast: the contribution is
                correctness, with the speedup explained by ordinary vectorization.
              </p>
              <ResearchFigure
                file="figure-10-statistics-cache.png"
                width={1129}
                height={496}
                alt="Cold statistics on 100 DROID episodes take 60.26 seconds in stock GR00T, 1.32 seconds for a vectorized control and 1.26 seconds for a source-bound cache; all 36,396 values are identical."
              >
                <strong>Figure 10. Cold GR00T statistics.</strong> The comparison uses 100 real
                DROID episodes. A vectorized control explains the speedup; binding the cache to its
                source data addresses stale results.
              </ResearchFigure>
              <h3>DexMimicGen: labels that fire 50 frames early</h3>
              <p>
                In DexMimicGen’s two-arm three-piece assembly environment, the check for whether the
                robot still holds the piece loops over the gripper dictionary’s keys, or names,
                instead of the grippers. It therefore never detects contact: all 70,225
                single-contact geometry pairs evaluate false. The stored stage-completion label
                turns on at frame 104, while the witnessed release completes at frame 154.
              </p>
              <p>
                A two-line patch using <code>.values()</code> matches an independent formula in all
                229 recorded states. Final task success is unchanged. One demonstration was audited.
              </p>
              <ResearchFigure
                file="figure-11-contact-label.png"
                width={874}
                height={466}
                alt="A DexMimicGen timeline shows a stored label starting at frame 104, 50 frames before witnessed release completes at frame 154; the patched contact check aligns with release."
              >
                <strong>Figure 11. DexMimicGen subtask label timeline.</strong> One demonstration,
                before and after the contact-check fix. Labels, like critics, must check contact
                rather than geometry alone.
              </ResearchFigure>
            </section>

            <section id="handover" aria-labelledby="handover-title">
              <h2 id="handover-title">The GB300 connector handover</h2>
              <p>
                NVIDIA’s October 7 factory report on GB300 cable-connector assembly reports 90–95%
                end-to-end success and about 40 seconds per cable, against a requirement of 99.5%
                and 72 seconds for all four. Remaining failures center on coordinating two arms
                during the connector grasp; stop-and-adjust repositioning dominates cycle time. The
                hypothesis here is that much of the gap is a verification problem: the controller
                needs to know in real time whether the connector is actually held.
              </p>
              <ResearchFigure
                file="figure-12-gb300-performance.png"
                width={985}
                height={459}
                alt="Reported GB300 cell success is 90–95% against 99.5% required; approximately 160 seconds for four cables is compared with a 72-second requirement."
              >
                <strong>Figure 12. Reported GB300 performance against requirements.</strong>{" "}
                Four-cable time assumes about 40 seconds per cable, giving approximately 160
                seconds.
              </ResearchFigure>
              <p>
                A software-only, fail-closed coordination layer learns online how the dangling
                connector moves with the holding arm and resets when that behavior changes. A joint
                planner proposes bounded moves for both arms. It closes the gripper only if the
                whole uncertainty envelope stays inside the grasp region for the entire closing
                interval.
              </p>
              <p>
                Every proposal must pass an external validator bound to the exact observation, model
                version and proposal hash. A release gate requires measured holding from current
                telemetry: contact on both sides, load transferred, no slip and at least 0.3 seconds
                of retention. A commanded closure never counts as holding.
              </p>
              <p className="research-caveat">
                <strong>Software-only evidence:</strong> the layer passes 60 software tests and has
                not run on the GB300 cell or in a physics simulator. The fastest first step is a
                log-based breakdown of where real exposure-to-grasp cycles fail and where time is
                spent.
              </p>
              <ResearchFigure
                file="figure-13-handover-layer.png"
                width={1668}
                height={595}
                alt="A fail-closed sequence from observation to response model, joint planner, external validator and release gate; any missing, stale or mismatched check admits nothing."
              >
                <strong>Figure 13. Fail-closed handover layer.</strong> Each stage must pass before
                the next. Any missing, stale or mismatched check admits nothing. The release gate
                consumes the same measured-holding evidence extracted from logs in the real-robot
                experiments.
              </ResearchFigure>
            </section>

            <section id="negative-results" aria-labelledby="negative-results-title">
              <h2 id="negative-results-title">Six negative results</h2>
              <p>All six studies below were pre-registered and did not meet their pass bars.</p>
              <h3>01 / Distilling the log into Cosmos Reason 2</h3>
              <p>
                A LoRA fine-tune of Cosmos Reason 2 (8B) on 1,940 log-labelled RoboArena rollouts,
                with no human labels, answered the most common label for every test rollout. Its
                probabilities rank rollouts at 56%, equal to stock Cosmos Reason 2 and below the
                log’s 74% on the same test set. Episode-level labels from three frames were too thin
                a signal.
              </p>
              <h3>02 / Physics checks on world-model rollouts</h3>
              <p>
                Eighty real grasps, 40 missed and 40 lifted, were replayed in an open DROID
                action-conditioned world model using the true, a fixed 0.75 and the raw gripper
                signal. The judge read imagined outcomes at only 0.61 balanced accuracy, against
                0.75 on real video, failing the sanity gate. The gripper signal changed how the
                fingers were drawn without changing the rest of the scene.
              </p>
              <h3>03 / Curation</h3>
              <p>
                Training on the 150 physically cleanest of 300 robomimic demonstrations gave 11%
                success against 25% for 150 random demonstrations, over three seeds × 50 rollouts.
                The ranking favored short demonstrations and removed variety; both arms were
                undertrained.
              </p>
              <h3>04 / GR00T N1.7 padding schedule</h3>
              <p>
                On the LIBERO checkpoint, the padding schedule changed action-head outputs by RMS ≥
                0.01 in one of three seeds. The pre-registered bar required two of three.
              </p>
              <h3>05 / Contact-aware demonstration replay</h3>
              <p>
                Placement error fell by 1.21 mm against filtered replay, with a 95% interval of
                −6.72 to 6.54 mm. Completions were 16/40 against 15/40. The primary comparison did
                not pass.
              </p>
              <h3>06 / Sharing one cable simulation</h3>
              <p>
                Sharing a cable simulation across rollouts with different arm commands was rejected:
                cable states diverge within about 67 milliseconds.
              </p>
              <ResearchFigure
                file="figure-14-negative-results.png"
                width={2290}
                height={1180}
                alt="Six panels preserve negative results: collapsed distillation, failed world-model sanity gate, curation with lower success, padding changing one of three seeds, inconclusive replay improvement and cable states diverging in about 67 milliseconds."
              >
                <strong>Figure 14. Negative results.</strong> (a) Distilled Cosmos Reason 2 outputs
                versus teacher labels. (b) Replayed grasps judged held and lifted under each gripper
                signal. (c) Success per seed after curation. (d) GR00T N1.7 output change per seed
                against the bar. (e) Median placement error by replay method, descriptive; the
                primary comparison did not pass. (f) Time until cable state diverges from the idle
                case.
              </ResearchFigure>
              <ResearchFigure
                file="figure-15-world-model-replay.png"
                width={2075}
                height={830}
                alt="Real and imagined wrist-camera frames of a missed grasp while stacking cubes onto a red cylinder, comparing real video with world-model replays under true and fixed 0.75 gripper signals."
              >
                <strong>Figure 15. Real and imagined wrist views of a missed grasp.</strong> The
                task is “stack all the cubes onto the red cylinder.” Top: real camera. Middle and
                bottom: world-model replays of the same arm motion with the true signal and a fixed
                0.75 signal. Imagined frames follow the arm but blur the outcome, preventing the
                judge from reading it reliably.
              </ResearchFigure>
              <h3>The lesson</h3>
              <p>
                The log’s value is contact at each moment: when the fingers met something, whether
                it stayed and where it slipped. Each failure compressed this into one number per
                episode or asked another model to reproduce it. The next proposed step labels every
                frame from the log and trains a video contact detector, so the same physics can
                check Cosmos-generated rollouts, synthetic GR00T training data and human video where
                no log exists. The first kill test is per-frame AUROC of 0.90 on held-out labs.
              </p>
            </section>

            <section id="limitations" aria-labelledby="limitations-title">
              <h2 id="limitations-title">Limitations</h2>
              <ul>
                <li>
                  <strong>One headline evaluation platform.</strong> RoboArena uses a parallel
                  gripper, ten policies and mostly grasping tasks. Cosmos Reason 2 ran locally on
                  three still frames, rather than NVIDIA’s video pipeline; the separately reported
                  reasoning-mode check used seven frames.
                </li>
                <li>
                  <strong>Per-session agreement remains below human consistency.</strong> Agreement
                  is 73–76%. The method replaces raters but still requires robot time. It is most
                  useful for unattended evaluation and large log archives.
                </li>
                <li>
                  <strong>Timestamped readers and matched-trial pairing remain missing.</strong> The
                  log tool’s first version lacks both, which causal two-arm use requires.
                </li>
                <li>
                  <strong>Public-code witnesses have narrow scope.</strong> They use constructed or
                  single-demonstration cases. No new GR00T policy improvement has been shown;
                  further validation requires additional real-robot evaluation logs.
                </li>
              </ul>
            </section>

            <section id="next-steps" aria-labelledby="next-steps-title">
              <h2 id="next-steps-title">Next steps and sources</h2>
              <p>
                Robots already record whether they hold something. Used as a verifier in these
                experiments, that record outperforms and improves Cosmos Reason 2 at judging real
                rollouts, ranks policies without raters, catches flawed public GR00T training data
                and exposes silent errors in public training and data-generation code. The next
                tests use additional GR00T evaluation and connector-cell logs, alongside a per-frame
                contact detector that carries the physical signal to generated footage.
              </p>
              <h3>Further validation</h3>
              <p>
                Four next studies can test the findings on additional real-robot logs, using state
                and action only and fixing each pass bar in advance:
              </p>
              <ul>
                <li>
                  <strong>Cosmos:</strong> add the log as a second channel to Cosmos Reason on real
                  or synthetic rollouts with known outcomes.
                </li>
                <li>
                  <strong>GR00T / evaluation:</strong> rank GR00T checkpoints from their real-robot
                  logs and compare with independent verdicts.
                </li>
                <li>
                  <strong>Isaac / training code:</strong> review the opt-in loss objective, the
                  source-bound statistics cache and the DexMimicGen patch.
                </li>
                <li>
                  <strong>Manufacturing:</strong> break down failure stages and time losses in GB300
                  connector-cell logs.
                </li>
              </ul>
              <h3>Data, models and evidence</h3>
              <p>
                Code, all 23 pre-registrations and evidence packages are available on request from
                CosmicBrain AI. Data and models used: RoboArena (MIT), DROID (CC BY 4.0), robomimic
                (MIT), REASSEMBLE, NVIDIA GR00T teleoperation data, Cosmos Reason 2 under the NVIDIA
                Open Model License, and the public Isaac GR00T and DexMimicGen repositories under
                their respective licenses.
              </p>
            </section>

            <footer className="research-article-footer">
              <p className="eyebrow">CosmicBrain AI / San Francisco</p>
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
