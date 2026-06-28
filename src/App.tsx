import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";

export default function App() {
  // Warm the (lazy) 3D engine chunk during idle time — after the page is
  // interactive — so scrolling to the models is instant, without adding any
  // weight to the initial page load.
  useEffect(() => {
    const warm = () => {
      import("./components/ModelCanvas");
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
