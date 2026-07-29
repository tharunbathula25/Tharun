/**
 * The brushed-chrome T+A ligature — a capital T whose crossbar runs right
 * into a stylized A. Floats directly on the black, never in a box or circle.
 */
export function MonogramMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 100"
      role="img"
      aria-label="Tharun AI Studio monogram"
      className={className}
    >
      <defs>
        <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="38%" stopColor="#cfcfd6" />
          <stop offset="52%" stopColor="#8b8b94" />
          <stop offset="68%" stopColor="#e6e6ec" />
          <stop offset="100%" stopColor="#a3a3ad" />
        </linearGradient>
      </defs>
      <g fill="url(#chrome)">
        {/* T — crossbar reaching right, then the stem */}
        <polygon points="4,8 80,8 80,23 4,23" />
        <polygon points="32,8 48,8 48,92 32,92" />
        {/* A — two legs off a shared apex, plus the bar */}
        <polygon points="84,8 94,8 78,92 66,92" />
        <polygon points="84,8 94,8 110,92 98,92" />
        <polygon points="73,60 105,60 108,73 70,73" />
      </g>
    </svg>
  );
}

export function Monogram({
  className = "",
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "lg";
}) {
  const lg = size === "lg";

  return (
    <div className={`flex flex-col ${lg ? "items-center" : "items-start"} ${className}`}>
      <MonogramMark className={lg ? "h-16 w-auto" : "h-9 w-auto"} />
      <span
        className={`text-metal font-display mt-1.5 leading-none tracking-[0.28em] ${
          lg ? "text-2xl" : "text-base"
        }`}
      >
        THARUN
      </span>
      <span
        className={`text-gold font-display leading-none tracking-[0.22em] ${
          lg ? "text-base" : "text-[11px]"
        }`}
      >
        — AI STUDIO —
      </span>
      <span
        className={`text-chrome-dim mt-1 leading-none tracking-[0.18em] uppercase ${
          lg ? "text-[10px]" : "text-[8px]"
        }`}
      >
        AI systems for modern businesses
      </span>
    </div>
  );
}
