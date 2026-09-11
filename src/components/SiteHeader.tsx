import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import "./CompanyLogo.css";

export function CosmicMark({ className = "" }: { className?: string }) {
  return (
    <img
      className={`company-logo ${className}`}
      src="/brand/cosmicbrain-logo.png"
      width="40"
      height="40"
      alt=""
      aria-hidden="true"
      decoding="async"
    />
  );
}
const links = [
  ["Our approach", "/#stack"],
  ["The robots", "/catalog"],
  ["Solutions", "/solutions"],
  ["Sales", "/sales"],
  ["Technical report", "/docs"],
  ["Live Teleop", "/app"],
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
            <a
              key={href}
              href={href}
              className={href === "/app" ? "nav-teleop" : undefined}
              aria-current={pathname === href ? "page" : undefined}
            >
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
          <Link to="/brands">
            Meet the makers <ArrowUpRight size={18} />
          </Link>
        </nav>
      )}
    </header>
  );
}
