import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("react-dom") || id.includes("react/") || id.includes("scheduler")) return "react-vendor";
          if (id.includes("react-router")) return "router";
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("@tanstack/react-query")) return "query";
          if (id.includes("@supabase")) return "supabase";
          if (id.includes("@radix-ui")) return "radix";
          if (id.includes("embla-carousel")) return "embla";
          if (id.includes("react-signature-canvas") || id.includes("react-day-picker") || id.includes("react-hook-form")) return "forms";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("zod")) return "zod";
          return "vendor";
        },
      },
    },
  },
}));
