import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import FoodArt from "./FoodArt";
import Churro3D from "./Churro3D";
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
    text: "Saucy Manchurian, smoky chowmein and fried rice straight off a roaring flame.",
  },
  {
    slug: "fastfood",
    color: "#F2A63C",
    word: "BROAST",
    num: "03",
    title: "Broast · Pizza · Wraps",
    text: "Special injected broast, hand-stretched pizzas and loaded wraps built for cravings.",
  },
];

// scroll windows for each picture's fade in/out
const WINDOWS: { stops: number[]; ops: number[] }[] = [
  { stops: [0, 0.28, 0.38], ops: [1, 1, 0] },
  { stops: [0.3, 0.4, 0.6, 0.7], ops: [0, 1, 1, 0] },
  { stops: [0.64, 0.74, 1], ops: [0, 1, 1] },
];

function Picture({
  pic,
  win,
  z,
  progress,
}: {
  pic: Picture;
  win: { stops: number[]; ops: number[] };
  z: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, win.stops, win.ops);
  const scale = useTransform(
    progress,
    [win.stops[0], win.stops[win.stops.length - 1]],
    [1.06, 0.97]
  );
  const artY = useTransform(
    progress,
    [win.stops[0], win.stops[win.stops.length - 1]],
    [60, -60]
  );

  return (
    <motion.div
      style={{ opacity, backgroundColor: pic.color, zIndex: z }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <Grain className="z-[2]" />

      {/* ghost word behind the art */}
      <motion.span
        style={{
          scale,
          fontSize: "clamp(90px, 25vw, 360px)",
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap",
        }}
        className="pointer-events-none absolute z-[1] select-none font-display uppercase leading-none text-white/90"
      >
        {pic.word}
      </motion.span>

      {/* food art (3D model for the ice-cream/waffle picture) */}
      <motion.div style={{ y: artY }} className="relative z-[3]">
        {pic.slug === "waffle" ? (
          <Churro3D className="h-[60vh] w-[60vh] max-w-[92vw]" />
        ) : (
          <FoodArt
            category={pic.slug}
            className="h-[44vh] w-auto drop-shadow-[0_18px_28px_rgba(42,23,38,0.35)] sm:h-[56vh]"
          />
        )}
      </motion.div>

      {/* caption */}
      <div className="absolute bottom-10 left-4 z-[4] max-w-[420px] sm:bottom-16 sm:left-16">
        <p className="mb-1 font-display text-xl text-white/70">{pic.num}</p>
        <h3
          className="font-display uppercase leading-[0.9] text-white"
          style={{ fontSize: "clamp(30px, 5vw, 64px)" }}
        >
          {pic.title}
        </h3>
        <p className="mt-3 hidden font-body text-sm font-medium leading-relaxed text-white/90 sm:block">
          {pic.text}
        </p>
      </div>
    </motion.div>
  );
}

export default function ScrollPictures() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} className="relative h-[320vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* constant label */}
        <div className="absolute left-4 top-6 z-[40] sm:left-16 sm:top-8">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            What we offer
          </p>
        </div>

        {PICTURES.map((pic, i) => (
          <Picture
            key={pic.slug}
            pic={pic}
            win={WINDOWS[i]}
            z={i + 1}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
