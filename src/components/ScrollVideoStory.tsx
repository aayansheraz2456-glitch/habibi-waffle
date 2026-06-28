import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import HabibiLogo from "./HabibiLogo";
import { ChevronDown, Star } from "./icons";

/**
 * Scroll-scrubbed background video.
 * The page section is several screens tall; as you scroll through it the
 * video's playhead is mapped to scroll progress (scroll down = forward,
 * up = rewind). A requestAnimationFrame loop eases currentTime toward the
 * scroll target so the scrub feels smooth even with sparse keyframes.
 *
 * Captions + the logo are overlaid and cross-fade at set progress ranges.
 */

type Caption = {
  range: [number, number];
  kicker: string;
  title: string;
  body: string;
  accent: string;
};

const CAPTIONS: Caption[] = [
  {
    range: [0.2, 0.42],
    kicker: "01 · Since day one",
    title: "Famous for waffles & ice cream",
    body: "Freshly pressed waffles, creamy scoops and loaded sundaes — the taste that made Habibi a Lahore favourite.",
    accent: "text-habibi-magenta",
  },
  {
    range: [0.44, 0.66],
    kicker: "02 · Wok-fired & fresh",
    title: "Sizzling Chinese, made to order",
    body: "Saucy Manchurian, smoky chowmein and fried rice off a roaring flame. Comfort food with a desi-Chinese kick.",
    accent: "text-habibi-gold",
  },
  {
    range: [0.68, 0.9],
    kicker: "03 · Special injected",
    title: "Broast, pizza & loaded wraps",
    body: "Juicy injected broast, hand-stretched pizzas and crunchy wraps — fast food built for serious cravings.",
    accent: "text-habibi-gold",
  },
];

function CaptionBlock({
  caption,
  progress,
}: {
  caption: Caption;
  progress: MotionValue<number>;
}) {
  const [a, b] = caption.range;
  const fade = Math.min(0.05, (b - a) / 4);
  const opacity = useTransform(
    progress,
    [a, a + fade, b - fade, b],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [a, b], [40, -40]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 bottom-[12vh] z-20 flex flex-col items-center px-6 text-center"
    >
      <span className={`mb-3 font-body text-xs uppercase tracking-[0.35em] ${caption.accent}`}>
        {caption.kicker}
      </span>
      <h2 className="max-w-3xl font-heading italic text-5xl leading-[0.95] tracking-[-2px] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] md:text-7xl">
        {caption.title}
      </h2>
      <p className="mt-4 max-w-xl font-body text-base font-light text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
        {caption.body}
      </p>
    </motion.div>
  );
}

export default function ScrollVideoStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentRef = useRef(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Overlay transforms for the logo intro and end hint
  const logoScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.5]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.12, 0.18], [1, 1, 0]);
  const taglineOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const endHintOpacity = useTransform(scrollYProgress, [0.92, 0.98], [0, 1]);
  // darken the video a touch so overlaid text stays readable
  const veilOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.95, 1],
    [0.55, 0.35, 0.35, 0.6]
  );

  // rAF loop: ease video.currentTime toward scroll target
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const video = videoRef.current;
      if (video && video.duration && !Number.isNaN(video.duration)) {
        const target = scrollYProgress.get() * video.duration;
        currentRef.current += (target - currentRef.current) * 0.12;
        if (Math.abs(target - currentRef.current) < 0.005) {
          currentRef.current = target;
        }
        try {
          video.currentTime = currentRef.current;
        } catch {
          /* seeking not ready yet */
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrollYProgress]);

  return (
    <section ref={trackRef} className="relative h-[420vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* background video (scrubbed) */}
        <video
          ref={videoRef}
          src="/videos/habibi-scroll.mp4"
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* readability veil */}
        <motion.div
          style={{ opacity: veilOpacity }}
          className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/30 to-black/80"
        />

        {/* logo intro */}
        <motion.div
          style={{ scale: logoScale, opacity: logoOpacity }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center"
        >
          <HabibiLogo className="h-[52vh] max-h-[460px] w-auto drop-shadow-[0_20px_60px_rgba(230,57,139,0.4)]" />
          <motion.p
            style={{ opacity: taglineOpacity }}
            className="mt-2 max-w-md px-6 text-center font-body text-base font-light tracking-wide text-white/85"
          >
            Lahore&rsquo;s most loved waffles &amp; ice cream &mdash; now serving
            Chinese &amp; fast food.
          </motion.p>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-1 text-white/70"
        >
          <span className="font-body text-xs uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </motion.div>

        {/* story captions over the video */}
        {CAPTIONS.map((c) => (
          <CaptionBlock key={c.title} caption={c} progress={scrollYProgress} />
        ))}

        {/* end hint */}
        <motion.div
          style={{ opacity: endHintOpacity }}
          className="absolute inset-x-0 bottom-10 z-20 flex flex-col items-center gap-2 text-white/80"
        >
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-habibi-gold" />
            <span className="font-body text-sm tracking-wide">
              3.9 on Google &middot; 234 reviews &middot; Lahore
            </span>
          </div>
          <span className="font-body text-xs uppercase tracking-[0.3em]">
            Keep scrolling for the menus
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
