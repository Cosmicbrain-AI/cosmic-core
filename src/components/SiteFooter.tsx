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
          <span className="eyebrow">Physical intelligence. Operational focus.</span>
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
          <span className="eyebrow">Your next workflow</span>
          <ContactDialog
            title="Plan your data center deployment."
            description="Tell us about the workflow, your facility, and the criteria for a useful first pilot."
            subject="Data center humanoid deployment inquiry"
            messagePlaceholder="Your data center / first workflow / site and supervision requirements / pilot success criteria."
            trigger={
              <button type="button" className="footer-email">
                Plan a deployment <ArrowUpRight size={16} />
              </button>
            }
          />
          <span className="footer-location">
            From site assessment
            <br />
            to a measured pilot.
          </span>
        </div>
      </div>
      <div className="footer-bottom page-width">
        <span>© {new Date().getFullYear()} CosmicBrain AI</span>
        <span>One workflow. Clear evidence. Practical scale.</span>
        <a href="#">Back to the top ↑</a>
      </div>
    </footer>
  );
}
