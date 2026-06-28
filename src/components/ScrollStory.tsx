import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HabibiLogo from "./HabibiLogo";
import BlurText from "./BlurText";
import { ChevronDown, IceCream, Noodles, Pizza, Star } from "./icons";

type Chapter = {
  kicker: string;
  title: string;
  body: string;
  icon: JSX.Element;
  bg: string;
  accent: string;
};

const CHAPTERS: Chapter[] = [
  {
    kicker: "Since day one",
    title: "Famous for waffles & ice cream",
    body: "Freshly pressed waffles, creamy scoops and loaded sundaes. The taste that made Habibi a Lahore favourite.",
    icon: <IceCream className="h-16 w-16" />,
    bg: "from-habibi-plum via-habibi-purple to-habibi-purple-dark",
    accent: "text-habibi-magenta",
  },
  {
    kicker: "Wok-fired & fresh",
    title: "Sizzling Chinese, made to order",
    body: "Saucy Manchurian, smoky chowmein and fried rice off a roaring flame. Comfort food with a desi-Chinese kick.",
    icon: <Noodles className="h-16 w-16" />,
    bg: "from-habibi-wine via-[#5a1620] to-habibi-wine-dark",
    accent: "text-habibi-cream",
  },
  {
    kicker: "Special injected",
    title: "Broast, pizza & loaded wraps",
    body: "Juicy injected broast, hand-stretched pizzas and crunchy wraps — fast food built for serious cravings.",
    icon: <Pizza className="h-16 w-16" />,
    bg: "from-[#23242a] via-habibi-charcoal to-black",
    accent: "text-habibi-gold",
  },
];

function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.34]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.65, 0.85], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -60]);
  const taglineOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-habibi-purple/40 blur-[120px]" />
          <div className="absolute left-[30%] top-[30%] h-[40vh] w-[40vh] rounded-full bg-habibi-pink/30 blur-[120px]" />
          <div className="absolute right-[25%] bottom-[20%] h-[36vh] w-[36vh] rounded-full bg-habibi-gold/20 blur-[120px]" />
        </div>

        <motion.div style={{ scale, opacity: logoOpacity, y }}>
          <HabibiLogo className="h-[58vh] max-h-[520px] w-auto drop-shadow-[0_20px_60px_rgba(230,57,139,0.35)] animate-float" />
        </motion.div>

        <motion.p
          style={{ opacity: taglineOpacity }}
          className="mt-2 max-w-md px-6 text-center font-body text-base font-light tracking-wide text-white/80"
        >
          Lahore&rsquo;s most loved waffles &amp; ice cream &mdash; now serving
          Chinese &amp; fast food.
        </motion.p>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 flex flex-col items-center gap-1 text-white/60"
        >
          <span className="font-body text-xs uppercase tracking-[0.3em]">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

function ChapterBlock({ ch, index }: { ch: Chapter; index: number }) {
  return (
    <section
      className={`relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b ${ch.bg} px-6`}
    >
      <div className="waffle-texture pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`mb-6 grid h-24 w-24 place-items-center rounded-[1.5rem] liquid-glass ${ch.accent}`}
        >
          {ch.icon}
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className={`mb-4 font-body text-xs uppercase tracking-[0.35em] ${ch.accent}`}
        >
          {String(index + 1).padStart(2, "0")} &middot; {ch.kicker}
        </motion.span>

        <BlurText
          text={ch.title}
          className="font-heading italic text-5xl leading-[0.95] tracking-[-2px] text-white md:text-7xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl font-body text-base font-light leading-relaxed text-white/85 md:text-lg"
        >
          {ch.body}
        </motion.p>
      </div>
    </section>
  );
}

export default function ScrollStory() {
  return (
    <>
      <Intro />
      {/* tiny brand strip between intro and chapters */}
      <div className="flex items-center justify-center gap-2 bg-black py-6 text-white/70">
        <Star className="h-4 w-4 text-habibi-gold" />
        <span className="font-body text-sm tracking-wide">
          3.9 on Google &middot; 234 reviews &middot; Pak-Arab Housing, Lahore
        </span>
      </div>
      {CHAPTERS.map((ch, i) => (
        <ChapterBlock key={ch.title} ch={ch} index={i} />
      ))}
    </>
  );
}
