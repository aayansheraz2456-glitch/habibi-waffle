import { Suspense, lazy, useEffect, useRef, useState } from "react";
import FoodArt from "./FoodArt";
import { MODEL_URLS } from "../modelUrls";
import type { Category } from "../data/menu";

// heavy three.js code — fetched only when a model is actually shown
const ModelCanvas = lazy(() => import("./ModelCanvas"));

// camera height per model — the plate-shaped Chinese dish reads best tilted down
const ELEVATION: Record<Category, number> = {
  waffle: 1.0,
  chinese: 2.7,
  fastfood: 1.7,
};

/**
 * Performance-safe 3D model.
 * - Renders the lightweight SVG until the section is near the viewport.
 * - Mounts the live <Canvas> only when near AND `active` (so a horizontal
 *   carousel runs just one canvas at a time); unmounts otherwise to free GPU.
 */
export default function FoodModel({
  slug,
  active = true,
  className = "",
}: {
  slug: Category;
  active?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = near && active;

  return (
    <div ref={ref} className={`model-3d ${className}`}>
      {show ? (
        <Suspense fallback={<FoodArt category={slug} className="h-full w-auto" />}>
          <ModelCanvas url={MODEL_URLS[slug]} elevation={ELEVATION[slug]} />
        </Suspense>
      ) : (
        <FoodArt category={slug} className="h-full w-auto" />
      )}
    </div>
  );
}
