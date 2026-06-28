import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CATEGORY_ORDER, CATEGORIES, type Category } from "../data/menu";
import { ArrowUpRight, IceCream, Noodles, Pizza } from "./icons";
import HabibiLogo from "./HabibiLogo";

const STRIPE_STYLE: Record<
  Category,
  { bg: string; title: string; sub: string; icon: JSX.Element; label: string }
> = {
  chinese: {
    bg: "bg-gradient-to-b from-habibi-wine via-[#4a1018] to-habibi-wine-dark",
    title: "text-habibi-cream",
    sub: "text-habibi-cream/70",
    icon: <Noodles className="h-10 w-10 text-habibi-cream" />,
    label: "Häbibi\nChinese Menu",
  },
  waffle: {
    bg: "bg-gradient-to-b from-habibi-plum via-habibi-purple to-habibi-purple-dark",
    title: "text-habibi-magenta",
    sub: "text-white/70",
    icon: <IceCream className="h-10 w-10 text-habibi-gold" />,
    label: "Habibi\nWaffle & Dessert",
  },
  fastfood: {
    bg: "bg-gradient-to-b from-[#26272c] via-habibi-charcoal to-black",
    title: "text-habibi-gold",
    sub: "text-white/70",
    icon: <Pizza className="h-10 w-10 text-habibi-gold" />,
    label: "Special Injected\nBroast · Pizza · Wrap",
  },
};

function Stripe({ slug, index }: { slug: Category; index: number }) {
  const navigate = useNavigate();
  const info = CATEGORIES[slug];
  const s = STRIPE_STYLE[slug];

  return (
    <motion.button
      type="button"
      onClick={() => navigate(`/menu/${slug}`)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className={`group relative flex min-h-[60vh] flex-1 basis-0 flex-col items-center justify-between overflow-hidden ${s.bg} px-6 py-12 text-center transition-all duration-500 md:min-h-screen md:hover:flex-[1.4]`}
    >
      <div className="waffle-texture pointer-events-none absolute inset-0 opacity-20" />

      {/* top: little logo badge + icon */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <HabibiLogo
          rings={slug === "waffle"}
          className="h-20 w-20 opacity-90 transition-transform duration-500 group-hover:scale-110"
        />
        <div className="grid h-16 w-16 place-items-center rounded-2xl liquid-glass">
          {s.icon}
        </div>
      </div>

      {/* middle: title */}
      <h3
        className={`relative z-10 whitespace-pre-line font-heading italic text-4xl leading-[0.95] tracking-[-1px] md:text-5xl ${s.title}`}
      >
        {s.label}
      </h3>

      {/* bottom: blurb + CTA */}
      <div className="relative z-10 flex flex-col items-center gap-5">
        <p className={`max-w-[26ch] font-body text-sm font-light leading-snug ${s.sub}`}>
          {info.blurb}
        </p>
        <span className="inline-flex items-center gap-2 rounded-full liquid-glass-strong px-5 py-2.5 font-body text-sm font-medium text-white transition-transform duration-300 group-hover:scale-105">
          View menu
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </motion.button>
  );
}

export default function StripedPoster() {
  return (
    <section className="relative bg-black">
      <div className="px-6 pb-12 pt-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="font-heading italic text-5xl leading-[0.9] tracking-[-2px] text-white md:text-7xl"
        >
          Pick your craving
        </motion.h2>
        <p className="mt-4 font-body text-sm uppercase tracking-[0.3em] text-white/60">
          Three menus &middot; one Habibi
        </p>
      </div>

      <div className="flex flex-col md:flex-row">
        {CATEGORY_ORDER.map((slug, i) => (
          <Stripe key={slug} slug={slug} index={i} />
        ))}
      </div>
    </section>
  );
}
