import react from "@vitejs/plugin-react-swc";

import { defineConfig } from "vite";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173,
    open: true,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": `${import.meta.dirname}/src`,
    },
  },
}));
