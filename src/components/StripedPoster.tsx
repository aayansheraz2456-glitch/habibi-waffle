import { useNavigate } from "react-router-dom";
import { CATEGORY_ORDER, CATEGORIES, type Category } from "../data/menu";
import Grain from "./Grain";
import { ArrowRight } from "./icons";

/** Poster colours + real brand logos per category. */
const STRIPE: Record<
  Category,
  {
    bg: string;
    title: string;
    accent: string;
    logo: string;
    logoClass: string;
    lines: string[];
  }
> = {
  chinese: {
    bg: "linear-gradient(180deg,#5A1018 0%,#3A0A10 100%)",
    title: "text-[#F3E6C4]",
    accent: "text-[#F3E6C4]/80",
    logo: "/images/logo-habibi-light.webp",
    logoClass: "h-20 w-auto sm:h-24",
    lines: ["Chinese", "Menu"],
  },
  waffle: {
    bg: "linear-gradient(180deg,#4A2270 0%,#2A0F43 100%)",
    title: "text-toon-pink",
    accent: "text-white/80",
    logo: "/images/logo-waffle.webp",
    logoClass: "h-28 w-28 sm:h-32 sm:w-32",
    lines: ["Waffle &", "Dessert"],
  },
  fastfood: {
    bg: "linear-gradient(180deg,#2B2C31 0%,#141417 100%)",
    title: "text-toon-amber",
    accent: "text-white/80",
    logo: "/images/logo-h.webp",
    logoClass: "h-24 w-24 sm:h-28 sm:w-28",
    lines: ["Broast", "Pizza", "Wrap"],
  },
};

function Stripe({ slug }: { slug: Category }) {
  const navigate = useNavigate();
  const info = CATEGORIES[slug];
  const s = STRIPE[slug];

  return (
    <button
      type="button"
      onClick={() => navigate(`/menu/${slug}`)}
      style={{ background: s.bg }}
      className="group relative flex min-h-[70vh] flex-1 basis-0 flex-col items-center justify-between overflow-hidden px-6 py-12 text-center transition-all duration-500 ease-out md:min-h-screen md:basis-0 md:hover:flex-[1.8]"
    >
      <Grain className="z-[1]" opacity={0.3} />

      {/* brand logo */}
      <div className="relative z-10 flex min-h-[8rem] items-center">
        <img
          src={s.logo}
          alt={`Habibi ${info.title}`}
          draggable={false}
          className={`${s.logoClass} object-contain transition-transform duration-500 group-hover:scale-110`}
        />
      </div>

      {/* big title */}
      <h3
        className={`relative z-10 font-display uppercase leading-[0.85] tracking-tight transition-transform duration-500 group-hover:scale-105 ${s.title}`}
        style={{ fontSize: "clamp(34px, 6vw, 72px)" }}
      >
        {s.lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </h3>

      {/* blurb + CTA */}
      <div className="relative z-10 flex flex-col items-center gap-5">
        <p className={`max-w-[28ch] font-body text-sm font-medium leading-snug ${s.accent}`}>
          {info.blurb}
        </p>
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-toon-ink shadow-toon-sm transition-transform duration-300 group-hover:scale-105">
          View Menu
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}

export default function StripedPoster() {
  return (
    <section className="relative bg-black">
      <div className="px-6 pb-10 pt-16 text-center">
        <h2
          className="font-display uppercase leading-[0.9] text-white"
          style={{ fontSize: "clamp(40px, 8vw, 92px)" }}
        >
          Pick Your Craving
        </h2>
        <p className="mt-3 font-body text-xs font-bold uppercase tracking-[0.3em] text-white/60">
          Hover a stripe &middot; tap to open its menu
        </p>
      </div>

      <div className="flex flex-col md:flex-row">
        {CATEGORY_ORDER.map((slug) => (
          <Stripe key={slug} slug={slug} />
        ))}
      </div>
    </section>
  );
}
