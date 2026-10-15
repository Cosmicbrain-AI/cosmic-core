import { pilotMetrics } from "@/data/data-center-pilot";
import "./pilot-scorecard.css";

export function PilotScorecard({ embedded = false }: { embedded?: boolean }) {
  return (
    <section
      className={`pilot-scorecard${embedded ? " pilot-scorecard--embedded" : ""}`}
      id="pilot-scorecard"
      aria-labelledby="pilot-scorecard-heading"
    >
      <div className={embedded ? undefined : "page-width"}>
        <div className="pilot-scorecard-heading">
          <div>
            <p className="eyebrow">Field pilot / Measurement protocol</p>
            <h2 id="pilot-scorecard-heading">
              Nine operational <em>measures.</em>
            </h2>
          </div>
          <p>
            Agree the task, denominator, operating window and acceptance threshold before the first
            run. These are proposed pilot definitions; measured results are not published here.
          </p>
        </div>
        <div
          className="pilot-table-wrap"
          role="region"
          aria-label="Pilot metric definitions"
          tabIndex={0}
        >
          <table className="pilot-table">
            <caption>Data center robot pilot scorecard: calculation and required reporting</caption>
            <thead>
              <tr>
                <th scope="col">Metric</th>
                <th scope="col">Definition</th>
                <th scope="col">Required reporting</th>
              </tr>
            </thead>
            <tbody>
              {pilotMetrics.map((metric, index) => (
                <tr key={metric.id}>
                  <th scope="row">
                    <span className="pilot-metric-index">{String(index + 1).padStart(2, "0")}</span>
                    {metric.name}
                  </th>
                  <td>{metric.definition}</td>
                  <td>{metric.reporting}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
