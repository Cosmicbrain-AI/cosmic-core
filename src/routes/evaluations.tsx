import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Download, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/explore/shared";
import { ContactDialog } from "@/components/ContactDialog";
import {
  annotationExample,
  protocolSteps,
  metricDefinitions,
  workflows,
  generalizationAxes,
  benchmarkReferences,
} from "@/data/evaluation-protocol";
import { wilsonInterval } from "@/lib/evaluation-statistics";
import "@/components/explore/evaluations.css";

const title = "Physical AI evaluation protocol · CosmicBrain";
const description =
  "A research-backed protocol for robot policy evaluations, live-site benchmarks and annotation quality. Explore example figures, uncertainty, open benchmarks and reproducible evidence.";
export const Route = createFileRoute("/evaluations")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://www.cosmicbrain.ai/evaluations" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://www.cosmicbrain.ai/evaluations" }],
  }),
  component: EvaluationsPage,
});

function SectionTitle({
  number,
  title,
  accent,
  children,
}: {
  number: string;
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="eval-section-heading">
      <span className="explore-note-label">{number} / Evaluation notebook</span>
      <h2>
        {title} <em>{accent}</em>
      </h2>
      <p>{children}</p>
    </div>
  );
}

function AnnotationScores() {
  return (
    <figure className="eval-figure eval-rubric">
      <div className="eval-figure-top">
        <div>
          <span className="explore-note-label">Supplied example / n = 1 episode</span>
          <h3>A demonstration, under the microscope.</h3>
        </div>
        <span className="eval-tag">Teleoperated · model-scored</span>
      </div>
      <p className="eval-figure-intro">
        Two kinds of evidence appear in the supplied figure. Rubric percentages describe a score
        relative to its maximum; probabilities describe the judge’s belief.
      </p>
      <div
        className="eval-score-chart"
        role="img"
        aria-label="One episode: label consistency 99 percent, annotation completeness 91 percent, judge task-success probability 0.89, judge hierarchy-readiness probability 0.77, hospitality relevance 50 percent."
      >
        {annotationExample.scores.map((s) => (
          <div className="eval-score-row" key={s.label}>
            <div className="eval-score-label">
              <strong>{s.label}</strong>
              <span>{s.kind}</span>
            </div>
            <div className="eval-score-track">
              <div style={{ width: `${s.value}%`, background: s.color }} />
            </div>
            <div className="eval-score-value">
              <strong>{s.value}%</strong>
              <span>{s.detail}</span>
            </div>
          </div>
        ))}
        <div className="eval-score-axis" aria-hidden="true">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100%</span>
        </div>
      </div>
      <figcaption>
        Values transcribed from the supplied TypeSafe JEV figure. The 0.89 task-success judgment is
        not an observed autonomous success rate. Reported judge confidence is not a statistical
        confidence interval. The 50% relevance score concerns this toy sorting task.
      </figcaption>
      <div className="eval-figure-links">
        <a href="/evaluations/annotation-rubric.jpeg" target="_blank" rel="noreferrer">
          View supplied figure <ArrowUpRight size={14} />
        </a>
        <a href="/evaluations/annotation-example.json" download>
          Example data <Download size={14} />
        </a>
      </div>
    </figure>
  );
}

function UncertaintyCalculator() {
  const [successes, setSuccesses] = useState("80");
  const [trials, setTrials] = useState("100");
  const interval =
    successes.trim() && trials.trim() ? wilsonInterval(Number(successes), Number(trials)) : null;
  return (
    <div className="eval-calculator">
      <span className="explore-note-label">Try the calculation / illustrative inputs</span>
      <h3>A percentage needs a denominator.</h3>
      <div className="eval-inputs">
        <label>
          Unassisted successes
          <input
            type="number"
            min="0"
            step="1"
            value={successes}
            onChange={(e) => setSuccesses(e.target.value)}
          />
        </label>
        <label>
          Valid initiated attempts
          <input
            type="number"
            min="1"
            step="1"
            value={trials}
            onChange={(e) => setTrials(e.target.value)}
          />
        </label>
      </div>
      <div className="eval-calculator-result" aria-live="polite" aria-atomic="true">
        {interval ? (
          <>
            <strong>
              {(interval.rate * 100).toFixed(1)}% <span>observed success</span>
            </strong>
            <p>
              95% Wilson interval:{" "}
              <b>
                {(interval.lower * 100).toFixed(1)}% to {(interval.upper * 100).toFixed(1)}%
              </b>
            </p>
          </>
        ) : (
          <p>
            Enter whole numbers with at least one attempt and successes between zero and the number
            of attempts.
          </p>
        )}
      </div>
      <p className="eval-fine">
        This is a local mathematical calculator, not a CosmicBrain result. Assumes independent
        binary trials. For repeated trials within shared sites or sessions, use an analysis that
        accounts for clustering.
      </p>
    </div>
  );
}

