import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Search, Video, Hand, Radio, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactDialog } from "@/components/ContactDialog";
import { FilterPill, PageHero } from "@/components/explore/shared";
import { publicDatasets, type PublicDataset } from "@/data/public-datasets";
import "@/components/explore/datasets.css";

const title = "Egocentric & teleoperation datasets · CosmicBrain";
const description =
  "Explore egocentric human demonstrations and robot teleoperation datasets, including EgoVerse, DROID and BridgeData. Discuss CosmicBrain deployment data, coverage and licensing.";

export const Route = createFileRoute("/datasets")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://www.cosmicbrain.ai/datasets" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://www.cosmicbrain.ai/datasets" }],
  }),
  component: DatasetsPage,
});

type Kind = "all" | PublicDataset["kind"];

function DataInquiry({
  label = "Request dataset inventory",
  className = "button",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <ContactDialog
      title="Find the right robotics data."
      description="Tell us the task, robot platform and signals your model needs. We’ll discuss available coverage, samples, formats and licensing."
      subject="Robotics dataset inventory and licensing inquiry"
      messagePlaceholder="Target tasks, robot platforms, egocentric or teleoperation data, required signals, intended use and approximate scope…"
      trigger={
        <button type="button" className={className}>
          {label} <ArrowUpRight size={16} />
        </button>
      }
    />
  );
}

function DatasetPreview({ dataset }: { dataset: PublicDataset }) {
  const preview = dataset.preview;
  const [playing, setPlaying] = useState(false);
  if (!preview) {
    return (
      <div className={`data-source-cover is-${dataset.kind}`}>
        <span className="explore-note-label">
          {dataset.kind === "egocentric" ? "Human demonstration" : "Robot demonstration"}
        </span>
        <div className="data-channel-map" aria-hidden="true">
          {dataset.kind === "egocentric" ? (
            <Hand size={36} strokeWidth={1} />
          ) : (
            <Radio size={36} strokeWidth={1} />
          )}
          <span className="data-channel-line" />
          <span>{dataset.modalities.slice(0, 3).join(" / ")}</span>
        </div>
        <a href={dataset.exploreUrl} target="_blank" rel="noreferrer">
          Explore at source <ArrowUpRight size={14} />
        </a>
      </div>
    );
  }
  const video = preview.src.endsWith(".mp4");
  const poster =
    "poster" in preview && typeof preview.poster === "string" ? preview.poster : undefined;
  return (
    <figure className="data-card-preview">
      <div className="data-media">
        {video ? (
          <video controls playsInline preload="none" poster={poster} aria-label={preview.alt}>
            <source src={preview.src} type="video/mp4" />
            <a href={preview.src}>Open the dataset preview</a>
          </video>
        ) : (
          <>
            <img
              src={poster && !playing ? poster : preview.src}
              alt={preview.alt}
              loading="lazy"
              width="640"
              height="400"
            />
            {poster && (
              <button
                type="button"
                className="data-preview-toggle"
                onClick={() => setPlaying(!playing)}
                aria-pressed={playing}
              >
                <Video size={14} /> {playing ? "Stop sample" : "Play sample"}
              </button>
            )}
          </>
        )}
      </div>
      <figcaption>
        {preview.credit}{" "}
        <a href={preview.sourceUrl} target="_blank" rel="noreferrer">
          Source
        </a>
        {" · "}
        <a href={preview.licenseUrl} target="_blank" rel="noreferrer">
          {dataset.id === "holoassist" ? "CDLA license text" : "CC BY 4.0"}
        </a>
      </figcaption>
    </figure>
  );
}

