import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "@/components/explore/explore.css";
import "@/components/explore/research-article.css";

const title = "From Human Motion to Humanoid Action · CosmicBrain Research";
const description =
  "A universal stack for human-to-humanoid skill transfer: canonical motion, capture, fusion, retargeting and gated execution, with architecture, production parameters and limitations.";
const url = "https://www.cosmicbrain.ai/docs/cosmic-0-5";
const image = "https://www.cosmicbrain.ai/docs/cosmic-0-5/figure-05-canonical-motion.jpg";

export const Route = createFileRoute("/docs_/cosmic-0-5")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1500" },
      { property: "og:image:height", content: "990" },
      {
        property: "og:image:alt",
        content:
          "An uncalibrated monocular observation resolved into body-relative humanoid motion.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:url", content: url },
      { name: "twitter:image", content: image },
      {
        name: "twitter:image:alt",
        content:
          "An uncalibrated monocular observation resolved into body-relative humanoid motion.",
      },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: CosmicHalfArticle,
});

type FigureAsset = { file: string; width: number; height: number; alt: string };

const figureAssets: Record<number, FigureAsset[]> = {
  "1": [
    {
      file: "figure-01-approach-grasp-1.jpg",
      width: 1500,
      height: 969,
      alt: "A humanoid robot in a Cosmic Brain shirt reaching toward produce scattered on a wooden deck beside a white bowl.",
    },
    {
      file: "figure-01-approach-grasp-2.jpg",
      width: 1500,
      height: 969,
      alt: "The same robot with its dexterous hand closed around a lemon, lifting it from the deck.",
    },
  ],
  "2": [
    {
      file: "figure-02-three-planes.svg",
      width: 940,
      height: 400,
      alt: "Architecture diagram: four capture modalities feed a canonical motion representation, which is refined and retargeted into a robot action bundle, which is gated by Mission Control before reaching hardware.",
    },
  ],
  "3": [
    {
      file: "figure-03-monocular-studio.jpg",
      width: 1500,
      height: 972,
      alt: "Cosmicbrain Studio showing three panels: original phone video of a man sorting produce into baskets, the same video with 2D pose and hand landmarks overlaid, and a simulated humanoid replaying the motion.",
    },
  ],
  "4": [
    {
      file: "figure-04-egocentric-capture.jpg",
      width: 1500,
      height: 943,
      alt: "Egocentric capture viewer showing an RGB frame of two hands assembling a computer, with 21-landmark hand skeletons and millimetre depth readouts, plus depth-map and IMU orientation panels and an annotated timeline.",
    },
  ],
  "5": [
    {
      file: "figure-05-canonical-motion.jpg",
      width: 1500,
      height: 990,
      alt: "Diagram showing a monocular video of a person placing a blue box on a table, projected as a camera frustum, with the reconstructed humanoid robot performing the same reach beside it.",
    },
  ],
  "6": [
    {
      file: "figure-06-motion-pipeline.svg",
      width: 900,
      height: 620,
      alt: "Flowchart of the motion pipeline: pose provider and hand specialist are fused with confidence weighting, passed through a three-stage temporal filter, gated by a view classifier into diffusion refinement or occlusion infill, then retargeted and packaged into a bundle.",
    },
  ],
  "7": [
    {
      file: "figure-07-filtering-controls.jpg",
      width: 1500,
      height: 1470,
      alt: "The Cosmicbrain Studio filtering panel, showing One-Euro smoothing parameters, Savitzky-Golay window settings, RTS smoother noise terms, and fusion and hand-tracking controls.",
    },
  ],
  "8": [
    {
      file: "figure-08-refinement-controls.jpg",
      width: 1500,
      height: 1476,
      alt: "Refinement panel showing diffusion refinement and occlusion-fill toggles, view classification thresholds, model selectors, diffusion step count, seed, and the natural-language refinement and occlusion prompts.",
    },
  ],
  "9": [
    {
      file: "figure-09-retargeting.svg",
      width: 900,
      height: 330,
      alt: "Diagram showing one canonical motion fanning out through a retarget profile into three different robot embodiments, with body-relative timing preserved and joint ranges differing per target.",
    },
  ],
  "10": [
    {
      file: "figure-10-bundle-composition.jpg",
      width: 1500,
      height: 1466,
      alt: "Retarget and output panel showing hand profile selection, feet stabilization, joint limit clamping and velocity limit toggles, and the list of bundle artifacts including BVH, robot CSV, SOMA NPZ, keypoints, hand detail and confidence data.",
    },
  ],
  "11": [
    {
      file: "figure-11-replay-ladder.svg",
      width: 900,
      height: 260,
      alt: "A three-rung ladder of replay modes, from kinematic anchored through kinematic with root motion to full physics integration, showing what each mode can and cannot prove about a trajectory.",
    },
  ],
  "12": [
    {
      file: "figure-12-replay-settings.jpg",
      width: 1500,
      height: 1484,
      alt: "Simulation preview settings panel showing replay mode selection, render resolution and lighting controls, and a lock-lower-body toggle with an explanation of when to use it.",
    },
  ],
  "13": [
    {
      file: "figure-13-live-telemetry.jpg",
      width: 1500,
      height: 1066,
      alt: "Mission Control debug view showing a 3D humanoid model beside live plots of joint positions, velocities and torques for 29 degrees of freedom, with panels for system health, reflex and governor, joint limits and data sources.",
    },
  ],
  "14": [
    {
      file: "figure-14-execution-gates.svg",
      width: 900,
      height: 300,
      alt: "The gated execution chain: an action bundle passes through pose planning, ghost preview, an arming gate bound to an environment variable, default-pose and collision checks, and a reflex governor before reaching the actuators, with an emergency stop able to interrupt at any point.",
    },
  ],
  "15": [
    {
      file: "figure-15-playback.jpg",
      width: 1500,
      height: 1014,
      alt: "Mission Control playback view showing a ghosted humanoid trajectory preview, an action bundle selector, playback transport controls and a robot playback safety panel with arming, default-pose, collision-avoidance and control-pipeline options alongside an emergency stop.",
    },
  ],
  "16": [
    {
      file: "figure-16-outside-the-lab.jpg",
      width: 1500,
      height: 1086,
      alt: "A humanoid robot in a Cosmic Brain shirt holding a spirit level outdoors, and walking across uneven ground covered in wood chips and cut logs.",
    },
  ],
  "17": [
    {
      file: "figure-17-world-model.jpg",
      width: 1500,
      height: 932,
      alt: "World model interface showing a current egocentric frame of hands working on a circuit board beside a noisier predicted next frame, with a prediction chain, per-hand action controls and a six-element action vector.",
    },
  ],
  "18": [
    {
      file: "figure-18-completed-run.jpg",
      width: 1500,
      height: 1179,
      alt: "Studio run view showing a completed processing run with input video, landmark overlay and simulation preview, a bundle contents list including quality summary and run metadata, and a QC summary showing provider names and a total processing duration of twenty-four minutes and thirty-nine seconds.",
    },
  ],
  "19": [
    {
      file: "figure-19-commercial-loop.svg",
      width: 880,
      height: 300,
      alt: "A cycle showing human demonstration data feeding the Cosmic pipeline, producing policies, which run on deployed robots, whose telemetry and operator corrections return as new training data, with both revenue streams attached to the loop.",
    },
  ],
};

