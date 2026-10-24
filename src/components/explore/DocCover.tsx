type CoverVariant = "gripper" | "labels" | "audit" | "checker" | "transfer";

type DocCoverProps = {
  variant: CoverVariant;
  kicker: string;
  title: readonly string[];
  caption: readonly string[];
  footer: string;
};

function CoverIllustration({ variant }: { variant: CoverVariant }) {
  switch (variant) {
    case "gripper":
      return (
        <g strokeWidth="2" strokeLinejoin="round">
          <path d="M108 0V10M77 21H51M139 21H165" stroke="#6d7a60" />
          <rect x="80" y="10" width="56" height="23" rx="3" stroke="currentColor" />
          <path
            d="M91 33V47H69V79H91V63H98V33M125 33V47H147V79H125V63H118V33"
            stroke="currentColor"
          />
          <rect x="98" y="61" width="20" height="24" rx="2" fill="#b94e32" stroke="#b94e32" />
          <path d="M84 93H132M84 89V97M132 89V97" stroke="#b94e32" />
          <path d="M38 57H57M159 57H178" stroke="#6d7a60" strokeDasharray="3 4" />
          <path d="M52 53L57 57L52 61M164 53L159 57L164 61" stroke="#6d7a60" />
        </g>
      );
    case "labels":
      return (
        <g strokeWidth="2" strokeLinejoin="round">
          <rect x="1" y="5" width="54" height="40" rx="2" stroke="currentColor" />
          <rect x="81" y="5" width="54" height="40" rx="2" fill="#b94e3212" stroke="#b94e32" />
          <rect x="161" y="5" width="54" height="40" rx="2" stroke="currentColor" />
          <path d="M18 33L28 18L40 33M172 33H182V19H199" stroke="#6d7a60" />
          <path d="M101 17L117 25L101 33Z" fill="#b94e32" stroke="#b94e32" />
          <path d="M28 49V59M108 49V59M188 49V59" stroke="currentColor" opacity=".45" />
          <rect x="1" y="65" width="62" height="13" fill="#6d7a60" />
          <rect x="69" y="65" width="78" height="13" fill="#b94e32" />
          <rect x="153" y="65" width="62" height="13" fill="#302d25" />
          <path
            d="M1 87V93H63V87M69 87V93H147V87M153 87V93H215V87"
            stroke="currentColor"
            opacity=".5"
          />
        </g>
      );
    case "audit":
      return (
        <g strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="43" cy="39" r="28" stroke="currentColor" />
          <path d="M28 39L39 50L57 28" stroke="#b94e32" strokeWidth="3" />
          <path d="M64 60L85 82" stroke="currentColor" strokeWidth="5" />
          <path d="M78 39H116V14H171M116 39V70H171" stroke="#6d7a60" />
          <path d="M165 10L171 14L165 18M165 66L171 70L165 74" stroke="#6d7a60" />
          <rect x="180" y="2" width="30" height="24" rx="2" stroke="currentColor" />
          <path d="M188 14L193 19L202 9" stroke="currentColor" />
          <rect x="180" y="58" width="30" height="24" rx="2" fill="#b94e32" stroke="#b94e32" />
          <path d="M195 64V71M195 76V76.5" stroke="#f7f4ec" strokeWidth="2.5" />
        </g>
      );
    case "checker":
      return (
        <g strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="22" width="68" height="57" rx="2" stroke="currentColor" />
          <rect x="141" y="22" width="68" height="57" rx="2" stroke="#b94e32" />
          <path d="M7 36H75M141 36H209" stroke="currentColor" opacity=".35" />
          <path d="M22 52L29 59L40 45M152 53H164M152 65H180" stroke="#6d7a60" />
          <path d="M48 52H61M48 64H61" stroke="currentColor" opacity=".5" />
          <rect x="183" y="46" width="14" height="20" rx="1" fill="#b94e32" />
          <path d="M59 12C87 -1 126 -1 157 12M151 4L157 12L147 13" stroke="#b94e32" />
          <path d="M157 89C124 101 87 101 59 89M65 97L59 89L69 87" stroke="currentColor" />
          <path d="M87 50H129M123 45L129 50L123 55" stroke="currentColor" opacity=".45" />
        </g>
      );
    case "transfer":
      return (
        <g strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="27" cy="15" r="8" stroke="currentColor" />
          <path
            d="M27 24V59M27 33L9 48M27 33L45 48M27 59L13 84M27 59L41 84"
            stroke="currentColor"
          />
          <rect x="180" y="7" width="17" height="17" rx="2" stroke="currentColor" />
          <rect x="176" y="33" width="25" height="30" rx="2" stroke="currentColor" />
          <path
            d="M188 24V33M176 39L162 53M201 39L215 53M180 63V84M197 63V84"
            stroke="currentColor"
          />
          <rect x="81" y="26" width="55" height="10" rx="2" fill="#6d7a60" />
          <rect x="81" y="43" width="55" height="10" rx="2" fill="#b94e32" />
          <rect x="81" y="60" width="55" height="10" rx="2" fill="#302d25" />
          <path d="M51 48H71M65 43L71 48L65 53M144 48H158M152 43L158 48L152 53" stroke="#b94e32" />
        </g>
      );
  }
}

export function DocCover({ variant, kicker, title, caption, footer }: DocCoverProps) {
  return (
    <div
      className="docs-paper-cover docs-brief-cover"
      data-cover-variant={variant}
      aria-hidden="true"
    >
      <svg viewBox="0 0 260 336" fill="none" className="docs-brief-cover-art">
        <text x="22" y="29" className="docs-brief-cover-brand">
          CosmicBrain AI
        </text>
        <path d="M22 43H238" stroke="currentColor" opacity=".25" />
        <text x="22" y="65" className="docs-brief-cover-kicker">
          {kicker}
        </text>
        <text x="22" y="100" className="docs-brief-cover-title">
          {title.map((line, index) => (
            <tspan x="22" y={100 + index * 29} key={line}>
              {line}
            </tspan>
          ))}
        </text>
        <g transform="translate(22 182)">
          <CoverIllustration variant={variant} />
        </g>
        {caption.map((line, index) => (
          <text x="22" y={295 + index * 11} key={line} className="docs-brief-cover-caption">
            {line}
          </text>
        ))}
        <text x="22" y="320" className="docs-brief-cover-footer">
          {footer}
        </text>
      </svg>
    </div>
  );
}
