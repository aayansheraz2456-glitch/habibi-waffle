import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "./icons";

/**
 * Vertical scroll hero. The real circular Habibi Waffle logo reveals with a
 * blur-in + shine sweep, then transforms (scales / lifts / fades) as you
 * scroll down.
 */
export default function ScrollLogoHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // spring-smoothed progress for buttery scroll-driven motion
  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.3,
  });

  // scroll-driven transforms (vertical)
  const scale = useTransform(p, [0, 1], [1, 0.55]);
  const y = useTransform(p, [0, 1], [0, -130]);
  const rotate = useTransform(p, [0, 1], [0, 16]);
  const opacity = useTransform(p, [0, 0.7, 1], [1, 1, 0]);
  const glow = useTransform(p, [0, 1], [1, 1.5]);
  const taglineOpacity = useTransform(p, [0, 0.22], [1, 0]);
  const hintOpacity = useTransform(p, [0, 0.1], [1, 0]);

  return (
    <section ref={ref} className="relative h-[200vh] bg-[#0c0710]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* ambient brand glow */}
        <motion.div
          style={{ scale: glow }}
          className="pointer-events-none absolute inset-0 -z-0"
        >
          <div className="absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-habibi-purple/40 blur-[120px]" />
          <div className="absolute left-[32%] top-[34%] h-[34vh] w-[34vh] rounded-full bg-habibi-pink/30 blur-[110px]" />
          <div className="absolute bottom-[24%] right-[28%] h-[30vh] w-[30vh] rounded-full bg-habibi-gold/20 blur-[110px]" />
        </motion.div>

        {/* logo: outer = scroll transform, inner = reveal on mount */}
        <motion.div style={{ scale, y, rotate, opacity }} className="relative z-10">
          <motion.div
            initial={{ scale: 0.7, opacity: 0, filter: "blur(16px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sheen relative overflow-hidden rounded-full drop-shadow-[0_24px_70px_rgba(230,57,139,0.45)]">
              <img
                src="/images/logo-waffle.webp"
                alt="Habibi Waffle"
                className="h-[62vh] max-h-[600px] w-auto select-none"
                draggable={false}
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          style={{ opacity: taglineOpacity }}
          className="relative z-10 mt-4 max-w-md px-6 text-center font-body text-base font-light tracking-wide text-white/85"
        >
          Lahore&rsquo;s most loved waffles &amp; ice cream &mdash; now serving
          Chinese &amp; fast food.
        </motion.p>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-1 text-white/70"
        >
          <span className="font-body text-[11px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
