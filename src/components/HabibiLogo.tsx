type Props = { className?: string };

/**
 * SVG recreation of the Habibi Waffle circular logo (concentric magenta/purple
 * rings, gold ice-cream swirl, pink "Habibi" script, "waffle" label, gold cone).
 *
 * Placeholder until the real artwork is supplied — to use the real logo, drop a
 * transparent PNG at public/images/logo.png and swap this for
 * <img src="/images/logo.png" />.
 */
export default function HabibiLogo({ className }: Props) {
  return (
    <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="swirl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD56B" />
          <stop offset="100%" stopColor="#F2A93C" />
        </linearGradient>
      </defs>

      {/* concentric rings */}
      <circle cx="200" cy="200" r="200" fill="#C71C8E" />
      <circle cx="200" cy="200" r="186" fill="#9C2FD0" />
      <circle cx="200" cy="200" r="156" fill="#6A1F9E" />
      <circle cx="200" cy="200" r="144" fill="#34165A" />

      {/* ice-cream swirl */}
      <g transform="translate(200 116)">
        <path
          d="M-36 26c-11-2-17-13-13-23 3-9 13-13 21-10 1-10 10-17 20-16 12 1 20 12 18 23 9 1 15 9 14 17-1 10-10 16-19 15z"
          fill="url(#swirl)"
        />
        <path d="M-21 6c-3 0-5-2-5-5s2-5 5-5 5 2 5 5-2 5-5 5z" fill="#34165A" />
        <path d="M-27 22c-2 0-4-2-4-4s2-4 4-4 4 2 4 4-2 4-4 4z" fill="#34165A" />
      </g>

      {/* "Habibi" script */}
      <text
        x="200"
        y="244"
        textAnchor="middle"
        fontFamily="'Pacifico', cursive"
        fontSize="76"
        fill="#F0309A"
      >
        Habibi
      </text>

      {/* "waffle" label */}
      <text
        x="200"
        y="282"
        textAnchor="middle"
        fontFamily="'Pacifico', cursive"
        fontSize="26"
        fill="#F0309A"
      >
        waffle
      </text>

      {/* waffle cone */}
      <g stroke="#F2B33C" strokeWidth="3.4" fill="none" strokeLinejoin="round">
        <path d="M168 296 L200 360 L232 296 Z" />
        <path d="M178 306 H222 M186 320 H214 M194 334 H206" />
        <path d="M186 296 L210 348 M214 296 L190 348" opacity="0.75" />
      </g>
    </svg>
  );
}
