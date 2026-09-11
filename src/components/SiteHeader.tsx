import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function CosmicMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 2v36M2 20h36M7.3 7.3l25.4 25.4M7.3 32.7 32.7 7.3"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <circle
        cx="20"
        cy="20"
        r="10"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path d="M15 17v5m10-5v5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}
const links = [
  ["Our approach", "/#stack"],
  ["The robots", "/catalog"],
  ["In the real world", "/solutions"],
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
          <Link to="/sales" className="button button-small">
            Let’s talk <ArrowUpRight size={16} />
          </Link>
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
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={18} />
            </a>
          ))}
          <Link to="/brands">
            Meet the makers <ArrowUpRight size={18} />
          </Link>
          <Link to="/docs">
            Inside the engineering <ArrowUpRight size={18} />
          </Link>
          <Link to="/sales">
            Start a conversation <ArrowUpRight size={18} />
          </Link>
          <Link to="/app">
            Operator workspace <ArrowUpRight size={18} />
          </Link>
        </nav>
      )}
    </header>
  );
}
