export function AxisMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden>
      <g stroke="currentColor" strokeWidth="1.2" fill="none">
        <line x1="40" y1="40" x2="40" y2="6" />
        <line x1="40" y1="40" x2="72" y2="56" />
        <line x1="40" y1="40" x2="8" y2="56" />
        <circle cx="40" cy="40" r="2.5" fill="var(--primary)" stroke="none" />
      </g>
      <g fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
        <text x="36" y="4">Z</text>
        <text x="74" y="58">X</text>
        <text x="2" y="58">Y</text>
      </g>
    </svg>
  );
}
