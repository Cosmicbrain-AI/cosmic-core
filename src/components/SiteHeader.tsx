import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  // Landing-page anchor links (hash) vs real route links, split so the router's
  // typed <Link> only ever receives valid routes (and tsc stays clean).
  const hashLinks = [
    ["01", "Meet", "/#meet"],
    ["02", "Stack", "/#stack"],
    ["03", "Primitives", "/#primitives"],
    ["04", "Platform", "/#platform"],
  ] as const;
  const routeLinks = [
    ["05", "Sales", "/sales"],
    ["06", "Live Teleop", "/app"],
  ] as const;

  const cls =
    "group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-foreground/80 hover:text-foreground";
  const content = (n: string, label: string) => (
    <>
      <span className="font-mono text-[10px] text-muted-foreground group-hover:text-primary">{n}</span>
      <span>{label}</span>
    </>
  );

  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-border-strong bg-card/90 px-2 py-1.5 shadow-sm backdrop-blur">
        <Link to="/" className="flex items-center gap-2 rounded-full px-3 py-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-primary" />
          <span className="font-mono text-sm font-semibold tracking-tight">cosmicbrain</span>
        </Link>
        <nav className="hidden md:flex items-center">
          {hashLinks.map(([n, label, href]) => (
            <a key={href} href={href} className={cls}>
              {content(n, label)}
            </a>
          ))}
          {routeLinks.map(([n, label, href]) => (
            <Link key={href} to={href} className={cls}>
              {content(n, label)}
            </Link>
          ))}
        </nav>
        <Link
          to="/sales"
          className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Request access
        </Link>
      </div>
    </header>
  );
}
