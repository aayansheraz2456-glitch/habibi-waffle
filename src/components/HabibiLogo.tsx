type Props = {
  className?: string;
  /** show the concentric ring glow behind the badge */
  rings?: boolean;
};

/**
 * SVG recreation of the Habibi Waffle circular logo:
 * concentric purple/magenta rings, gold ice-cream swirl, "Habibi" script,
 * "waffle" label, and a waffle cone.
 */
export default function HabibiLogo({ className, rings = true }: Props) {
  return (
    <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#3a1257" />
          <stop offset="100%" stopColor="#1c0a2e" />
        </radialGradient>
        <linearGradient id="swirl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd56b" />
          <stop offset="100%" stopColor="#f5a623" />
        </linearGradient>
      </defs>

      {rings && (
        <>
          <circle cx="200" cy="200" r="198" fill="#5b2a86" />
          <circle cx="200" cy="200" r="176" fill="#e6398b" opacity="0.85" />
          <circle cx="200" cy="200" r="158" fill="#7a3aa6" />
          <circle cx="200" cy="200" r="140" fill="#9b4bc4" opacity="0.6" />
        </>
      )}
      <circle cx="200" cy="200" r="132" fill="url(#bg)" />

      {/* ice-cream swirl */}
      <g transform="translate(200 118)">
        <path
          d="M-34 24c-10-2-16-12-12-22 3-8 12-12 20-9 1-9 9-16 19-15 11 1 19 11 17 22 8 1 14 8 13 16-1 9-9 15-18 14z"
          fill="url(#swirl)"
        />
        <circle cx="-20" cy="6" r="5" fill="#1c0a2e" />
        <circle cx="-26" cy="20" r="4" fill="#1c0a2e" />
      </g>

      {/* "Habibi" script */}
      <text
        x="200"
        y="232"
        textAnchor="middle"
        fontFamily="'Pacifico', cursive"
        fontSize="66"
        fill="#ff3d9a"
      >
        Habibi
      </text>
      {/* "waffle" label */}
      <text
        x="200"
        y="262"
        textAnchor="middle"
        fontFamily="'Barlow', sans-serif"
        fontSize="22"
        letterSpacing="3"
        fill="#f3e6c4"
      >
        waffle
      </text>

      {/* waffle cone */}
      <g stroke="#f5a623" strokeWidth="3" fill="none">
        <path d="M176 280 L200 326 L224 280 Z" />
        <path d="M182 288 H218 M188 298 H212 M194 308 H206" />
        <path d="M191 280 L205 318 M209 280 L195 318" opacity="0.7" />
      </g>
    </svg>
  );
}
