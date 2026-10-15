import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ContactDialog } from "./ContactDialog";
import { CosmicMark } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-top page-width">
        <div className="footer-intro">
          <Link to="/" className="wordmark">
            <CosmicMark />
            <span>cosmicbrain.</span>
          </Link>
          <p>
            Humanoids in
            <br />
            the data center.
          </p>
          <span className="eyebrow">Humanoid deployments. Data center operations.</span>
        </div>
        <div className="footer-column">
          <span className="eyebrow">Evidence</span>
          <Link to="/evaluations">Evals</Link>
          <Link to="/datasets">Datasets</Link>
          <Link to="/docs">Docs</Link>
        </div>
        <div className="footer-column">
          <span className="eyebrow">CosmicBrain</span>
          <Link to="/newsroom">Newsroom</Link>
          <Link to="/sales">Sales</Link>
        </div>
        <div className="footer-column">
          <span className="eyebrow">Pilot scope</span>
          <ContactDialog
            title="Plan your data center deployment."
            description="Specify the rack or row scope, scheduled tasks, supervision requirements and measurable acceptance criteria."
            subject="Data center humanoid deployment inquiry"
            messagePlaceholder="Facility and rack/row scope / task and frequency / access and supervision / network conditions / acceptance criteria."
            trigger={
              <button type="button" className="footer-email">
                Plan a deployment <ArrowUpRight size={16} />
              </button>
            }
          />
          <span className="footer-location">
            Scheduled tasks.
            <br />
            Logged operator time.
          </span>
        </div>
      </div>
      <div className="footer-bottom page-width">
        <span>© {new Date().getFullYear()} CosmicBrain AI</span>
        <span>Task outcomes. Operator minutes. Incident logs.</span>
        <a href="/media/photo-credits.html">Photo credits</a>
        <a href="#">Back to the top ↑</a>
      </div>
    </footer>
  );
}
