import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Heart } from "lucide-react";
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
            A little curiosity.
            <br />A lot of possibility.
          </p>
          <span className="eyebrow">Human ideas. Physical intelligence.</span>
        </div>
        <div className="footer-column">
          <span className="eyebrow">Explore</span>
          <a href="/#stack">Our approach</a>
          <Link to="/catalog">The robots</Link>
          <Link to="/brands">The makers</Link>
          <Link to="/solutions">Real-world uses</Link>
        </div>
        <div className="footer-column">
          <span className="eyebrow">Build with us</span>
          <Link to="/sales">Start a conversation</Link>
          <Link to="/docs">Technical report</Link>
          <Link to="/app">Live Teleop</Link>
          <a href="/#meet">Why we’re here</a>
          <a href="/#faq">A few good questions</a>
        </div>
        <div className="footer-column">
          <span className="eyebrow">Say hello</span>
          <a className="footer-email" href="mailto:hello@cosmicbrainai.com">
            hello@cosmicbrainai.com <ArrowUpRight size={16} />
          </a>
          <span className="footer-location">
            Built with care in
            <br />
            San Francisco, California.
          </span>
        </div>
      </div>
      <div className="footer-bottom page-width">
        <span>© {new Date().getFullYear()} CosmicBrain AI</span>
        <span>
          <Heart size={12} /> People at the heart. Robots in the loop.
        </span>
        <a href="#">Back to the top ↑</a>
      </div>
    </footer>
  );
}
