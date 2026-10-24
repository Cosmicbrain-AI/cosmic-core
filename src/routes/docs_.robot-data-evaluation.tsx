import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "@/components/explore/explore.css";
import "@/components/explore/research-article.css";

const title = "Gemini 4 Argon on real robot recordings · CosmicBrain Research";
const description =
  "An independent, pre-registered evaluation of Gemini 4 Argon hindsight labeling and success judging on held-out robot recordings: comparisons, failure modes and robot-state fixes.";
const url = "https://www.cosmicbrain.ai/docs/robot-data-evaluation";
const image = "https://www.cosmicbrain.ai/docs/robot-data-evaluation/model-comparison.png";

export const Route = createFileRoute("/docs_/robot-data-evaluation")({
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
      { property: "og:image:width", content: "1628" },
      { property: "og:image:height", content: "473" },
      {
        property: "og:image:alt",
        content: "Held-out robot action labeling and real-failure judging across Gemini models.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:url", content: url },
      { name: "twitter:image", content: image },
      {
        name: "twitter:image:alt",
        content: "Held-out robot action labeling and real-failure judging across Gemini models.",
      },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: RobotDataEvaluationArticle,
});

const contents = [
  ["findings", "What we found"],
  ["evidence", "Evidence"],
  ["labeling", "Hindsight labeling"],
  ["retry-check", "Failed-retry check"],
  ["judging", "Success judging"],
  ["implications", "What this suggests"],
  ["methods", "Methods"],
  ["limits", "Limitations"],
];

const earlierLabeling = [
  ["Gemini 3 Flash, 2 fps", "0.09", "0.20", "43%", "1.71 s", "0%", "0.22", "1.0 M"],
  ["Gemini 3.1 Pro, 2 fps", "0.11", "0.23", "46%", "1.64 s", "3%", "0.23", "1.2 M"],
  ["Argon, 2 fps", "0.58", "0.69", "84%", "1.34 s", "43%", "0.27", "1.1 M"],
  ["Argon, 1 fps", "0.71", "0.78", "90%", "1.33 s", "32%", "0.31", "0.57 M"],
  ["Argon, 1 fps + signals", "0.75", "0.79", "96%", "0.72 s", "32%", "0.72", "0.57 M"],
];

const trueClockLabeling = [
  ["Both cameras, 2 fps", "0.68", "0.79", "85%", "1.50 s", "54%", "0.34", "1.15 M"],
  ["Both cameras, 1 fps", "0.73", "0.82", "90%", "1.35 s", "51%", "0.33", "0.59 M"],
  ["Both cameras, 1 fps + signals", "0.79", "0.85", "93%", "0.74 s", "57%", "0.74", "0.59 M"],
  ["Wrist camera only, 2 fps", "0.74", "0.83", "89%", "1.23 s", "43%", "0.36", "0.62 M"],
  ["Wrist camera only, 2 fps + signals", "0.78", "0.84", "93%", "0.71 s", "51%", "0.73", "0.62 M"],
];

const retryOutcomes = [
  ["1 fps, true clock (primary)", "0.57 → 0.68", "0.81 → 0.66", "33% → 22%", "2.7% → 3.5%"],
  [
    "Wrist camera only, 2 fps, true clock",
    "0.51 → 0.54",
    "0.79 → 0.61",
    "43% → 39%",
    "1.6% → 3.1%",
  ],
  ["2 fps, true clock", "0.51 → 0.62", "0.73 → 0.62", "50% → 35%", "2.2% → 3.8%"],
  ["1 fps, earlier clips, run 1", "0.32 → 0.46", "0.86 → 0.71", "60% → 41%", "1.4% → 2.6%"],
  ["1 fps, earlier clips, run 2", "0.22 → 0.41", "0.67 → 0.62", "68% → 48%", "1.3% → 3.1%"],
  ["1 fps, earlier clips, run 3", "0.43 → 0.62", "0.73 → 0.66", "54% → 35%", "1.3% → 2.4%"],
];