function DatasetCard({ dataset }: { dataset: PublicDataset }) {
  return (
    <article className="data-card" data-dataset={dataset.id}>
      <DatasetPreview dataset={dataset} />
      <div className="data-card-body">
        <div className="data-card-meta">
          <span>
            {dataset.kind === "egocentric" ? "Egocentric · human" : "Teleoperation · robot"}
          </span>
          <span>Community dataset</span>
        </div>
        <h3>
          <a href={dataset.sourceUrl} target="_blank" rel="noreferrer">
            {dataset.name} <ArrowUpRight size={20} />
          </a>
        </h3>
        <p className="data-publisher">{dataset.publisher}</p>
        <p className="data-description">{dataset.summary}</p>
        <dl className="data-card-facts">
          <div>
            <dt>Published scale</dt>
            <dd>
              {dataset.scale}
              <small>{dataset.scaleNote}</small>
            </dd>
          </div>
          <div>
            <dt>Task examples</dt>
            <dd>{dataset.tasks.join(" · ")}</dd>
          </div>
        </dl>
        <ul className="data-modalities" aria-label="Available signals">
          {dataset.modalities.map((modality) => (
            <li key={modality}>{modality}</li>
          ))}
        </ul>
        <details className="data-license">
          <summary>{dataset.licenseLabel}</summary>
          <p>{dataset.licenseNote}</p>
          <a href={dataset.licenseUrl} target="_blank" rel="noreferrer">
            Publisher’s usage terms <ArrowUpRight size={12} />
          </a>
        </details>
        <div className="data-card-bottom">
          <span>{dataset.accessLabel}</span>
          <a href={dataset.exploreUrl} target="_blank" rel="noreferrer">
            Explore dataset <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </article>
  );
}

