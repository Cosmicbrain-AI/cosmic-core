import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "@/components/explore/explore.css";
import "@/components/explore/research-article.css";

const title = "The machine audits the AI verifier · CosmicBrain Research";
const description =
  "Zero-label checks from the instrument log: auditing AI verifier input clocks, physical completion and review routing on held-out robot recordings.";
const url = "https://www.cosmicbrain.ai/docs/verifier-audit";
const image = "https://www.cosmicbrain.ai/docs/verifier-audit-outcomes.png";

export const Route = createFileRoute("/docs_/verifier-audit")({
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
      { property: "og:image:width", content: "1672" },
      { property: "og:image:height", content: "638" },
      {
        property: "og:image:alt",
        content: "Held-out verifier outcomes before and after instrument-log completion checks.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:url", content: url },
      { name: "twitter:image", content: image },
      {
        name: "twitter:image:alt",
        content: "Held-out verifier outcomes before and after instrument-log completion checks.",
      },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: VerifierAuditArticle,
});

const contents = [
  ["findings", "What we found"],
  ["evidence", "Evidence"],
  ["workflow", "Using the audit"],
  ["methods", "Methods"],
  ["limits", "Limitations"],
];

const outcomes = [
  ["Model A, medium", "36 / 10 / 3", "89 / 89 / 86"],
  ["Model A, high", "38 / 9 / 2", "92 / 91 / 88"],
  ["Model A, wrist camera", "41 / 8 / 2", "86 / 85 / 81"],
  ["Model A, external cameras", "34 / 8 / 6", "78 / 77 / 75"],
  ["Model A, 8 frames", "29 / 8 / 4", "78 / 78 / 74"],
  ["Model B (smaller)", "86 / 16 / 11", "86 / 86 / 82"],
  ["Model B, high", "91 / 16 / 10", "84 / 84 / 81"],
];

