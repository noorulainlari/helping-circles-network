import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  appType: 'spa', // ✅ force SPA mode
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    ssr: false, // ✅ disables SSR so SPA fallback works correctly
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
