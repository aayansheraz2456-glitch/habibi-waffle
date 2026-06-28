import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";

export default function App() {
  // After the page is interactive, during idle time, warm the 3D engine and
  // pre-fetch + pre-decode the models (in a worker) so they appear instantly
  // on scroll. Skipped on data-saver / very slow connections.
  useEffect(() => {
    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") {
      return;
    }
    const warm = () => {
      import("./components/ModelCanvas");
      import("@react-three/drei")
        .then((m) => {
          ["/models/churro.glb", "/models/chinese.glb", "/models/fastfood.glb"].forEach(
            (u) => m.useGLTF.preload(u, true)
          );
        })
        .catch(() => {});
    };
    const ric = window as unknown as {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (ric.requestIdleCallback) {
      const id = ric.requestIdleCallback(warm, { timeout: 4000 });
      return () => ric.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(warm, 2500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu/:slug" element={<MenuPage />} />
    </Routes>
  );
}
