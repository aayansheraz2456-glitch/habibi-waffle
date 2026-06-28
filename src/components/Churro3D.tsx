import { Suspense, lazy, useEffect, useRef, useState } from "react";
import FoodArt from "./FoodArt";

// heavy three.js code — only fetched when this chunk is needed
const ChurroCanvas = lazy(() => import("./ChurroCanvas"));

/**
 * Performance-safe 3D model wrapper.
 * - Shows the lightweight SVG until the section is near the viewport.
 * - Mounts the live <Canvas> only while on screen; unmounts to free the GPU.
 */
export default function Churro3D({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "250px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible ? (
        <Suspense
          fallback={<FoodArt category="waffle" className="h-full w-auto" />}
        >
          <ChurroCanvas />
        </Suspense>
      ) : (
        <FoodArt category="waffle" className="h-full w-auto" />
      )}
    </div>
  );
}