const contents = [
  ["abstract", "Abstract"],
  ["s1", "The data bottleneck"],
  ["s2", "System overview"],
  ["s3", "The capture plane"],
  ["s4", "Canonical motion"],
  ["s5", "Fusion and filtering"],
  ["s6", "Refinement and occlusion"],
  ["s7", "Retargeting"],
  ["s8", "Physics validation"],
  ["s9", "Mission Control"],
  ["s10", "Contact without sensors"],
  ["s11", "Policies and world models"],
  ["s12", "Limits"],
  ["s13", "Toward Cosmic 1.0"],
  ["s14", "Commercial model"],
  ["s15", "Acknowledgements"],
  ["references", "References"],
];

function ArticleFigure({ assets, children }: { assets: FigureAsset[]; children: ReactNode }) {
  return (
    <figure
      className="research-figure"
      style={
        assets.length > 1
          ? {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "12px",
            }
          : undefined
      }
    >
      {assets.map((asset) => (
        <a
          href={`/docs/cosmic-0-5/${asset.file}`}
          target="_blank"
          rel="noopener noreferrer"
          key={asset.file}
          aria-label={`Open full-size figure: ${asset.alt}`}
        >
          <img
            src={`/docs/cosmic-0-5/${asset.file}`}
            width={asset.width}
            height={asset.height}
            loading="lazy"
            alt={asset.alt}
          />
        </a>
      ))}
      <figcaption style={assets.length > 1 ? { gridColumn: "1 / -1" } : undefined}>
        {children} Select the figure to inspect it at full size.
      </figcaption>
    </figure>
  );
}

