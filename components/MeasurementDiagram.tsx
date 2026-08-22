/**
 * A labelled diagram of the six measurements needed for a remote order.
 * Drawn as inline SVG so it stays sharp, weighs nothing, and can be recoloured
 * with the rest of the site. Decorative-by-parts: the figure is `aria-hidden`
 * and the real information lives in the list beside it.
 */
export default function MeasurementDiagram({ className = '' }: { className?: string }) {
  const wine = '#6B1F2E';
  const gold = '#B08D4F';
  const muted = '#8A7C77';

  return (
    <svg
      viewBox="34 46 288 226"
      role="img"
      aria-label="Diagram of a blouse showing where the six measurements are taken: shoulder, bust, waist, blouse length, sleeve length and armhole."
      className={className}
    >
      <g fill="none" stroke={wine} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
        {/* Body of the blouse */}
        <path d="M112 92 L112 250 L208 250 L208 92" />
        {/* Neckline */}
        <path d="M132 92 Q160 116 188 92" />
        {/* Shoulders and sleeves */}
        <path d="M112 92 L96 84 L74 132 L104 146 L112 122" />
        <path d="M208 92 L224 84 L246 132 L216 146 L208 122" />
        <path d="M96 84 L132 92" />
        <path d="M224 84 L188 92" />
      </g>

      {/* Armhole */}
      <ellipse cx="112" cy="116" rx="11" ry="24" fill="none" stroke={gold} strokeWidth="1.5" strokeDasharray="3 3" />

      <g stroke={gold} strokeWidth="1.5" strokeLinecap="round">
        {/* Shoulder */}
        <path d="M100 70 L220 70" />
        <path d="M100 64 L100 76 M220 64 L220 76" />
        {/* Bust */}
        <path d="M112 160 L208 160" strokeDasharray="4 4" />
        {/* Waist */}
        <path d="M112 214 L208 214" strokeDasharray="4 4" />
        {/* Blouse length */}
        <path d="M266 92 L266 250" />
        <path d="M260 92 L272 92 M260 250 L272 250" />
        {/* Sleeve length */}
        <path d="M92 76 L60 140" />
        <path d="M87 73 L97 79 M55 137 L65 143" />
        {/* Leader from the armhole label, placed inside the body where nothing crosses it */}
        <path d="M136 128 L118 120" strokeDasharray="2 2" />
      </g>

      <g fill={muted} fontSize="11" fontFamily="var(--font-body), system-ui, sans-serif">
        <text x="160" y="60" textAnchor="middle">Shoulder</text>
        <text x="160" y="156" textAnchor="middle">Bust</text>
        <text x="160" y="210" textAnchor="middle">Waist</text>
        <text x="278" y="175" textAnchor="start">Blouse</text>
        <text x="278" y="189" textAnchor="start">length</text>
        <text x="44" y="160" textAnchor="start">Sleeve</text>
        <text x="44" y="174" textAnchor="start">length</text>
        <text x="140" y="132" textAnchor="start">Armhole</text>
      </g>
    </svg>
  );
}