const judgingOutcomes = [
  ["Gemini 4 Argon", "0.89", "0.997", "129 of 140 at a 5% error target (2.3% wrong)"],
  ["Gemini 3.1 Pro (preview)", "0.76", "0.88", "Not tested"],
  ["Gemini 3 Flash", "0.67", "0.88", "None at 5% or 10%"],
  ["Gemini 2.5 Pro", "0.52", "0.72", "Not tested"],
];

function RobotDataEvaluationArticle() {
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
            Gemini 4 Argon on
            <br />
            <em>real robot recordings.</em>
          </h1>
          <p className="research-subtitle">
            Where it leads, where it leaks, and a fix from robot state
          </p>
          <div className="research-meta">
            <time dateTime="2026-10">October 2026</time>
            <span>Research brief</span>
            <span>Read online</span>
          </div>
          <p className="research-deck">
            We measured two of Argon’s robot-data capabilities, hindsight labeling and success
            judging, against human labels on recordings held out from all method design, under
            pre-registered protocols, alongside other Gemini models.
          </p>
          <p className="research-scope">
            Independent evaluation. Public data. Held-out recordings. Pre-registered protocols.
            Results on recordings, not on a policy trained against Argon.
          </p>
        </header>

        <div className="research-layout explore-wrap">
          <nav className="research-contents" aria-label="In this brief">
            <span className="eyebrow">In this brief</span>
            {contents.map(([id, label]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </nav>
          <article
            className="research-body"
            aria-label="Independent robot-data evaluation research brief"
          >
            <aside className="research-takeaway">
              <p className="eyebrow">In one line</p>
              <p>
                Argon is the first Gemini model we tested that can label contact-rich robot video
                usefully, but its labels still pass a third to a half of failed-attempt time as
                success, which matters if those labels weight training data. The robot’s own gripper
                signal fixes timing, part identity and primitives, and closes part of that leak,
                with no extra model calls.
              </p>
            </aside>

            <section id="findings" aria-labelledby="findings-title">
              <h2 id="findings-title">What we found</h2>
              <h3>01 / Argon is a step change on robot data</h3>
              <p>
                On held-out assembly video it labels actions with the right verb, part and timing at{" "}
                <strong>F1 0.58</strong>, against 0.11 for Gemini 3.1 Pro and 0.09 for Gemini 3
                Flash on identical inputs (gap over 3.1 Pro +0.39 to +0.56, 95% interval). Judging
                real success, it reaches <strong>AUROC 0.89</strong> against 0.76 for 3.1 Pro (gap
                +0.06 to +0.20) and 0.52 for 2.5 Pro; 0.997 on pick and place.
              </p>

              <h3>02 / Failed retries leak through</h3>
              <p>
                With our labeling prompt on correctly timed clips, Argon labels{" "}
                <strong>36 to 52% of human-marked failed-attempt time as success</strong> over three
                fresh runs, and merges 6 to 11 of 32 failed attempts into the successful retry that
                follows (Figure 2). Only 1.6 to 2.7% of successful time is wrongly flagged, so the
                error runs one way: if these labels decide which segments behavior cloning
                down-weights, as the launch describes, many failures keep full weight.
              </p>
              <p>
                Model re-checks we tried added many false alarms; robot signals close part of the
                gap with no model calls: flagging empty grasps, lift-and-retry and same-spot
                re-grasps raised failure recall from <strong>0.57 to 0.68</strong> and cut failed
                time kept as success from <strong>33% to 22%</strong>, short of our pre-registered
                0.70 recall target.
              </p>

              <h3>03 / Argon calls unfinished work done</h3>
              <p>
                On frames from just before a successful action finished, it said done{" "}
                <strong>33 to 39% of the time</strong> at every thinking level (91% for parts
                grasped but not yet lifted): a reward-hacking surface for progress and value
                estimates. A one-line completion definition removes it (2 of 322) but fails more
                real successes (52 vs 35 of 308); a protocol Argon wrote for itself gets 30 of 322
                while failing fewer (19 of 308).
              </p>

              <h3>04 / Robot state fixes what pixels cannot</h3>
              <p>
                With no extra model calls, snapping boundaries to gripper open/close events halves
                timing error (<strong>1.33 to 0.72 s</strong>). The gripper’s closed width gauges
                part size (about 2.5, 7, 11 and 15 mm for pegs 1 to 4), fixing Argon’s main naming
                error (<strong>90% to 96% of parts right</strong>). Gripper-derived primitives more
                than double primitive F1 (<strong>0.31 to 0.72</strong>). On correctly timed clips
                the same step reaches action F1 0.79.
              </p>

              <h3>05 / Argon’s timestamps follow the clip’s clock</h3>
              <p>
                That exposed an error in ours. The wrist camera records at about 28 Hz but its files
                say 30, so our wrist clips played 7% fast and Argon’s wrist-only times drifted 0.054
                s per second (the clocks predict 0.068). A fresh pre-registered run on clips played
                at true speed cut the drift to 0.008 s per second and raised action F1 from{" "}
                <strong>0.48 to 0.74</strong> for the wrist camera alone, and from 0.58 to 0.68 for
                both cameras at 2 frames per second. At equal tokens the wrist camera alone matches
                both cameras at 1 frame per second (0.74 vs 0.73); the external camera alone names
                27% of parts.
              </p>

              <h3>06 / Inputs move accuracy; prompts do not</h3>
              <p>
                Ten judging prompt variants (thinking levels, self-written protocols, reference
                examples, force and sound plots) land at AUROC 0.87 to 0.91, while one or two
                cameras instead of three give 0.81 to 0.84. With both cameras, labeling accuracy
                also fades across each two-minute clip (0.83 in the first 30 s, 0.71 at 60 to 90 s);
                the wrist camera alone holds steady (0.73 to 0.79), and gripper snapping recovers
                most of the loss. One frame per second matches two at half the tokens.
              </p>
            </section>

            <section id="evidence" aria-labelledby="evidence-title">
              <h2 id="evidence-title">Evidence</h2>
              <figure className="research-figure">
                <a
                  href="/docs/robot-data-evaluation/model-comparison.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open full-size Gemini model comparison figure"
                >
                  <img
                    src="/docs/robot-data-evaluation/model-comparison.png"
                    width="1628"
                    height="473"
                    loading="lazy"
                    alt="Action F1 on earlier clips: Gemini 3 Flash 0.09, Gemini 3.1 Pro 0.11, Argon at 2 fps 0.58, Argon at 1 fps 0.71, and Argon with robot signals 0.75. Real-failure judging AUROC is reported alongside for assembly and pick and place."
                  />
                </a>
                <figcaption>
                  <strong>Figure 1. Hindsight labeling and success judging.</strong> Left: exact
                  action F1 against human labels on 12 held-out REASSEMBLE recordings (about an hour
                  of contact-rich assembly, 382 actions, human labels from the dataset authors); a
                  label counts only if verb, part and timing (overlap 0.5) all match. Right: AUROC
                  for separating real failures from successes on REASSEMBLE (240 actions, 80
                  failures) and FailBench pick and place (112 steps, 43 executed failures). Same
                  prompt and inputs for every model. Select any figure to inspect it at full size.
                </figcaption>
              </figure>

              <figure className="research-figure">
                <a
                  href="/docs/robot-data-evaluation/failed-retries.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open full-size failed-retry timeline figure"
                >
                  <img
                    src="/docs/robot-data-evaluation/failed-retries.png"
                    width="2200"
                    height="450"
                    loading="lazy"
                    alt="Four-minute timeline comparing human action and failure annotations with Argon labels on true-clock and earlier clips. Two failed USB inserts from 22 to 68 seconds are merged into one successful insert; failures after 200 seconds are detected on corrected clips."
                  />
                </a>
                <figcaption>
                  <strong>Figure 2. Failed retries inside successful labels.</strong> Four minutes
                  of one held-out recording. From 22 to 68 s the robot fails two USB inserts before
                  succeeding (hatched in the human row); on correctly timed clips Argon labels all
                  three attempts as one successful insert. It does catch the failed inserts after
                  200 s, which it missed on the earlier, mistimed clips.
                </figcaption>
              </figure>

              <figure className="research-figure">
                <a
                  href="/docs/robot-data-evaluation/robot-signals.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open full-size failed-time and robot-signal results figure"
                >
                  <img
                    src="/docs/robot-data-evaluation/robot-signals.png"
                    width="1672"
                    height="429"
                    loading="lazy"
                    alt="On the shown runs, failed-attempt time labeled success falls from 61% on earlier clips to 36% with the true clock. Robot signals reduce boundary error from 1.33 to 0.72 seconds, improve parts named right from 90% to 96%, and raise primitive F1 from 0.31 to 0.72."
                  />
                </a>
                <figcaption>
                  <strong>Figure 3. Failed-attempt labels and robot-state fixes.</strong> Left: how
                  Argon (both cameras, 1 fps) labels the 404 seconds of human-labeled failed
                  attempts in the held-out recordings, on the earlier mistimed clips and on
                  correctly timed clips. Right: the pre-registered fresh 1 fps run before and after
                  adding gripper-signal timing, sizing and primitives (no extra model calls, no
                  labels).
                </figcaption>
              </figure>

              <figure className="research-figure">
                <a
                  href="/docs/robot-data-evaluation/clock-and-cameras.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open full-size clock and camera effects figure"
                >
                  <img
                    src="/docs/robot-data-evaluation/clock-and-cameras.png"
                    width="1672"
                    height="517"
                    loading="lazy"
                    alt="Timing drift tracks the wrist clip clock. Wrist-only action F1 is 0.48 on mistimed clips, 0.68 after re-timing, 0.74 on a fresh true-clock run and 0.78 with robot signals. Accuracy by position in a true-clock clip declines with both cameras and is steadier with the wrist camera or robot signals."
                  />
                </a>
                <figcaption>
                  <strong>Figure 4. Clocks, cameras and clip position.</strong> Left: median change
                  in Argon’s boundary error across each two-minute clip (actions paired by verb,
                  part and nearest midpoint, so the pairing favors neither clock). Slopes on
                  mistimed clips: wrist only −0.054 s/s (95% interval −0.066 to −0.043), both
                  cameras at 2 fps −0.030 and −0.027, at 1 fps −0.004 to −0.010 (intervals include
                  zero). On true-clock clips: wrist only −0.008 (−0.019 to −0.001), both cameras
                  0.000 and +0.001. Middle: the wrist camera alone, from mistimed clips to a fresh
                  true-clock run. Right: action F1 by position in the clip, true-clock runs.
                </figcaption>
              </figure>
            </section>

            <section id="labeling" aria-labelledby="labeling-title">
              <h2 id="labeling-title">Hindsight labeling</h2>
              <div
                className="research-table-scroll"
                role="region"
                aria-label="Hindsight labeling results on held-out recordings"
                tabIndex={0}
              >
                <table>
                  <caption>Hindsight labeling, held-out recordings</caption>
                  <thead>
                    <tr>
                      <th scope="col">Labeler</th>
                      <th scope="col">Action F1</th>
                      <th scope="col">Structure F1</th>
                      <th scope="col">Parts right</th>
                      <th scope="col">Boundary error</th>
                      <th scope="col">Failed attempts caught</th>
                      <th scope="col">Primitive F1</th>
                      <th scope="col">Tokens per video hour</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="rowgroup" colSpan={8}>
                        Same clips for every model (wrist clip 7% fast)
                      </th>
                    </tr>
                    {earlierLabeling.map(([labeler, ...values]) => (
                      <tr key={labeler}>
                        <th scope="row">{labeler}</th>
                        {values.map((value, index) => (
                          <td key={index}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  <tbody>
                    <tr>
                      <th scope="rowgroup" colSpan={8}>
                        Argon on correctly timed clips (one fresh pre-registered run each)
                      </th>
                    </tr>
                    {trueClockLabeling.map(([labeler, ...values]) => (
                      <tr key={labeler}>
                        <th scope="row">{labeler}</th>
                        {values.map((value, index) => (
                          <td key={index}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Signals: the robot-signal pipeline (gripper snapping, sizing, primitives). Structure
                F1 requires the right verb and timing; parts are scored on those matched actions;
                failed attempts caught counts human-marked failures matched to an Argon failure
                flag. Repeat 1 fps runs on the earlier clips scored 0.64, 0.66 and 0.71 action F1,
                and the same frozen robot-signal step added +0.05, +0.08 and +0.05 (95% interval of
                the pooled gain +0.03 to +0.08); on correctly timed clips it added +0.05 at 1 fps
                and +0.11 at 2 fps.
              </p>
            </section>

            <section id="retry-check" aria-labelledby="retry-check-title">
              <h2 id="retry-check-title">Failed-retry check from robot signals</h2>
              <div
                className="research-table-scroll"
                role="region"
                aria-label="Failed-retry check results on held-out recordings"
                tabIndex={0}
              >
                <table>
                  <caption>Held-out recordings; before → after the retry check</caption>
                  <thead>
                    <tr>
                      <th scope="col">Argon run (both cameras unless noted)</th>
                      <th scope="col">Failed attempts caught</th>
                      <th scope="col">Precision of failure flags</th>
                      <th scope="col">Failed time kept as success</th>
                      <th scope="col">Successful time flagged</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retryOutcomes.map(([run, ...values]) => (
                      <tr key={run}>
                        <th scope="row">{run}</th>
                        {values.map((value, index) => (
                          <td key={index}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Argon plus the robot-signal pipeline, without and with the check (before → after).
                The check flags an empty grasp, a lift-and-retry while holding the part, or a
                same-spot re-grasp after an insert, and splits the action there; its rules were
                chosen on the development recordings and frozen before this run.
              </p>
              <p className="research-caveat">
                <strong>Pre-registered results:</strong> recall at least 0.70 at precision at least
                0.60 (missed: 0.68, 95% interval 0.48 to 0.83, at 0.66); more catches than without
                it (missed: 4 vs 0, p 0.13); failed time down at least 10 points with successful
                time up at most 3 (met); recall up on all six runs (met). Across the six runs it
                added 28 catches and lost none; the runs share recordings, so they are not
                independent.
              </p>
            </section>

            <section id="judging" aria-labelledby="judging-title">
              <h2 id="judging-title">Success judging on real failures</h2>
              <div
                className="research-table-scroll"
                role="region"
                aria-label="Success judging and certified verdict results"
                tabIndex={0}
              >
                <table>
                  <caption>Success judging on real failures</caption>
                  <thead>
                    <tr>
                      <th scope="col">Judge</th>
                      <th scope="col">REASSEMBLE assembly (AUROC)</th>
                      <th scope="col">FailBench pick and place (AUROC)</th>
                      <th scope="col">Certified verdicts, FailBench (all 140 test steps)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {judgingOutcomes.map(([judge, ...values]) => (
                      <tr key={judge}>
                        <th scope="row">{judge}</th>
                        {values.map((value, index) => (
                          <td key={index}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Argon’s lead over 3.1 Pro on REASSEMBLE is +0.13 AUROC (95% interval +0.06 to +0.20,
                resampling whole recordings). On FailBench’s own pick-and-place protocol (balanced
                accuracy, all 140 test steps) our Gemini 3 Flash scores 0.83, matching the published
                0.84; Argon scores 0.993. Certification uses Learn-then-Test on held-out calibration
                tasks.
              </p>
              <p>
                Separately, cases built only from successful runs (wrong instruction, steps played
                backwards, near-complete frames) rank 12 related judge configurations like real
                failures do (rank correlation 0.87 to 0.96 on REASSEMBLE, 0.95 on FailBench pick and
                place); across six distinct models the REASSEMBLE ranking is weaker (0.54), and none
                of these cases gives a judge’s absolute accuracy. In replay on our saved judgments,
                the exact comparison engine certified the best of the 12 configurations with 35%
                (REASSEMBLE) and 59% (FailBench) fewer judgments than scoring everything, with every
                winner checked independently.
              </p>
            </section>

            <section id="implications" aria-labelledby="implications-title">
              <h2 id="implications-title">What this suggests for Argon</h2>
              <ul>
                <li>
                  <strong>Feed proprioception into hindsight labeling.</strong> Gripper width and
                  events carry timing and identity that video does not.
                </li>
                <li>
                  <strong>Benchmark failed-retry QC as its own capability,</strong> and give it
                  robot events, before its labels weight training data.
                </li>
                <li>
                  <strong>Ship a completion definition with success and progress prompts,</strong>{" "}
                  or train on near-complete negatives.
                </li>
                <li>
                  <strong>Check clocks, then cameras, then prompts.</strong> Re-time mixed-rate
                  cameras before labels are used; timed correctly, the wrist camera alone matches
                  two. Label in shorter or overlapping windows, or anchor them to robot events.
                </li>
              </ul>
              <p className="research-caveat">
                <strong>Next test: evaluation on actual deployment data.</strong> Score Argon’s
                labels and verdicts against operator takeovers in the field and measure how much
                failed time would reach training.
              </p>
            </section>

            <section id="methods" aria-labelledby="methods-title">
              <h2 id="methods-title">How the work was done</h2>
              <h3>Pre-registered</h3>
              <p>
                Hypotheses, splits and pass/fail rules were frozen in hashed records before grading.
                Results are reported whether or not a test passed: the robot-signal step’s
                pre-registered single-run gain (+0.045) narrowly missed its +0.05 bar; a per-action
                failure re-check failed its precision rule; the six-model ranking missed its 0.70
                bar; the robot-signal retry check missed its 0.70 recall target and its paired test.
              </p>
              <h3>Held out</h3>
              <p>
                Fixes were designed on 12 development recordings and tested on 12 others. The 1 fps
                setting was chosen on held-out runs and then confirmed on a fresh run frozen in
                advance. Model gaps carry intervals that resample whole recordings.
              </p>
              <h3>Audited from the inputs up</h3>
              <p>
                A separate re-analysis of the saved model outputs caught two errors in our own
                pipeline, both fixed here: structure matches did not require the same verb, and
                wrist clips played 7% fast (finding 5). The second changed two conclusions: the
                wrist camera, not the external one, carries the action structure, and the
                failed-retry leak is smaller than the mistimed clips showed (36 to 52% of failed
                time, not 48 to 68%). A fresh pre-registered run on corrected clips confirmed the
                direction; of its four predictions, one passed, two failed because scores came in
                above the predicted range, and one failed because a small wrist-only drift remains.
              </p>
              <h3>Public data, reproducible</h3>
              <p>
                REASSEMBLE (CC BY 4.0) and FailBench (Apache-2.0). All models were called through
                Vertex AI with identical prompts. Code, protocols and raw model outputs are
                available on request.
              </p>
            </section>

            <section id="limits" aria-labelledby="limits-title">
              <h2 id="limits-title">Limitations</h2>
              <ul>
                <li>
                  Hindsight labeling was measured on one robot cell (REASSEMBLE) with one parallel
                  gripper; 32 to 37 failed attempts in the held-out set. Evaluation on actual
                  deployments is the next test.
                </li>
                <li>
                  Results on correctly timed clips are one fresh run per setting; earlier repeat
                  runs varied by up to 0.07 action F1. The other Gemini models were compared only on
                  the earlier clips, which every model saw identically.
                </li>
                <li>
                  Both datasets were public before Argon’s release; training exposure cannot be
                  ruled out. Fresh data from actual deployments removes this concern.
                </li>
                <li>
                  Prompts listed the task’s verbs and parts. The gripper size catalogue came from
                  labeled development recordings.
                </li>
                <li>
                  The failed-retry finding uses our own labeling prompt with success flags; Google’s
                  internal quality-control prompt may behave differently. Both it and the early-done
                  finding are measured on recordings, not on a policy trained against Argon.
                </li>
                <li>
                  The dataset’s own labels are imperfect: in 6 actions the measured grasp width
                  contradicts the human part label and Argon agrees with the width. Scores keep the
                  human labels as given.
                </li>
              </ul>
            </section>

            <footer className="research-article-footer">
              <p className="eyebrow">CosmicBrain AI / San Francisco</p>
              <p>CosmicBrain AI. Independent evaluation for robot learning.</p>
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
