import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import FoodModel from "./FoodModel";
import Grain from "./Grain";
import type { Category } from "../data/menu";

type Picture = {
  slug: Category;
  color: string;
  word: string;
  num: string;
  title: string;
  text: string;
};

const PICTURES: Picture[] = [
  {
    slug: "waffle",
    color: "#E36FA9",
    word: "WAFFLE",
    num: "01",
    title: "Famous for Waffles & Ice Cream",
    text: "Freshly pressed waffles, creamy scoops and loaded sundaes — the taste Lahore keeps coming back for.",
  },
  {
    slug: "chinese",
    color: "#D8443B",
    word: "CHINESE",
    num: "02",
    title: "Sizzling Chinese, Made Fresh",
    text: "Wok-fired stir-fries, saucy Manchurian and smoky chowmein straight off a roaring flame.",
  },
  {
    slug: "fastfood",
    color: "#F2A63C",
    word: "BROAST",
    num: "03",
    title: "Broast · Pizza · Wraps",
    text: "Crispy fried broast, hand-stretched pizzas and loaded wraps built for cravings.",
  },
];

const N = PICTURES.length;

function Panel({ pic, active }: { pic: Picture; active: boolean }) {
  return (
    <div
      className="relative flex h-screen w-screen flex-none items-center justify-center overflow-hidden"
      style={{ backgroundColor: pic.color }}
    >
      <Grain className="z-[2]" />

      {/* faint ghost word */}
      <span
        className="pointer-events-none absolute z-[1] select-none font-display uppercase leading-none text-white/[0.14]"
        style={{
          fontSize: "clamp(90px, 25vw, 360px)",
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap",
        }}
      >
        {pic.word}
      </span>

      {/* 3D model (live only when this panel is the active one) */}
      <div className="relative z-[3] mb-[12vh] sm:mb-[8vh]">
        <FoodModel
          slug={pic.slug}
          active={active}
          className="h-[46vh] w-[46vh] max-w-[88vw]"
        />
      </div>

      {/* caption */}
      <div className="absolute bottom-8 left-4 z-[4] max-w-[420px] drop-shadow-[0_2px_12px_rgba(42,23,38,0.55)] sm:bottom-14 sm:left-16">
        <p className="mb-1 font-display text-xl text-white/80">{pic.num}</p>
        <h3
          className="font-display uppercase leading-[0.9] text-white"
          style={{ fontSize: "clamp(28px, 4.6vw, 60px)" }}
        >
          {pic.title}
        </h3>
        <p className="mt-3 hidden font-body text-sm font-medium leading-relaxed text-white/95 sm:block">
          {pic.text}
        </p>
      </div>
    </div>
  );
}

export default function ScrollPictures() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // drive the horizontal slide from vertical scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(N - 1) * 100}vw`]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(N - 1, Math.max(0, Math.round(v * (N - 1))));
    setActive((prev) => (prev === i ? prev : i));
  });

  return (
    <section ref={ref} className="relative h-[320vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* centred label (clear of the fixed navbar) */}
        <div className="absolute left-1/2 top-[4.5rem] z-[40] -translate-x-1/2">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-white/85">
            What we offer
          </p>
        </div>

        {/* horizontal track */}
        <motion.div style={{ x }} className="flex h-full" >
          {PICTURES.map((pic, i) => (
            <Panel key={pic.slug} pic={pic} active={active === i} />
          ))}
        </motion.div>

        {/* progress dots */}
        <div className="absolute bottom-6 left-1/2 z-[40] flex -translate-x-1/2 gap-2">
          {PICTURES.map((p, i) => (
            <span
              key={p.slug}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === i ? "w-7 bg-white" : "w-2 bg-white/45"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