function VerifierAuditArticle() {
  return (
    <div className="explore-page research-page">
      <SiteHeader />
      <main id="article-top">
        <header className="research-header explore-wrap">
          <Link to="/docs" className="research-back">
            <ArrowLeft size={15} /> All research
          </Link>
          <p className="eyebrow">CosmicBrain AI / Verification research</p>
          <h1>
            The machine audits
            <br />
            <em>the AI verifier.</em>
          </h1>
          <p className="research-subtitle">Zero-label checks from the instrument log</p>
          <div className="research-meta">
            <time dateTime="2026-10">October 2026</time>
            <span>Research brief</span>
            <span>Read online</span>
          </div>
          <p className="research-deck">
            A vision-language model judged real robot work against human ground truth. Using only
            the robot’s instrument log, we audited its inputs, rewards and likely errors, without
            human labels, task-specific code or extra model calls in the audit.
          </p>
          <p className="research-scope">
            Public data. Held-out recordings. Pre-registered tests. Results from recorded data and
            saved verdicts, not a policy trained against the reward.
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
          <article className="research-body" aria-label="Verifier audit research brief">
            <aside className="research-takeaway">
              <p className="eyebrow">The central result</p>
              <p>
                A model can verify physical outcomes without being able to vouch for itself. Pair
                its verdict with instrument-log checks to audit the input clock, test physical
                completion and prioritize human review.
              </p>
            </aside>

            <section id="findings" aria-labelledby="findings-title">
              <h2 id="findings-title">What we found</h2>
              <h3>01 / Confidence cannot decide which checks to skip</h3>
              <p>
                The verifier separated real successes from failures well: AUROC was{" "}
                <strong>0.89</strong> on contact-rich assembly. But approvals issued at{" "}
                <strong>0.99 confidence were wrong 9.7% of the time</strong>, compared with 8.6% of
                approvals overall. This pattern held across the thinking levels and resolutions
                tested. Strong discrimination did not make the model’s confidence a reliable
                self-audit.
              </p>

              <h3>02 / The log detects faults in the model’s inputs</h3>
              <p>
                Wrist-camera clips were playing about 7% fast. The model’s labels drifted while
                still looking plausible. Aligning its step boundaries with gripper events estimated
                playback speed at <strong>1.080</strong>, against a true speed of{" "}
                <strong>1.073</strong>. Correct clips were estimated at 0.98–1.00.
              </p>
              <p>
                In a blind test, three speeds were drawn and sealed before the model labeled fresh
                clips. The audit estimated <strong>0.932, 0.936 and 0.972</strong>, against hidden
                speeds of <strong>0.936, 0.934 and 0.968</strong>, flagging all three faults.
              </p>
              <p className="research-caveat">
                <strong>Pre-registration result:</strong> the registered comparison used the
                reciprocal of the speed, an algebra error. That criterion fails as written; both the
                registered and corrected scorings are reported. The audit also missed partial drift
                when the model mixed two cameras running on different clocks.
              </p>

              <h3>03 / The log learns physical completion checks</h3>
              <p>
                A reward based only on the model can pay for stopping just before a step finishes.
                From the model’s own step labels and the instrument log, a learner contrasted each
                step’s end with the instant before it and wrote readable goal-state rules: an insert
                or placement must release the part; a pick or removal must hold it and lift it.
              </p>
              <p>
                The checks were learned on separate recordings without human labels. In the primary
                held-out configuration, near-complete states rewarded as “done” fell from{" "}
                <strong>36.2% to 10.0%</strong>; real completions rewarded fell from 89.4% to 88.8%.
                A hand-written engineering check reduced the stop-short rate to 3.1%, while
                rewarding 86.2% of real completions.
              </p>
              <p>
                On a pre-registered confirmation set of <strong>310 fresh frames</strong>, the
                learned checks reduced stop-short rewards from <strong>25.9% to 7.4%</strong>, with
                no additional real completions rejected. The hand-written check reached 3.7%, with
                3.4% of real completions rejected.
              </p>
              <p className="research-caveat">
                <strong>Target missed:</strong> the learned checks blocked 71% of the model’s false
                “done” calls, below the pre-registered 75% target. The zero additional completion
                rejection applies to the fresh-frame confirmation, not every configuration.
              </p>

              <h3>04 / Disagreement directs human review</h3>
              <p>
                In the reported agreement subset, the verifier was wrong once in 82 steps. The{" "}
                <strong>24 disagreement steps contained 9 of its 10 errors</strong>. Reviewing about
                23% of steps therefore caught 90% of errors, compared with about two errors expected
                from a random review of the same size.
              </p>
              <p>
                This review-routing result is exploratory, with only ten model errors. It is a
                promising routing signal, not a calibrated guarantee.
              </p>
            </section>

            <section id="evidence" aria-labelledby="evidence-title">
              <h2 id="evidence-title">Evidence</h2>
              <figure className="research-figure">
                <a
                  href="/docs/verifier-audit-clock.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open full-size input-clock audit figure"
                >
                  <img
                    src="/docs/verifier-audit-clock.png"
                    width="1144"
                    height="572"
                    loading="lazy"
                    alt="Playback speeds estimated from the gripper log compared with true input speeds. Correct-clock runs cluster around 1.00; the real fast-clock fault and all three blind faults are detected. Error bars show 95% intervals."
                  />
                </a>
                <figcaption>
                  <strong>Figure 1. Input-clock audit.</strong> Playback speed estimated from the
                  gripper log and the model’s own labels, against the truth. The 95% intervals
                  resample whole recordings. In the blind runs, speeds were sealed before the model
                  labeled 32 held-out two-minute windows per run; estimates were written before
                  unsealing. Two mixed-camera runs are not shown: the audit read 0.98 and missed
                  their partial drift. Select the figure to inspect it at full size.
                </figcaption>
              </figure>

              <figure className="research-figure">
                <a
                  href="/docs/verifier-audit-outcomes.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open full-size verifier outcomes figure"
                >
                  <img
                    src="/docs/verifier-audit-outcomes.png"
                    width="1672"
                    height="638"
                    loading="lazy"
                    alt="Seven verifier configurations on two models. Instrument-log checks reduce near-complete states rewarded as done; the second panel reports real completions rewarded, retaining the trade-off for each configuration."
                  />
                </a>
                <figcaption>
                  <strong>Figure 2. Completion checks on held-out recordings.</strong> Saved
                  verdicts on 160 near-complete states and 160 real completions, across seven
                  configurations of two models. Near-complete states are the end of approach or
                  alignment for inserts and placements, and the end of grasp for picks and removals.
                  Learned and hand-written checks were fixed using separate recordings. This
                  320-state suite is distinct from the 310-frame confirmation.
                </figcaption>
              </figure>

              <details className="research-data-details">
                <summary>Read the values in Figure 2</summary>
                <p>
                  Percentages below are the rounded chart labels. Within each cell: model alone /
                  learned checks / hand-written check. Lower is better for stop-short rewards;
                  higher is better for real completions rewarded.
                </p>
                <div
                  className="research-table-scroll"
                  role="region"
                  aria-label="Verifier configuration outcomes"
                  tabIndex={0}
                >
                  <table>
                    <caption>Held-out outcomes, percentages</caption>
                    <thead>
                      <tr>
                        <th scope="col">Configuration</th>
                        <th scope="col">Stop-short rewarded</th>
                        <th scope="col">Real completions rewarded</th>
                      </tr>
                    </thead>
                    <tbody>
                      {outcomes.map(([configuration, stopped, completed]) => (
                        <tr key={configuration}>
                          <th scope="row">{configuration}</th>
                          <td>{stopped}</td>
                          <td>{completed}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>

              <h3>The goal states learned from the log</h3>
              <div
                className="research-table-scroll"
                role="region"
                aria-label="Learned and hand-written completion rules"
                tabIndex={0}
              >
                <table>
                  <caption>Physical completion rules, learned without human labels</caption>
                  <thead>
                    <tr>
                      <th scope="col">Step</th>
                      <th scope="col">Learned goal state</th>
                      <th scope="col">Hand-written equivalent</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Insert</th>
                      <td>Gripper opened past 74 mm within 0.5 seconds.</td>
                      <td>Released.</td>
                    </tr>
                    <tr>
                      <th scope="row">Place</th>
                      <td>
                        Gripper fully open, having opened more than 30 mm since the step began.
                      </td>
                      <td>Released.</td>
                    </tr>
                    <tr>
                      <th scope="row">Pick</th>
                      <td>Gripper closed on the part and the arm moving up.</td>
                      <td>Holding the part, lifted at least 2 mm.</td>
                    </tr>
                    <tr>
                      <th scope="row">Remove</th>
                      <td>Gripper closed and the arm at least 5 mm above its lowest point.</td>
                      <td>Holding the part, lifted at least 2 mm.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="workflow" aria-labelledby="workflow-title">
              <h2 id="workflow-title">Using the audit</h2>
              <h3>One audit call per log</h3>
              <p>
                The research interface <code>audit(model_labels)</code> returns an input-clock
                estimate, readable completion rules, a physical verdict per step and a review queue.
                It uses no human labels, task-specific code or additional model calls. The reported
                runtime was 1.5 seconds per hour of robot work on a laptop. A machine connects
                through two functions: its log and an event stream from an actuator signal.
              </p>
              <h3>Pair the model with the instruments</h3>
              <p>
                Positions, forces and actuator states offer evidence that fails differently from a
                model verdict. If a check cannot be resolved, the system returns{" "}
                <code>unknown</code> rather than approving. The reward becomes a conjunction:{" "}
                <strong>
                  the model says the task succeeded and the instruments say the step finished.
                </strong>
              </p>
              <h3>A separate engineering-software case</h3>
              <p>
                In a separate study, two separately generated simulators agreed on a circuit design
                that violated its 8 V limit, reaching about 9.94 V. Checking the decision against
                the continuous-time requirement rejected that design and selected one that passed.
                This result covers four retrospective cases in one ideal circuit family, using a
                hand-built reference; it is not yet automatic for new programs.
              </p>
            </section>

            <section id="methods" aria-labelledby="methods-title">
              <h2 id="methods-title">How the work was done</h2>
              <h3>Data and held-out evaluation</h3>
              <p>
                The study used REASSEMBLE (CC BY 4.0): a parallel-gripper robot arm assembling and
                disassembling parts on a task board. The data includes human action, outcome and
                skill labels; external and wrist cameras; and gripper, arm and force logs. Every
                method was designed on 12 recordings and tested on 12 other recordings.
              </p>
              <h3>Pre-registered tests</h3>
              <p>
                Test rules, thresholds and pass/fail criteria were frozen in hashed records with the
                code commit before held-out runs. Results are reported whether tests passed or
                failed, and settings tried during design are disclosed in each record. The
                clock-comparison algebra error is reported both as registered and as corrected.
                Tampered proofs, injected faults and near-complete states were used to red-team the
                checks; gaps found and closed are disclosed in the study logs. Review routing
                remains exploratory.
              </p>
              <h3>What “zero-label” means here</h3>
              <p>
                The clock audit uses the model’s labels and the gripper log. Learned completion
                checks use the model’s step labels and the gripper, arm and force logs.{" "}
                <strong>
                  Human labels are used only to score the results, not to build the checks.
                </strong>{" "}
                The model verifier itself still produces the labels being audited.
              </p>
            </section>

            <section id="limits" aria-labelledby="limits-title">
              <h2 id="limits-title">Limitations</h2>
              <ul>
                <li>
                  <strong>One robot cell and one dataset.</strong> A second machine type remains the
                  next test. Clock auditing needs step boundaries that coincide with instrument
                  events, and missed partial drift across mixed camera clocks.
                </li>
                <li>
                  <strong>Learned checks retain a trade-off.</strong> On fresh frames, about 7% of
                  stop-short states were rewarded with learned checks, against about 4% with the
                  hand-written check. The learned checks missed the 75% blocking target. The number
                  of hard negatives was chosen on development data; using three instead of two made
                  one step type substantially worse there.
                </li>
                <li>
                  <strong>Physical completion is not semantic correctness.</strong> The checks do
                  not determine whether the right part went to the right place. That judgment still
                  belongs to the model.
                </li>
                <li>
                  <strong>The circuit result has narrow scope.</strong> It covers four retrospective
                  cases in one ideal circuit family and relies on a hand-built reference.
                </li>
                <li>
                  <strong>No reward-trained policy was evaluated.</strong> These are results on
                  recorded data and saved verdicts. The review-routing counts are small, with ten
                  model errors.
                </li>
              </ul>
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
