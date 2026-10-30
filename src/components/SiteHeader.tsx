import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ContactDialog } from "./ContactDialog";
import "./CompanyLogo.css";
import "./data-center-sales.css";

export function CosmicMark({ className = "" }: { className?: string }) {
  const filterId = `cosmic-mark-${useId().replace(/:/g, "")}`;
  return (
    <svg
      className={`company-logo ${className}`}
      width="40"
      height="40"
      viewBox="0 0 1146 1130"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={filterId} colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  .2126 .7152 .0722 0 0"
          />
          <feComponentTransfer result="silhouette">
            <feFuncA type="linear" slope="2.4" intercept="-0.14" />
          </feComponentTransfer>
          <feFlood floodColor="currentColor" />
          <feComposite operator="in" in2="silhouette" />
        </filter>
      </defs>
      <image
        href="/brand/cosmicbrain-logo.png"
        width="1146"
        height="1130"
        filter={`url(#${filterId})`}
      />
    </svg>
  );
}

const links = [
  ["Evals", "/evaluations"],
  ["Datasets", "/datasets"],
  ["Newsroom", "/newsroom"],
  ["Research", "/docs"],
  ["Sales", "/sales"],
] as const;
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          menuRef.current?.focus();
        }
      }}
    >
      <div className="site-header-inner">
        <Link to="/" className="wordmark" aria-label="CosmicBrain home">
          <CosmicMark />
          <span>
            cosmicbrain<span className="wordmark-dot">.</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <ContactDialog
            title="Plan your data center deployment."
            description="Define the rack or row scope, task frequency, access limits, supervision model and pilot acceptance criteria."
            subject="Data center humanoid deployment inquiry"
            messagePlaceholder="Facility and rack/row scope / inspection, asset audit or parts run / task frequency / access and supervision / network conditions / acceptance criteria."
            trigger={
              <button type="button" className="button button-small deployment-header-cta">
                Plan a deployment <ArrowUpRight size={16} />
              </button>
            }
          />
          <button
            ref={menuRef}
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
              <ArrowUpRight size={18} />
            </a>
          ))}
          <Link to="/sales" className="mobile-deployment-link" onClick={() => setOpen(false)}>
            Plan a data center deployment <ArrowUpRight size={18} />
          </Link>
        </nav>
      )}
    </header>
  );
}