function WorkflowScope() {
  const [selected, setSelected] = useState(0);
  const workflow = workflows[selected];
  return (
    <div className="eval-scope">
      <div className="eval-scope-tabs" aria-label="Choose a workflow example">
        {workflows.map((w, i) => (
          <button
            key={w.id}
            type="button"
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            {w.label}
          </button>
        ))}
      </div>
      <div className="eval-scope-grid" aria-live="polite">
        <div>
          <span className="explore-note-label">{workflow.status} / proposed trial scope</span>
          <h3>{workflow.task}</h3>
          <p>{workflow.exclusions}</p>
        </div>
        <div>
          <h4>Observable success predicate</h4>
          <p>{workflow.success}</p>
          <h4>Conditions to vary and report</h4>
          <ul>
            {workflow.shifts.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function EvaluationsPage() {
  return (
    <main className="explore-page eval-page">
      <SiteHeader />
      <PageHero
        kicker="Physical AI / Evaluation protocol v0.1"
        title="Capability is a claim."
        accent="Evidence is the work."
        sub="A protocol for testing robot policies where they have to perform. Connect data quality, open benchmarks and controlled site trials to evidence a model team can inspect and an operator can act on."
        sketch="arm"
        note="Define the task. Record every attempt."
      />
      <div className="explore-wrap">
        <div className="eval-intro-bar">
          <span>Public protocol design · October 2, 2026</span>
          <a href="/evaluations/protocol-v0.1.json" download>
            Download protocol template <Download size={15} />
          </a>
        </div>
        <nav className="eval-jump-nav" aria-label="Evaluation page sections">
          <a href="#protocol">The protocol</a>
          <a href="#annotation">Data & annotation</a>
          <a href="#field-metrics">Field metrics</a>
          <a href="#uncertainty">Uncertainty</a>
          <a href="#open-benchmarks">Open benchmarks</a>
          <a href="#evidence">Evidence package</a>
        </nav>
        <figure className="eval-montage">
          <img
            src="/evaluations/robot-task-montage.jpeg"
            width="1920"
            height="714"
            alt="A montage of bimanual robot demonstrations manipulating everyday objects across varied tabletop scenes."
            fetchPriority="high"
          />
          <figcaption>
            <span>Different objects. Different scenes. The same demand for evidence.</span>
            <span>
              Supplied reference imagery; task outcomes are not inferred from these frames.
            </span>
          </figcaption>
        </figure>
        <div className="eval-evidence-layers">
          {[
            [
              "01",
              "Data integrity",
              "Is the demonstration observable, synchronized and consistently labeled?",
            ],
            [
              "02",
              "Policy capability",
              "Can a frozen model complete a reproducible benchmark task?",
            ],
            [
              "03",
              "Field performance",
              "Does it work on the tested robot, at the tested site, with assistance accounted for?",
            ],
          ].map(([n, t, p]) => (
            <div key={n}>
              <span className="explore-note-label">{n} / Evidence layer</span>
              <h3>{t}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>

        <section id="protocol" className="eval-section">
          <SectionTitle number="01" title="Before the first trial," accent="write the contract.">
            A benchmark becomes useful when the task, conditions and scoring rule stay fixed. This
            public design is the starting point for scoping an engagement, with thresholds and
            operating limits agreed for each robot and site.
          </SectionTitle>
          <ol className="eval-protocol-steps">
            {protocolSteps.map(([t, p], i) => (
              <li key={t}>
                <span className="eval-step-number">0{i + 1}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{p}</p>
                </div>
              </li>
            ))}
          </ol>
          <WorkflowScope />
        </section>

        <section id="annotation" className="eval-section">
          <SectionTitle number="02" title="One episode." accent="Every primitive.">
            A useful training demonstration needs more than a video. It needs timing, action
            boundaries, arm identity, object attributes and an auditable relationship between the
            labels and what happened.
          </SectionTitle>
          <div className="eval-stat-strip">
            {[
              ["42 s", "episode duration"],
              ["20", "labeled segments"],
              ["98.5%", "reported timeline coverage"],
              ["0", "reported overlapping segments"],
            ].map(([v, l]) => (
              <div key={l}>
                <strong>{v}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>
          <figure className="eval-figure eval-timeline">
            <img
              src="/evaluations/bimanual-timeline.jpeg"
              loading="lazy"
              width="1526"
              height="865"
              alt="Supplied 42-second bimanual block-sorting annotation timeline: left and right arm tracks show approach, grasp, lift, move over box, place, return home and idle."
            />
            <figcaption>
              Supplied annotation summary for one teleoperated demonstration: 20 segments, 98.5%
              coverage, zero overlaps, one-frame gaps at 30 fps (approximately 33 ms), and
              attributes for 15 of 15 objects. Exact timestamps and the underlying annotation
              records were not supplied, so the timeline is shown as provided.
            </figcaption>
            <div className="eval-figure-links">
              <a href="/evaluations/bimanual-timeline.jpeg" target="_blank" rel="noreferrer">
                Open original timeline <ArrowUpRight size={14} />
              </a>
            </div>
          </figure>
          <AnnotationScores />
          <div className="eval-two-col eval-annotation-notes">
            <div>
              <h3>Make annotation quality measurable.</h3>
              <p>
                Compute coverage from the union of labeled intervals over a declared eligible
                duration, per arm or per episode. Measure overlaps on the same track; simultaneous
                actions across arms can be valid. Check boundaries with a stated frame tolerance and
                validate required object attributes.
              </p>
              <p>
                Audit a held-out subset with two human reviewers and an adjudication rule. Retain
                disagreements, missing data and rubric versions. Pin model-judge inputs and outputs,
                then test agreement and calibration against the human reference.
              </p>
            </div>
            <div>
              <h3>Keep the signals separate.</h3>
              <p>
                The example’s completeness score of 91% and its 98.5% temporal coverage measure
                different things. Coverage asks how much time is labeled; completeness is a rubric
                judgment about the annotation.
              </p>
              <p>
                A model’s probability or reported confidence is not a measured robot success
                frequency. Using a judge for review does not replace controlled autonomous trials.{" "}
                <a href="https://docs.typesafe.ai/primitives" target="_blank" rel="noreferrer">
                  JEV rubric type reference <ArrowUpRight size={12} />
                </a>
              </p>
            </div>
          </div>
          <figure className="eval-montage eval-human-montage">
            <img
              src="/evaluations/humanoid-task-montage.jpeg"
              width="1376"
              height="768"
              loading="lazy"
              alt="Supplied montage of a humanoid demonstrating manipulation of fruit, bowls, bags and a small crate on a table."
            />
            <figcaption>
              <span>From demonstrations to an inspectable record of work.</span>
              <span>
                Reference montage; evaluation outcomes require episode logs and a scoring rule.
              </span>
            </figcaption>
          </figure>
          <div className="eval-callout">
            <span className="explore-note-label">
              Evidence provenance / image estimates vs telemetry
            </span>
            <h3>A high score still needs a traceable source.</h3>
            <p>
              The supplied evaluation view pairs task scores with an explicit evidence-quality
              label. Its motion estimate is sourced from a 2D vision-language model, with unknown
              scale and a sparse image path measured in frame axes. Those coordinates do not
              establish metric travel, joint motion or contact force. Keep estimated signals
              separate from calibrated measurements, and show missing evidence alongside the score.
            </p>
          </div>
          <figure className="eval-figure eval-timeline">
            <img
              src="/evaluations/evidence-review.png"
              width="2252"
              height="1760"
              loading="lazy"
              alt="Supplied evaluation interface with robot episode cards and a 9.4 out of 10 rubric score. A motion provenance panel marks VLM 2D, unknown scale, and thin evidence, with image coordinates distinguished from metric distance and joint telemetry."
            />
            <figcaption>
              Supplied evaluation UI example. The visible 9.4/10 score and 0.03 frame-axis path are
              displayed by that interface; the scoring run, raw frames and measurement pipeline were
              not supplied for independent recomputation. Image-space motion is not robot telemetry.
            </figcaption>
            <div className="eval-figure-links">
              <a href="/evaluations/evidence-review.png" target="_blank" rel="noreferrer">
                Inspect supplied evaluation view <ArrowUpRight size={14} />
              </a>
            </div>
          </figure>
        </section>

        <section id="field-metrics" className="eval-section">
          <SectionTitle number="03" title="Measure the work." accent="And the help it needed.">
            A robot can finish a task while an operator does the hard part. Report autonomous
            completion, assistance, progress and operational burden as separate measures.
          </SectionTitle>
          <div className="eval-table-scroll">
            <table className="eval-table">
              <caption>Field metrics and their reporting units</caption>
              <thead>
                <tr>
                  <th scope="col">Measure</th>
                  <th scope="col">Definition</th>
                  <th scope="col">Report</th>
                </tr>
              </thead>
              <tbody>
                {metricDefinitions.map(([t, d, u]) => (
                  <tr key={t}>
                    <th scope="row">{t}</th>
                    <td>{d}</td>
                    <td>{u}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="eval-callout">
            <span className="explore-note-label">Denominator policy</span>
            <h3>Every initiated attempt has a place in the report.</h3>
            <p>
              A policy-caused stop, timeout or human takeover remains a failed unassisted attempt.
              Assisted completion can be recorded separately. Infrastructure-invalid attempts may be
              excluded only under rules fixed before testing; preserve their logs and disclose
              counts, reasons and replacement trials. Include reset time and downtime when reporting
              tasks per wall-clock hour.
            </p>
          </div>
          <h3 className="eval-subheading">Generalization is a set of tests.</h3>
          <p className="eval-body-intro">
            Separate zero-shot performance from performance after site adaptation. Disclose the
            adaptation budget and known training exposure; label unknown overlap as unknown. Do not
            average away a weak site or platform.
          </p>
          <div className="eval-table-scroll">
            <table className="eval-table eval-shift-table">
              <caption>Holdout design for evaluating generalization</caption>
              <thead>
                <tr>
                  <th scope="col">Shift</th>
                  <th scope="col">Hold out</th>
                  <th scope="col">Report separately</th>
                </tr>
              </thead>
              <tbody>
                {generalizationAxes.map(([t, d, u]) => (
                  <tr key={t}>
                    <th scope="row">{t}</th>
                    <td>{d}</td>
                    <td>{u}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="uncertainty" className="eval-section">
          <SectionTitle number="04" title="More trials." accent="A clearer estimate.">
            An 80% result from ten attempts and an 80% result from a hundred attempts carry
            different uncertainty. Publish the numerator, denominator and uncertainty alongside
            every success percentage.
          </SectionTitle>
          <div className="eval-two-col eval-precision-grid">
            <figure className="eval-figure eval-precision">
              <span className="explore-note-label">Mathematical planning illustration</span>
              <h3>How precision changes with trial count.</h3>
              <img
                src="/evaluations/precision-planning.svg"
                width="1000"
                height="650"
                loading="lazy"
                alt="At a hypothetical observed success rate of 50 percent, 95 percent Wilson interval half-width falls from 26.3 percentage points for 10 independent trials to 20.1 for 20, 13.4 for 50, 9.6 for 100, 6.9 for 200 and 4.9 for 400."
              />
              <figcaption>
                Hypothetical 50% observed success; two-sided 95% Wilson intervals. Independent
                binary trials only. This figure is statistical planning, not measured CosmicBrain
                performance.{" "}
                <a
                  href="https://www.itl.nist.gov/div898/software/dataplot/refman1/auxillar/propconf.htm"
                  target="_blank"
                  rel="noreferrer"
                >
                  Method: NIST proportion intervals.
                </a>
              </figcaption>
              <div className="eval-figure-links">
                <a href="/evaluations/precision-planning.svg" download>
                  Download graph <Download size={14} />
                </a>
                <a href="/evaluations/precision-planning.csv" download>
                  Chart data <Download size={14} />
                </a>
              </div>
            </figure>
            <UncertaintyCalculator />
          </div>
          <p className="eval-fine">
            For comparisons, use matched task blocks and an analysis that respects task, session and
            site structure. Report macro averages across tasks as well as pooled episode counts,
            declare weights, and retain slice-level results. Choose sample size and stopping rules
            before observing results.
          </p>
        </section>

        <section id="open-benchmarks" className="eval-section">
          <SectionTitle
            number="05"
            title="Build on open research."
            accent="Keep its boundaries visible."
          >
            Open benchmarks make experiments repeatable and expose distinct failure modes. These
            references inform the protocol; benchmark adapters and test scope are selected per
            engagement.
          </SectionTitle>
          <div className="eval-benchmarks">
            {benchmarkReferences.map((b, i) => (
              <article className="eval-benchmark" key={b.name}>
                <div className="eval-benchmark-top">
                  <span className="explore-note-label">
                    0{i + 1} / {b.type}
                  </span>
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Read the official ${b.name} source`}
                  >
                    <ArrowUpRight size={22} />
                  </a>
                </div>
                <h3>
                  <a href={b.url} target="_blank" rel="noreferrer">
                    {b.name}
                  </a>
                </h3>
                <p>{b.lesson}</p>
                <dl>
                  <dt>Protocol lesson</dt>
                  <dd>{b.use}</dd>
                  <dt>Scope boundary</dt>
                  <dd>{b.limit}</dd>
                </dl>
              </article>
            ))}
          </div>
          <p className="eval-fine">
            Primary project and documentation sources reviewed October 2, 2026. Pin a release or
            commit, task IDs, initial-state distribution, controller, observation mode and episode
            horizon. Scores from different tasks, embodiments, simulators or time budgets are not
            directly comparable. Simulation and live-site results belong in separately labeled
            reports.
          </p>
        </section>

        <section id="evidence" className="eval-section eval-evidence-section">
          <SectionTitle
            number="06"
            title="A score is the beginning."
            accent="Evidence is the deliverable."
          >
            Give the model team enough detail to debug, and the site operator enough context to
            judge the tested operating envelope. A result should trace back to a task, a run and an
            outcome.
          </SectionTitle>
          <div className="eval-package-grid">
            <div>
              <h3>A report another team can inspect.</h3>
              <ul className="eval-package-list">
                <li>
                  <b>Protocol manifest</b>
                  <span>Task predicates, holdouts, horizons, assistance and exclusion rules.</span>
                </li>
                <li>
                  <b>System manifest</b>
                  <span>
                    Checkpoint hash, robot profile, cameras, calibration, control and inference
                    runtime.
                  </span>
                </li>
                <li>
                  <b>Episode ledger</b>
                  <span>Outcomes, failures, stops, interventions and every denominator.</span>
                </li>
                <li>
                  <b>Replayable evidence</b>
                  <span>
                    Synchronized video, observation/action logs and annotation provenance, subject
                    to agreed site permissions.
                  </span>
                </li>
                <li>
                  <b>Analysis record</b>
                  <span>
                    Metric code, uncertainty method, aggregation, slice results and judge audits.
                  </span>
                </li>
              </ul>
            </div>
            <div className="eval-downloads">
              <span className="explore-note-label">Protocol starter files / v0.1</span>
              <h3>Make the evaluation explicit.</h3>
              <a href="/evaluations/protocol-v0.1.json" download>
                Protocol & episode template <Download size={17} />
              </a>
              <a href="/evaluations/report-template.md" download>
                Reporting checklist <Download size={17} />
              </a>
              <a href="/evaluations/annotation-example.json" download>
                Supplied example data <Download size={17} />
              </a>
              <p>
                Templates are proposed specifications. Empty fields are left unmeasured. The example
                file contains values from the supplied figures, not raw episode records.
              </p>
            </div>
          </div>
        </section>
        <section className="eval-final-cta">
          <div>
            <span className="explore-note-label">
              For model teams, site operators & hardware partners
            </span>
            <h2>
              Bring a model.
              <br />
              <em>Define the test.</em>
            </h2>
            <p>
              Scope a live-site evaluation around the workflow, platform and conditions that matter
              to you.
            </p>
          </div>
          <div>
            <ContactDialog
              title="Let’s scope a field evaluation."
              description="Tell us about your model, robot platform, task and target environment."
              subject="Evaluation protocol and live-site benchmark inquiry"
              messagePlaceholder="Model or checkpoint, robot platform, target workflow, site conditions, success criteria and desired evaluation scope…"
              trigger={
                <button type="button" className="button">
                  Plan an evaluation <ArrowUpRight size={17} />
                </button>
              }
            />
            <a href="/docs" className="explore-text-link">
              Read Cosmic 0.5 <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
