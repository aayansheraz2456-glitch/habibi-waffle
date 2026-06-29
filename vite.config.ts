import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.glb"],
  build: {
    chunkSizeWarningLimit: 1200,
    // Don't let the lazy 3D engine get hoisted into the entry's modulepreload —
    // it must only load on demand, not on first paint.
    modulePreload: {
      resolveDependencies: (_filename, deps) =>
        deps.filter((d) => !d.includes("three-vendor")),
    },
    rollupOptions: {
      output: {
        // split big vendors into their own cacheable chunks. three / drei are
        // only imported by the lazy 3D module, so they stay out of the main
        // bundle and load on demand.
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("three") || id.includes("@react-three"))
              return "three-vendor";
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("react-router")) return "router";
            if (id.includes("react") || id.includes("scheduler"))
              return "react-vendor";
          }
        },
      },
    },
  },
});