function DatasetsPage() {
  const [kind, setKind] = useState<Kind>("all");
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const shown = publicDatasets.filter(
    (dataset) =>
      (kind === "all" || dataset.kind === kind) &&
      [
        dataset.name,
        dataset.publisher,
        dataset.summary,
        dataset.kind,
        ...dataset.tasks,
        ...dataset.modalities,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
  );
  return (
    <div className="explore-page datasets-page">
      <SiteHeader />
      <main>
        <PageHero
          kicker="Physical AI / Data library"
          title="Human demonstrations."
          accent="Robot trajectories."
          sub="Data for models that act in the world. Explore public egocentric and teleoperation datasets, then scope CosmicBrain data around the tasks, platforms and deployment conditions that matter to you."
          sketch="arm"
          note="An action is only as useful as its context."
        />
        <div className="explore-wrap data-page-content">
          <nav className="data-jumpnav" aria-label="Dataset page sections">
            <a href="#community">
              Explore public datasets <ArrowRight size={14} />
            </a>
            <a href="#cosmicbrain-data">CosmicBrain data</a>
            <a href="#signals">Understand the signals</a>
          </nav>

          <section id="community" className="data-library" aria-labelledby="community-heading">
            <div className="data-section-heading">
              <span className="explore-note-label">01 / Community data library</span>
              <h2 id="community-heading">
                Explore the data. <em>Know its source.</em>
              </h2>
              <p>
                Human demonstrations and robot-native trajectories from the research community. Each
                collection belongs to its publisher; the published scale below is separate from
                CosmicBrain’s data inventory.
              </p>
            </div>
            <div className="data-featured">
              <div>
                <span className="explore-note-label">Featured ecosystem / EgoVerse</span>
                <h3>Human data, built for robot learning.</h3>
                <p>
                  EgoVerse connects human demonstrations with processing, training and evaluation
                  tools. Its explorer lets you inspect episodes, tasks, camera views and metadata
                  across contributing sources.
                </p>
                <a
                  href="https://partners.mecka.ai/egoverse"
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  Open the EgoVerse explorer <ArrowUpRight size={16} />
                </a>
              </div>
              <ol className="data-featured-flow" aria-label="EgoVerse data representation">
                <li>
                  <span>01</span>
                  <strong>Egocentric video</strong>
                  <small>See the human’s view</small>
                </li>
                <li>
                  <span>02</span>
                  <strong>Poses & task context</strong>
                  <small>Inspect recorded signals</small>
                </li>
                <li>
                  <span>03</span>
                  <strong>Human-to-robot learning</strong>
                  <small>Evaluate transfer on robots</small>
                </li>
              </ol>
            </div>
            <div className="data-toolbar">
              <div className="data-filters" role="group" aria-label="Filter dataset type">
                {(
                  [
                    ["all", "All datasets"],
                    ["egocentric", "Egocentric"],
                    ["teleoperation", "Robot teleop"],
                  ] as const
                ).map(([value, label]) => (
                  <FilterPill key={value} active={kind === value} onClick={() => setKind(value)}>
                    {label}{" "}
                    <span>
                      {value === "all"
                        ? publicDatasets.length
                        : publicDatasets.filter((d) => d.kind === value).length}
                    </span>
                  </FilterPill>
                ))}
              </div>
              <label className="data-search">
                <Search size={17} />
                <span className="sr-only">Search datasets, tasks and signals</span>
                <input
                  type="search"
                  placeholder="Search tasks, datasets or signals…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
            </div>
            <p className="data-result-count" role="status">
              {shown.length} {shown.length === 1 ? "collection" : "collections"} · Public source
              references reviewed October 2, 2026
            </p>
            <div className="data-grid">
              {shown.map((dataset) => (
                <DatasetCard dataset={dataset} key={dataset.id} />
              ))}
            </div>
            {shown.length === 0 && (
              <div className="data-empty">
                <h3>No matching collections.</h3>
                <p>Try another task or signal, or explore the full library.</p>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => {
                    setQuery("");
                    setKind("all");
                  }}
                >
                  Clear filters <ArrowRight size={15} />
                </button>
              </div>
            )}
            <p className="data-library-note">
              Preview media is credited at the point of use. Collections with restricted or
              unverified display rights link to their official explorers. Access requirements,
              available subsets and terms are set by each publisher.
            </p>
          </section>

          <section id="cosmicbrain-data" className="data-owned" aria-labelledby="owned-heading">
            <div className="data-section-heading">
              <span className="explore-note-label">02 / CosmicBrain data</span>
              <h2 id="owned-heading">
                Experience from operations. <em>Scoped for your model.</em>
              </h2>
              <p>
                We collect real deployment data and have hundreds of thousands of hours of
                teleoperation data available for model teams. Request the inventory to review
                coverage, sample availability, formats and licensing.
              </p>
            </div>
            <div className="data-offering-grid">
              <article>
                <Radio size={23} strokeWidth={1.4} />
                <h3>Robot teleoperation</h3>
                <p>
                  Human-guided robot experience. Discuss target tasks, embodiments, observation and
                  action signals, operator involvement and annotation needs.
                </p>
                <span>For imitation learning & model research</span>
              </article>
              <article>
                <Video size={23} strokeWidth={1.4} />
                <h3>Live deployment data</h3>
                <p>
                  Experience from robots working at actual sites. Discuss task context, operating
                  conditions, interventions and the evidence required for your evaluation.
                </p>
                <span>For adaptation & field evaluation</span>
              </article>
            </div>
            <div className="data-inquiry-row">
              <DataInquiry />
              <p>Coverage and usage rights are confirmed per collection and engagement.</p>
            </div>
          </section>

          <section id="signals" className="data-signals" aria-labelledby="signals-heading">
            <div className="data-section-heading">
              <span className="explore-note-label">03 / Read the record</span>
              <h2 id="signals-heading">
                The view. The action. <em>The context.</em>
              </h2>
              <p>
                Choose data by the supervision your model needs. A first-person video, a tracked
                human hand and a commanded robot action are different signals.
              </p>
            </div>
            <div className="data-signal-grid">
              <article>
                <span>01 / HUMAN OBSERVATIONS</span>
                <h3>Egocentric demonstrations</h3>
                <p>
                  First-person task execution, with language, hand poses or other sensors where
                  provided. Useful for studying activity, objects and human manipulation. Human
                  poses require an explicit mapping to a robot’s action space.
                </p>
              </article>
              <article>
                <span>02 / ROBOT ACTIONS</span>
                <h3>Teleoperated trajectories</h3>
                <p>
                  Robot observations paired with control signals and state. Check coordinate frames,
                  units, control frequency, gripper conventions, calibration and synchronization
                  before combining embodiments.
                </p>
              </article>
              <article>
                <span>03 / SITE CONTEXT</span>
                <h3>Deployment experience</h3>
                <p>
                  Tasks in operating environments, with control ownership, intervention logs and
                  outcomes. Separate demonstrations from autonomous trials, and keep sessions and
                  sites disjoint when evaluating generalization.
                </p>
              </article>
            </div>
            <a href="/evaluations" className="text-link">
              See how we define evaluation evidence <ArrowUpRight size={16} />
            </a>
          </section>
        </div>
        <section className="data-cta">
          <div className="explore-wrap">
            <span className="explore-note-label">For physical AI model teams</span>
            <h2>
              Start with the task. <em>Find the right data.</em>
            </h2>
            <p>Tell us what your model needs to learn, and the robot it needs to work on.</p>
            <DataInquiry label="Discuss your data requirements" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