function CosmicHalfArticle() {
  return (
    <div className="explore-page research-page">
      <SiteHeader />
      <main id="article-top">
        <header className="research-header explore-wrap">
          <Link to="/docs" className="research-back">
            <ArrowLeft size={15} /> All research
          </Link>
          <p className="eyebrow">CosmicBrain AI / Technical report</p>
          <h1>
            From human motion
            <br />
            <em>to humanoid action.</em>
          </h1>
          <p className="research-subtitle">
            A universal stack for human-to-humanoid skill transfer
          </p>
          <div className="research-meta">
            <time dateTime="2026-08">August 2026</time>
            <span>CosmicBrain AI</span>
            <span>Technical report / Preprint</span>
            <span>Read online</span>
          </div>
          <p className="research-deck">
            Ordinary video, egocentric capture and VR teleoperation become one canonical motion,
            then a robot-specific action bundle. A supervised execution path decides whether that
            bundle is allowed to move real hardware.
          </p>
          <p className="research-scope">
            Architecture, production defaults and the limits of Cosmic 0.5 as described in August
            2026. The report includes no closed-loop success-rate benchmark.
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
          <article
            className="research-body"
            aria-label="From Human Motion to Humanoid Action technical report"
          >
            <aside className="research-takeaway">
              <p className="eyebrow">The central design</p>
              <p>
                One canonical representation, one artifact format and one gated execution path
                connect capture to hardware across the stack.
              </p>
            </aside>
            <section id="abstract" aria-labelledby="abstract-title">
              <h2 id="abstract-title">Abstract</h2>
              <p>
                Humanoid robots are no longer bottlenecked by hardware. They are bottlenecked by
                data: the industry has millions of hours of humans doing useful work on video, and
                almost no hours of robots doing the same work in a form a policy can learn from. We
                describe <strong>Cosmic 0.5</strong>, a production stack that closes that gap from
                both ends. On the capture side, it converts ordinary human motion (a monocular phone
                video, an egocentric RGB-D recording, a VR teleoperation session) into a single
                canonical motion representation, then retargets that representation onto a specific
                robot body with joint limits, velocity limits and hand kinematics enforced. On the
                execution side, it lands the resulting trajectory on real hardware through a
                supervised operations console with an arming gate, a collision pre-check, a ghost
                preview and a hardware stop.
              </p>
              <p>
                This report describes the system as it runs today: the fusion and filtering chain
                that turns noisy pose estimates into a stable canonical motion, the diffusion
                refinement stage that fills occlusions, the retargeting layer that makes one
                recording portable across embodiments, and the telemetry and safety architecture
                that decides whether a trajectory is allowed to move a real 29-DoF machine. It also
                states plainly what Cosmic 0.5 does not yet do.
              </p>
            </section>
            <section id="s1" aria-labelledby="s1-title">
              <h2 id="s1-title">01 / The data bottleneck</h2>

              <p>
                A humanoid that can walk, balance and hold a lemon without crushing it is now a
                purchasable object. What is not purchasable is the thing that tells it <em>when</em>{" "}
                to close its fingers, how far to reach for the bowl, and what to do when the bag
                tips over. That knowledge lives in demonstration data, and demonstration data is the
                scarcest input in the industry.
              </p>

              <p>
                The conventional answer is teleoperation: pay an operator to drive a robot through a
                task, thousands of times. It works, and it is the only method that produces
                perfectly on-distribution robot data. It is also linear in cost: every additional
                hour of data costs an additional hour of a human and an hour of a machine.
                Meanwhile, the same human performs the same task at home, on a phone camera, for
                free, several times a day.
              </p>

              <p>
                Cosmic 0.5 is built on the position that these two sources should feed the same
                pipe. A VR teleoperation session, a monocular video of someone unpacking groceries,
                and an egocentric recording of two hands assembling a circuit board are, for the
                purposes of a manipulation policy, three noisy observations of the same underlying
                quantity: a human body moving through a task. The engineering problem is not
                choosing between them. It is building a representation stable enough that all three
                can be reduced to it, and a retargeting layer honest enough that what comes out the
                other side is executable on a real machine without breaking it.
              </p>

              <ArticleFigure assets={figureAssets[1]}>
                <strong>Figure 1.</strong> Approach and grasp on an unstructured surface. The scene
                is deliberately uncooperative: loose produce of varying size and compliance, a
                slipping mesh bag, a reflective deck and direct afternoon sun. Everything downstream
                in this report exists to make an episode like this one reproducible.
              </ArticleFigure>

              <p className="research-caveat">
                The industry does not have a robotics data problem. It has a translation problem:
                the data already exists, in the wrong body.
              </p>
            </section>

            <section id="s2" aria-labelledby="s2-title">
              <h2 id="s2-title">02 / System overview</h2>

              <p>
                Cosmic 0.5 is organised as three planes, connected by one representation and one
                artifact format.
              </p>

              <p>
                The <strong>capture plane</strong> ingests human motion from whichever modality is
                available and is responsible for producing per-frame estimates with calibrated
                confidence. The <strong>motion plane</strong> fuses those estimates into a canonical
                motion (an embodiment-independent description of what the body did), then refines,
                filters and retargets it into robot-specific joint trajectories. The{" "}
                <strong>execution plane</strong> takes those trajectories, proves them against a
                model and a set of gates, and only then puts them on hardware.
              </p>

              <p>
                The separation matters more than any individual component. Because the capture plane
                terminates at a canonical representation rather than at joint angles, adding a new
                input device does not require touching the retargeter. Because the execution plane
                consumes a bundled artifact rather than a live stream, the same trajectory that was
                previewed in simulation is bit-for-bit the trajectory that reaches the actuators.
              </p>

              <ArticleFigure assets={figureAssets[2]}>
                <strong>Figure 2.</strong> The three planes. Every capture modality is reduced to
                one canonical motion before any robot-specific decision is made; every
                robot-specific decision is made before anything is allowed to move. Telemetry
                returns to the motion plane as ground truth for the next iteration.
              </ArticleFigure>
            </section>

            <section id="s3" aria-labelledby="s3-title">
              <h2 id="s3-title">03 / The capture plane</h2>

              <p>
                Four modalities feed the stack. They differ in cost, in fidelity, and in what they
                can and cannot observe, and the fusion layer downstream is built around exactly
                those differences.
              </p>

              <h3>3.1 / Monocular video</h3>
              <p>
                The cheapest and least cooperative input: a single RGB camera, unknown intrinsics,
                unknown scale, arbitrary viewpoint, frequent self-occlusion. It is also the only
                modality with effectively unlimited supply. A clip enters through the Studio, which
                runs pose estimation, produces a landmark overlay for inspection, and renders a
                simulated replay of the retargeted result beside the original, so a human reviewer
                can see, in one screen, whether the robot did what the person did.
              </p>

              <ArticleFigure assets={figureAssets[3]}>
                <strong>Figure 3.</strong> Studio review for a monocular clip. Left: unmodified
                phone footage. Centre: detected body and hand landmarks. Right: the retargeted
                humanoid replaying the same motion. Reviewer judgement happens on this triptych, not
                on numbers.
              </ArticleFigure>

              <h3>3.2 / Egocentric RGB-D with inertial reference</h3>
              <p>
                A head-mounted rig recording colour, depth and orientation simultaneously. Where
                monocular video must infer depth, this modality measures it: the viewer reports
                per-hand tracking confidence alongside metric wrist coordinates and a depth band for
                each hand: in the session below, the right hand at{" "}
                <code>X 175mm Y 36mm Z 529mm</code> with a working range of{" "}
                <code>529&#8211;674mm</code> across both hands, at 99% and 95% confidence. The IMU
                panel carries the head pose that anchors those numbers to a frame.
              </p>

              <p>
                This is the modality that captures the part of a task the body cannot show from
                outside: what the hands do at the moment of contact, from the viewpoint that
                actually matters. Sessions are annotated on a timeline, with an assisted pass that
                proposes natural-language descriptions of each segment (
                <em>
                  "the right hand reaches for the internal electronic component featuring a cooling
                  fan and moves it towards the left case shell"
                </em>
                ), giving every trajectory a language label without a human writing one from
                scratch.
              </p>

              <ArticleFigure assets={figureAssets[4]}>
                <strong>Figure 4.</strong> Egocentric session review in Chronicles: 182 frames of a
                two-handed assembly task. RGB with per-hand landmark tracking and metric depth
                (left), depth map and IMU orientation (right), annotation timeline below. Confidence
                is reported per hand, per frame, and carried forward into fusion.
              </ArticleFigure>

              <h3>3.3 / VR teleoperation</h3>
              <p>
                When a task needs to be performed rather than observed, an operator drives the robot
                directly through a WebXR headset. The teleoperation path is a different engineering
                problem from the offline ones: it is a control loop with a human inside it, and the
                dominant failure mode is latency, not accuracy.
              </p>

              <p>
                Four decisions define it. Jitter is suppressed with adaptive One-Euro filtering
                rather than a moving average, so that smoothing does not impose a constant lag.
                End-to-end latency is measured and the operator's motion extrapolated forward to
                compensate for it. Arm poses are solved with warm-started differential inverse
                kinematics instead of a full nonlinear solve each frame. And XR input is decoupled
                from the control loop across threads, so that a slow headset frame cannot stall the
                robot. The stack targets the Unitree G1 with a choice of dexterous hands, in an
                upper-body mode with locked legs and a full-body mode with a learned balance policy.
              </p>

              <h3>3.4 / Simulation</h3>
              <p>
                A library of more than fifty MuJoCo environments covering reaching, dual-arm
                coordination, block stacking, cutlery handling, dishwasher and cupboard interaction,
                and multi-stage grocery and food-preparation workflows. Simulation serves two roles
                here: it generates demonstrations where the real-world variant would be expensive or
                destructive, and it provides the deterministic replay surface on which every real
                trajectory is checked before it reaches hardware.
              </p>
            </section>

            <section id="s4" aria-labelledby="s4-title">
              <h2 id="s4-title">04 / Canonical motion</h2>

              <p>
                The pivot of the whole system is a single decision: no capture modality is ever
                allowed to talk to a robot. Everything is reduced first to a canonical motion
                representation, SOMA, which describes the movement of a human body without reference
                to any particular machine.
              </p>

              <p>
                The consequences are practical. A pose estimator can be swapped without touching
                retargeting: the provider is a named, recorded field in every run's metadata, so a
                clip processed six months ago carries the identity of the model that processed it. A
                new robot requires a new retarget profile, not a new pipeline. And a single
                recording can be re-emitted against a different body years later, because the
                archived artifact is the canonical motion, not the joint angles of whatever robot
                happened to be on the bench that week.
              </p>

              <p>
                Every run is packaged as a bundle rather than a file. Alongside the canonical{" "}
                <code>.npz</code>, the bundle carries robot-ready joint trajectories as CSV, a BVH
                export for animation tooling, 2D and 3D keypoints from the pose stack, hand-detail
                diagnostics, per-frame fusion confidence, preview video, and a machine-readable run
                record naming every provider, parameter and timing in the run.
              </p>

              <ArticleFigure assets={figureAssets[5]}>
                <strong>Figure 5.</strong> The reduction that makes the stack portable: an
                uncalibrated monocular observation on the right, resolved into a body-relative
                motion that a specific 29-DoF machine can execute on the left. Camera geometry is
                recovered, not assumed.
              </ArticleFigure>
            </section>

            <section id="s5" aria-labelledby="s5-title">
              <h2 id="s5-title">05 / Fusion and filtering</h2>

              <p>
                Raw pose estimates are not usable as robot commands. They are jittery at the
                millimetre scale, they lose limbs behind occluders, and their error is not uniform:
                a wrist tracked at 99% confidence and a wrist inferred through a sleeve are the same
                data type carrying wildly different truth. The fusion and filtering chain exists to
                turn that into something an actuator can follow.
              </p>

              <ArticleFigure assets={figureAssets[6]}>
                <strong>Figure 6.</strong> The motion pipeline. The classifier in the middle is the
                load-bearing element: it decides whether a frame's body is well enough observed to
                be merely smoothed, or poorly enough observed that the missing limbs must be
                generated. Both branches converge on the same retargeter.
              </ArticleFigure>

              <h3>5.1 / Weighting, not averaging</h3>
              <p>
                Fusion is confidence-weighted rather than uniform. A dedicated hand specialist{" "}
                <a href="#reference-6" aria-label="Reference 6">
                  [6]
                </a>{" "}
                runs alongside the body pose stack and is folded into the canonical motion only
                where its own confidence clears threshold, with a short gap-fill window covering the
                frames where a hand passes briefly behind an object. Two properties keep the result
                stable: a minimum blend weight prevents any single source from being switched off
                entirely and snapping the trajectory, and fusion progress is held monotonic across
                modality switches, so that a hand-off between sources cannot cause the
                reconstruction to jump backwards.
              </p>

              <h3>5.2 / Three filters, three jobs</h3>
              <p>
                Smoothing runs as a chain rather than a single pass, because the artefacts have
                different shapes. One-Euro{" "}
                <a href="#reference-8" aria-label="Reference 8">
                  [8]
                </a>{" "}
                suppresses high-frequency jitter adaptively: heavier smoothing when the body is
                slow, lighter when it moves fast, which is precisely the trade-off a fixed low-pass
                filter gets wrong. A Savitzky&#8211;Golay pass preserves the peaks and inflections
                that a moving average would flatten, which matters because the moment of contact is
                a peak. An RTS smoother runs over the whole sequence with an explicit noise model,
                using the pose stack's own confidence as measurement noise, so low-confidence frames
                are pulled toward the dynamics estimate rather than believed.
              </p>

              <p>
                Root and wrist are scaled independently of the body. The wrist is where the task
                happens, and the root is where drift accumulates; both are tuned separately from the
                torso for exactly that reason.
              </p>

              <div
                className="research-table-scroll"
                role="region"
                aria-label="Filtering and fusion parameters"
                tabIndex={0}
              >
                <table>
                  <caption>
                    <strong>Table 1.</strong> Filtering and fusion production defaults.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Stage</th>
                      <th scope="col">Parameter</th>
                      <th scope="col">Value</th>
                      <th scope="col">What it controls</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Smoothing</td>
                      <td>method</td>
                      <td>One-Euro</td>
                      <td>Adaptive cutoff: smoothing scales inversely with speed.</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>body / hand</td>
                      <td>0.015 / 0.025</td>
                      <td>Torso is smoothed harder than the hands; fingers must stay crisp.</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>root / wrist</td>
                      <td>0.035 / 0.035</td>
                      <td>The two segments most prone to accumulated drift.</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>cutoff / beta</td>
                      <td>3.5 / 0.025</td>
                      <td>Baseline responsiveness and its speed-dependent term.</td>
                    </tr>
                    <tr>
                      <td>Savitzky&#8211;Golay</td>
                      <td>window / order</td>
                      <td>9 / 2</td>
                      <td>Quadratic fit over nine frames; preserves contact peaks.</td>
                    </tr>
                    <tr>
                      <td>RTS smoother</td>
                      <td>process noise</td>
                      <td>0.0025</td>
                      <td>How much the motion is expected to deviate from its own dynamics.</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>measurement noise</td>
                      <td>0.0075</td>
                      <td>
                        Three times process noise; the estimator distrusts observation more than
                        model.
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>noise floor</td>
                      <td>0.00001</td>
                      <td>Prevents numerical collapse on perfectly confident frames.</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>velocity damping</td>
                      <td>0.985</td>
                      <td>Bleeds off velocity so tracking loss does not extrapolate away.</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>min confidence</td>
                      <td>0.02</td>
                      <td>Below this a frame is treated as unobserved, not as data.</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>root / wrist scale</td>
                      <td>1.6 / 1.35</td>
                      <td>Independent gain on the two segments that carry the task.</td>
                    </tr>
                    <tr>
                      <td>Fusion</td>
                      <td>hand confidence</td>
                      <td>0.5</td>
                      <td>Admission threshold for the hand specialist.</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>gap-fill</td>
                      <td>8 frames</td>
                      <td>Bridges brief hand occlusion without inventing long segments.</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>min blend alpha</td>
                      <td>0.35</td>
                      <td>
                        No source is ever fully switched off; this prevents snap discontinuities.
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>confidence margin</td>
                      <td>0.02</td>
                      <td>Hysteresis band; stops rapid flapping between sources.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <ArticleFigure assets={figureAssets[7]}>
                <strong>Figure 7.</strong> The filtering and fusion controls as exposed to an
                operator. Every value in the table above is a run parameter, recorded in that run's
                metadata; a reprocessed clip can be compared against its own history rather than
                against a memory of how it was tuned.
              </ArticleFigure>
            </section>

            <section id="s6" aria-labelledby="s6-title">
              <h2 id="s6-title">06 / Refinement and occlusion</h2>

              <p>
                Filtering cannot recover what was never seen. When a person turns away from the
                camera, steps out of frame at the knees, or reaches behind their own torso, the limb
                data is not noisy; it is absent. Interpolating across the gap produces motion that
                is smooth and wrong: legs that drift, arms that take impossible shortcuts, a body
                that visibly lies about what it did.
              </p>

              <p>
                Cosmic 0.5 handles this with a generative refinement stage running on the fused
                canonical motion, gated by a classifier that scores how much of the body is actually
                visible{" "}
                <a href="#reference-5" aria-label="Reference 5">
                  [5]
                </a>
                . Above the full-body threshold, refinement is a polish pass. Below the partial-body
                threshold, occlusion infill is invoked and the hidden segments are generated to be
                continuous with the frames on either side. The classifier's job is to keep the
                generative stage away from data that does not need it; a system that always
                generates cannot be trusted to have observed.
              </p>

              <p>
                The stage is steerable in plain language, which is unusual in a motion pipeline and
                is there for a specific reason: the failure modes are describable but not easily
                expressible as a loss. The standing instruction (
                <em>
                  "natural human motion consistent with the observed video, preserving body timing
                  and hand motion; maintain standing up straight, in a comfortable relaxed and
                  balanced manner"
                </em>
                ) encodes the priors that keep a reconstruction physically plausible for a bipedal
                machine. The occlusion instruction is narrower:{" "}
                <em>
                  "smoothly continue the visible motion through occluded segments, preserving
                  timing, posture, and limb continuity from the surrounding visible frames."
                </em>
              </p>

              <p>
                Diffusion runs at fifty steps against a fixed seed. The fixed seed is a deliberate
                reproducibility choice: two runs of the same clip with the same parameters produce
                the same trajectory, which is a precondition for treating a bundle as an artifact
                rather than a sample.
              </p>

              <div
                className="research-table-scroll"
                role="region"
                aria-label="Refinement gating parameters"
                tabIndex={0}
              >
                <table>
                  <caption>
                    <strong>Table 2.</strong> Refinement gating. The two thresholds decide whether
                    an observation is polished or partly generated; the pinned seed makes a bundle
                    an artifact rather than a sample.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Control</th>
                      <th scope="col">Value</th>
                      <th scope="col">Behaviour</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>partial-body threshold</td>
                      <td>0.30</td>
                      <td>Below this the frame is treated as occluded and infill is permitted.</td>
                    </tr>
                    <tr>
                      <td>full-body threshold</td>
                      <td>0.70</td>
                      <td>Above this the observation stands; refinement is polish only.</td>
                    </tr>
                    <tr>
                      <td>diffusion steps</td>
                      <td>50</td>
                      <td>Fixed budget per refinement pass.</td>
                    </tr>
                    <tr>
                      <td>seed</td>
                      <td>42</td>
                      <td>Pinned for reproducibility: same input, same output.</td>
                    </tr>
                    <tr>
                      <td>text-to-motion only</td>
                      <td>off</td>
                      <td>
                        Available, but disabled in production: motion must come from an observation.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="research-caveat">
                <span>Remark (scope of generated motion).</span> Generated segments are not
                observations, and the report treats them differently. Occlusion infill produces
                motion that is <em>plausible</em> and continuous; it does not recover what the
                person actually did behind the occluder. Any downstream use that depends on ground
                truth should read the per-frame confidence artifact in the bundle, which marks these
                regions explicitly, rather than treating the trajectory as uniformly measured.
              </p>

              <ArticleFigure assets={figureAssets[8]}>
                <strong>Figure 8.</strong> Refinement controls, including the view-classifier
                thresholds that gate infill and the standing prompts that constrain generated motion
                to balanced, upright, physically plausible posture.
              </ArticleFigure>
            </section>

            <section id="s7" aria-labelledby="s7-title">
              <h2 id="s7-title">07 / Retargeting</h2>

              <p>
                Retargeting is where an embodiment-independent motion becomes a specific machine's
                problem. A human shoulder has a range a G1 shoulder does not. A human finger closes
                on a lemon in a way a five-finger robot hand approximates rather than reproduces. A
                human shifts weight continuously; a bipedal robot with a fixed foot polygon does not
                get to.
              </p>

              <p>
                Three constraints are enforced at this stage, and all three are enforced{" "}
                <em>before</em> anything is written to a bundle rather than checked afterwards.
                Joint limit clamping holds every retargeted joint inside the active profile's range.
                Velocity limiting caps the rate of change, which is what stops a fast human gesture
                from becoming an actuator command that would be rejected or, worse, followed. Feet
                stabilisation holds foot contacts steady against pose-estimation noise in the lower
                body, the single most common source of visibly wrong output, since a small error at
                the hip becomes a large error at the ankle.
              </p>

              <p>
                The hand is handled as a separate profile from the body. This is the layer that
                makes the stack embodiment-agnostic in practice rather than in principle: one
                canonical motion, several hand profiles, several bodies.
              </p>

              <ArticleFigure assets={figureAssets[9]}>
                <strong>Figure 9.</strong> One recording, many bodies. What survives retargeting is
                the structure of the task: when contact happens, in what order, with what intent.
                What changes is every number a specific machine cares about.
              </ArticleFigure>

              <ArticleFigure assets={figureAssets[10]}>
                <strong>Figure 10.</strong> Retarget post-processing and bundle composition.
                Constraint enforcement (left) and artifact selection (right) are the same screen,
                because what was enforced and what was exported are the same provenance question.
              </ArticleFigure>
            </section>

            <section id="s8" aria-labelledby="s8-title">
              <h2 id="s8-title">08 / Physics validation</h2>

              <p>
                A retargeted trajectory that respects joint and velocity limits is still not proof
                that a robot can execute it. Limits are necessary conditions, not sufficient ones;
                they say nothing about whether the resulting motion is dynamically feasible, whether
                the centre of mass stays over the support polygon, or whether two links pass through
                each other on the way.
              </p>

              <p>
                The stack is explicit about this, and encodes the distinction as a ladder of replay
                modes{" "}
                <a href="#reference-7" aria-label="Reference 7">
                  [7]
                </a>{" "}
                rather than a single "simulate" button. The default is kinematic replay with the
                base anchored: joints teleport exactly to the trajectory with no physics
                integration. This is a <em>visual</em> check: it answers "does this look like the
                motion we captured" and nothing more. Releasing the anchor lets the root follow the
                trajectory's own translation, which exposes drift the anchored view hides. Turning
                on physics integration is the mode that can actually falsify a trajectory, and it is
                treated as a debugging tool rather than a default because a physics failure at this
                stage is often a simulation-tuning artefact rather than a real one.
              </p>

              <ArticleFigure assets={figureAssets[11]}>
                <strong>Figure 11.</strong> The replay ladder. Naming the weak check as the default,
                and labelling it as a visual check, is what prevents a smooth preview from being
                mistaken for a feasibility proof.
              </ArticleFigure>

              <p>
                One further control deserves mention because it is a candid admission encoded in
                software: lower-body motion can be locked to the first frame. It is off by default,
                so that simulation shows the same waist and leg motion as the retargeted output. It
                exists for clips where the subject stands essentially still and pose-estimation
                noise causes the legs to drift, a case where showing the noise faithfully is less
                useful than suppressing it, and where the operator should be the one choosing.
              </p>

              <ArticleFigure assets={figureAssets[12]}>
                <strong>Figure 12.</strong> Replay configuration. The panel documents its own
                defaults and points to the consumer contract that defines each mode; the settings
                screen is where the epistemics of the check are written down.
              </ArticleFigure>
            </section>

            <section id="s9" aria-labelledby="s9-title">
              <h2 id="s9-title">09 / Mission Control</h2>

              <p>
                Everything up to this point produces a file. Mission Control is the layer that
                decides whether that file is allowed to move a 35&nbsp;kg bipedal machine with 29
                powered joints, and it is the part of the stack where the engineering is least
                glamorous and most consequential.
              </p>

              <h3>9.1 / Telemetry first</h3>
              <p>
                The console streams the robot's full 29-degree-of-freedom state: position, velocity
                and torque per joint, grouped by limb, over a rolling window. Torque is the channel
                that matters most: it is where an unexpected contact appears before it appears
                anywhere else, and it is the signal that distinguishes "the arm is moving" from "the
                arm is moving through something." A transport status line reports the live receive
                rate and message age, so a stale telemetry stream is visible as a number rather than
                inferred from a frozen viewport.
              </p>

              <ArticleFigure assets={figureAssets[13]}>
                <strong>Figure 13.</strong> Live 29-DoF telemetry. Joint groups are separable so
                that a torque anomaly can be attributed to a limb immediately; the reflex and
                governor, joint limit and data source panels sit in the same column as the plots
                they protect.
              </ArticleFigure>

              <h3>9.2 / The gate chain</h3>
              <p>
                Playing a trajectory on hardware requires passing a sequence of independent gates,
                each of which fails closed. The bundle is loaded and its start pose is compared
                against where the robot actually is; a plan is generated to move from the current
                pose to the sequence start, because the most dangerous moment in a replay is the
                first frame, when a robot at rest is asked to become a robot mid-motion. A ghost
                preview renders the intended trajectory against the live model using the same
                execution path the real playback will take, not a separate visualiser that might
                disagree. Playback must be explicitly armed, and arming is bound to an environment
                variable on the machine, not a button in a browser, so that a console left open
                cannot be a loaded weapon. Collision avoidance and the control pipeline are
                separately selectable. A reflex and governor layer sits beneath all of it, and a
                hardware stop sits beside all of it.
              </p>

              <ArticleFigure assets={figureAssets[14]}>
                <strong>Figure 14.</strong> Gated execution. Each gate is independent and fails
                closed; the stop path bypasses the chain entirely rather than being another stage
                within it.
              </ArticleFigure>

              <ArticleFigure assets={figureAssets[15]}>
                <strong>Figure 15.</strong> Playback with the safety panel open. Ghost rendering and
                real execution share one planning path, so what the operator previews is what the
                hardware receives.
              </ArticleFigure>

              <ArticleFigure assets={figureAssets[16]}>
                <strong>Figure 16.</strong> Outside the lab. Uneven ground, variable light and a
                real tool: the operating conditions the telemetry and governor layers exist for.
              </ArticleFigure>
            </section>

            <section id="s10" aria-labelledby="s10-title">
              <h2 id="s10-title">10 / Contact without sensors</h2>

              <p>
                Manipulation is a force problem wearing a position problem's clothes. Two
                trajectories can be identical in joint space and completely different in outcome
                depending on how hard the hand closed, and force is exactly what a position-only
                demonstration fails to record. Adding force-torque sensors to every joint solves it
                and costs more than the arm.
              </p>

              <p>
                CosmicBrain's work here follows FACTR 2{" "}
                <a href="#reference-3" aria-label="Reference 3">
                  [3]
                </a>
                , and separates the problem into estimation and use. The estimation half learns the
                robot's own free-space inverse dynamics from a short contact-free motion (what
                torque this arm requires to move itself, absent the world) and then treats external
                contact as the residual between that prediction and the torque actually measured at
                the motors. The robot's existing motor current becomes a contact sensor. The second
                half puts that signal to work during training: the estimated torque is used to
                segment demonstrations into contact phases, and contact-relevant frames are
                up-sampled during behaviour cloning, on the reasoning that the few frames where the
                hand meets the object carry most of the information and are drowned out by the many
                frames of free-space transit.
              </p>

              <p>
                The implementation is deliberately light (NumPy and PyTorch at the core, with
                dynamics and vision dependencies isolated behind adapters) and ships a synthetic
                demonstration that trains the estimator and recovers an injected contact on a CPU in
                minutes, with no robot and no downloaded weights. That property matters more than it
                sounds: a contact-estimation method that can only be evaluated on hardware cannot be
                iterated on quickly.
              </p>

              <p>
                This is also why torque is a first-class channel in the telemetry view of Fig. 13
                rather than a diagnostic afterthought. The same quantity that tells an operator
                something unexpected is happening is the quantity a policy learns contact from.
              </p>
            </section>

            <section id="s11" aria-labelledby="s11-title">
              <h2 id="s11-title">11 / Policies and world models</h2>

              <p>
                Motion transfer produces trajectories. Trajectories become behaviour through a
                learning stack, and CosmicBrain's is assembled from several lines of published
                research, implemented and integrated rather than invented here, a distinction this
                report keeps explicit.
              </p>

              <h3>11.1 / Egocentric manipulation policies</h3>
              <p>
                An implementation of the <em>Humanoid Policy ~ Human Policy</em> line of work{" "}
                <a href="#reference-1" aria-label="Reference 1">
                  [1]
                </a>
                , which trains manipulation policies from an egocentric viewpoint without requiring
                wrist cameras, the practical significance being that a human demonstration and a
                robot demonstration can share an observation space. The training framework supports
                several algorithm families in parallel: action-chunking transformers with
                interchangeable visual backbones, diffusion policy, and a robotic diffusion
                transformer, with a MuJoCo replay harness for rolling out a policy before it touches
                hardware.
              </p>

              <h3>11.2 / Dexterous data from everyday video</h3>
              <p>
                An implementation of <em>Do As I Do</em>{" "}
                <a href="#reference-2" aria-label="Reference 2">
                  [2]
                </a>
                , reconstructing hand&#8211;object interaction from ordinary monocular video and
                retargeting it onto multi-fingered robot hands. It orchestrates nine separate
                foundation models{" "}
                <a href="#reference-4" aria-label="Reference 4">
                  [4]
                </a>{" "}
                (segmentation, 3D lifting, monocular geometry, hand reconstruction, point tracking
                and camera calibration) into a single path from RGB frames through a
                hand&#8211;object trajectory to a robot trajectory and finally to hardware commands,
                with a sampling-based optimiser handling retargeting. The repository is candid that
                it is not a turnkey system: mock backends let the pipeline be exercised without GPUs
                or weights, while real operation requires upstream models, a robot description file
                and asset-specific integration.
              </p>

              <h3>11.3 / Direct hand control</h3>
              <p>
                A lighter path for cases where a person simply wants to drive a hand: real-time
                landmark tracking from a webcam mapped to a dual-arm platform with automatic inverse
                kinematics and openness-based gripper control, and to a twenty-four-joint dexterous
                hand with full finger and wrist mapping. Uploaded video can be processed offline
                into landmark data and an overlay render, which makes it a data-collection tool as
                well as a control one.
              </p>

              <h3>11.4 / World model</h3>
              <p>
                The most exploratory component: a model that predicts the next egocentric frame
                conditioned on discrete hand actions, and can be driven interactively: step forward,
                step back, open or close either hand, and watch the predicted future change. It runs
                on-device today, and its predictions are visibly degraded compared to the
                observation it is conditioned on.
              </p>

              <p>
                It is included in this report because of what it is for rather than what it
                currently produces. A policy that can imagine the consequence of closing its left
                hand before closing it is a policy that can plan; the egocentric capture stack
                described in &#167;3 produces exactly the paired frame-and-action data such a model
                needs. The current model is an early result on a small number of sessions, and is
                presented as such.
              </p>

              <ArticleFigure assets={figureAssets[17]}>
                <strong>Figure 17.</strong> Action-conditioned next-frame prediction on an
                egocentric session, in Chronicles. Left: observed frame. Right: prediction. The
                keyboard bindings drive each hand independently; the model is queried, not replayed.
              </ArticleFigure>
            </section>

            <section id="s12" aria-labelledby="s12-title">
              <h2 id="s12-title">12 / Limits</h2>

              <p>
                A technical report that only describes what works is marketing. The following are
                the constraints an informed reader should hold Cosmic 0.5 against.
              </p>

              <ul>
                <li>
                  <strong>The pipeline is offline, not real-time.</strong> A short clip taken
                  through the full stack (pose, fusion, filtering, refinement, retargeting,
                  simulation preview and packaging) takes tens of minutes of wall clock, dominated
                  by the generative and rendering stages. The run in Fig. 18 processed an
                  eight-second clip in just under twenty-five minutes. This is a batch
                  data-generation system. The teleoperation path is the real-time path, and it is a
                  separate one.
                </li>

                <li>
                  <strong>No closed-loop benchmark is published here.</strong> This report contains
                  no success-rate table, and the omission is deliberate. The stack has not yet been
                  evaluated against a fixed, externally comparable task suite, and publishing
                  internal numbers without one would be a claim the evidence does not support. The
                  benchmark comes first; the numbers come with it.
                </li>

                <li>
                  <strong>Kinematic preview is not a feasibility proof.</strong> As set out in
                  &#167;8, the default replay mode is a visual check. Only physics-integrated replay
                  can falsify a trajectory, and it is not the default.
                </li>

                <li>
                  <strong>Generated motion is not observed motion.</strong> Occlusion infill
                  produces continuity, not truth. The bundle marks these regions in its confidence
                  artifact; downstream consumers that ignore that marking will over-trust the
                  trajectory.
                </li>

                <li>
                  <strong>Several learning components are reimplementations.</strong> The egocentric
                  policy framework, the everyday-video retargeting path and the force-estimation
                  method follow published work by other research groups, credited in &#167;15 and
                  cited throughout. What is original here is the integration: one canonical
                  representation, one artifact format and one gated execution path spanning all of
                  them.
                </li>

                <li>
                  <strong>Contact-rich manipulation remains the hard part.</strong> Reaching,
                  transporting and placing rigid objects are the demonstrated regime. Deformables,
                  in-hand reorientation, bimanual tasks with tight force coupling and any task where
                  the critical contact is hidden from the camera are not solved by this stack today.
                </li>

                <li>
                  <strong>The world model is early.</strong> Short horizons, small session counts,
                  visible degradation. It is a research thread, not a component other parts of the
                  system depend on.
                </li>
              </ul>

              <ArticleFigure assets={figureAssets[18]}>
                <strong>Figure 18.</strong> A completed run, with its own receipts: named providers
                for pose, refinement and retargeting, a run identifier, a quality summary and a
                total processing duration. Every claim about how a trajectory was produced is
                answerable from the bundle.
              </ArticleFigure>
            </section>

            <section id="s13" aria-labelledby="s13-title">
              <h2 id="s13-title">13 / Toward Cosmic 1.0</h2>

              <p>
                The version number is a statement about coverage rather than polish. Cosmic 0.5 is a
                complete path from human motion to gated hardware execution; what separates it from
                1.0 is autonomy, evidence and speed.
              </p>

              <h3>
                A frozen benchmark <em>(evidence)</em>
              </h3>
              <p>
                A fixed closed-loop task suite, published with the protocol, so that results are
                comparable across versions and against other groups. This is the first blocker, not
                the last.
              </p>
              <h3>
                Streaming the offline stack <em>(latency)</em>
              </h3>
              <p>
                Collapsing fusion, filtering and refinement into a streaming path so that
                capture-to-trajectory runs closer to the clip's own duration than to tens of
                minutes.
              </p>
              <h3>
                Contact-aware policies on hardware <em>(force)</em>
              </h3>
              <p>
                Taking sensorless external-torque estimation from offline training into the live
                control loop, so that contact informs execution rather than only shaping the
                training set.
              </p>
              <h3>
                Profiles beyond one platform <em>(bodies)</em>
              </h3>
              <p>
                Retarget profiles for additional humanoids and hands, exercising the claim that the
                canonical representation is genuinely embodiment-independent.
              </p>
              <h3>
                Policy execution under the same gates <em>(autonomy)</em>
              </h3>
              <p>
                Moving from replaying a recorded bundle to executing a learned policy, through the
                identical arming, collision and governor chain, with no separate unguarded path.
              </p>
              <h3>
                Longer-horizon world models <em>(prediction)</em>
              </h3>
              <p>
                Extending action-conditioned prediction from single steps to horizons long enough to
                be useful for planning, trained on the growing egocentric corpus.
              </p>
            </section>

            <section id="s14" aria-labelledby="s14-title">
              <h2 id="s14-title">14 / Commercial model</h2>

              <p>
                The stack supports two businesses, and they are the same asset sold twice. The first
                is dexterous data collection for humanoid manufacturers and foundation-model teams:
                the pipeline described in this report, delivered as curated demonstration data in
                the formats training stacks already consume. The second is humanoid labour delivered
                as a service to facilities: the same retargeting and execution stack, operated on a
                customer&#8217;s floor and billed by robot-hour. Commercial terms for both are
                quoted per engagement rather than published.
              </p>

              <p>
                They compound. Data collection funds the operating hours; operating hours generate
                observations that improve the policies; better policies reduce the human supervision
                each robot-hour requires, which is the only path by which labour-as-a-service
                becomes a business with margin rather than a staffing agency with extra steps.
              </p>

              <ArticleFigure assets={figureAssets[19]}>
                <strong>Figure 19.</strong> The two revenue streams attach to the same loop at
                different points. Data collection monetises the pipeline; labour monetises the
                deployment; each one supplies the other's input.
              </ArticleFigure>
            </section>

            <section id="s15" aria-labelledby="s15-title">
              <h2 id="s15-title">15 / Acknowledgements</h2>

              <p>
                Cosmic 0.5 is an integration, and it stands on a considerable amount of work done
                elsewhere. Two components of the system shown in this report were built by people
                outside the core pipeline team, and are credited here in full.
              </p>

              <p>
                <strong>Chronicles</strong>, the egocentric capture, hand-tracking,
                session-annotation and action-conditioned world-model tooling shown in Figs. 4 and
                17, is the work of <strong>Keval&nbsp;Shah</strong>. The operations console shown in
                Figs. 13 and 15, <strong>Mission Control</strong>, builds on open-source work by{" "}
                <strong>Patrick&nbsp;Deegan (MIT)</strong>.
              </p>

              <p>
                Three of the learning components described in &#167;10 and &#167;11 are independent
                implementations of methods published by other research groups: the egocentric policy
                framework follows{" "}
                <a href="#reference-1" aria-label="Reference 1">
                  [1]
                </a>
                , the everyday-video retargeting path follows{" "}
                <a href="#reference-2" aria-label="Reference 2">
                  [2]
                </a>
                , whose authors did not release code, and the sensorless force-estimation method
                follows{" "}
                <a href="#reference-3" aria-label="Reference 3">
                  [3]
                </a>
                . What is claimed as original here is the integration: one canonical representation,
                one artifact format and one gated execution path spanning all of them.
              </p>

              <h2 id="references" style={{ scrollMarginTop: "108px" }}>
                References
              </h2>

              <ol style={{ listStyleType: "decimal", paddingLeft: "22px" }}>
                <li id="reference-1" style={{ scrollMarginTop: "108px" }}>
                  <em>Humanoid Policy ~ Human Policy.</em> Egocentric humanoid manipulation policies
                  trained from a human-centric data representation, without wrist cameras.
                  Implemented in <code>egotransfer</code>.
                </li>
                <li id="reference-2" style={{ scrollMarginTop: "108px" }}>
                  Paliwal et&nbsp;al.{" "}
                  <em>Do As I Do: Dexterous Manipulation Data from Everyday Human Videos.</em> UC
                  Berkeley. Reimplemented independently in <code>doasido</code>; no code was
                  released by the original authors.
                </li>
                <li id="reference-3" style={{ scrollMarginTop: "108px" }}>
                  <em>FACTR 2.</em> External force sensing without force sensors, implemented in{" "}
                  <code>CBforcesensing</code> as NEXT (neural external torque estimation) and FIRST
                  (force-informed resampling training).
                </li>
                <li id="reference-4" style={{ scrollMarginTop: "108px" }}>
                  Reconstruction foundation models: SAM&nbsp;3 and SAM&nbsp;3D (segmentation and 3D
                  lifting), MoGe (monocular geometry), HaWoR (hand reconstruction), BootsTAPIR
                  (point tracking), GeoCalib (camera calibration).
                </li>
                <li id="reference-5" style={{ scrollMarginTop: "108px" }}>
                  NVIDIA Kimodo model family. Diffusion refinement and occlusion infill on canonical
                  motion; checkpoints <code>Kimodo-SOMA-RP</code> and <code>Kimodo-G1-RP-v1</code>.
                </li>
                <li id="reference-6" style={{ scrollMarginTop: "108px" }}>
                  RTMW3D, used as the dedicated hand specialist in fusion; MediaPipe hand
                  landmarking in the direct-control and live-tracking paths.
                </li>
                <li id="reference-7" style={{ scrollMarginTop: "108px" }}>
                  Simulation and control: MuJoCo and MuJoCo Warp, the MuJoCo Menagerie model set,
                  NVIDIA Isaac Sim for physics replay, <code>mink</code> for inverse kinematics,
                  ROS&nbsp;2 for on-robot transport.
                </li>
                <li id="reference-8" style={{ scrollMarginTop: "108px" }}>
                  Casiez, G., Roussel, N. and Vogel, D.{" "}
                  <em>
                    1&nbsp;&#8364; Filter: A Simple Speed-based Low-pass Filter for Noisy Input in
                    Interactive Systems.
                  </em>{" "}
                  Used in both the offline filter stack and the real-time teleoperation path.
                </li>
                <li id="reference-9" style={{ scrollMarginTop: "108px" }}>
                  Hardware: Unitree G1 and H1; BrainCo, Inspire and Unitree Dex3 dexterous hands;
                  Shadow E3M5; ALOHA; ZED stereo cameras.
                </li>
                <li id="reference-10" style={{ scrollMarginTop: "108px" }}>
                  Open-source releases by CosmicBrain AI: <code>teleopsudo</code> (MimicXR,
                  Apache-2.0), <code>egotransfer</code> (MIT), <code>CBforcesensing</code>,{" "}
                  <code>doasido</code>, <code>Simulations</code>, <code>HandTracking</code>,{" "}
                  <code>LiveTrackingDemo</code>.
                </li>
              </ol>
            </section>
            <footer className="research-article-footer">
              <p>
                <strong>From Human Motion to Humanoid Action</strong>: CosmicBrain AI, August 2026.
                Figures 1, 3, 4, 7, 8, 10, 12, 13, 15, 16, 17 and 18 are captured from the running
                system; figures 2, 6, 9, 11, 14 and 19 are architecture drawings; figure 5 is an
                internal design document. Account identifiers and filesystem paths visible in
                captured interfaces have been redacted.
              </p>
              <p>
                This report describes a system under active development. Parameter values shown are
                the production defaults at time of writing and are recorded per run in each bundle's
                metadata.
              </p>
              <p>
                <strong>Forward-looking statements.</strong> Sections 13 and 14 describe intended
                development and commercial direction, not committed deliverables. They reflect
                expectations at the date of publication, are subject to change without notice, and
                should not be relied upon as a representation of future performance. Nothing in this
                document is an offer to sell or a solicitation of an offer to buy any security.
              </p>
              <p>
                Correspondence: <a href="mailto:research@cosmicbrain.ai">research@cosmicbrain.ai</a>
                .
              </p>

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
