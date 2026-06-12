import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [react(), imagetools()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/server"),
    emptyOutDir: true,
    ssr: "src/prerender.tsx",
    rollupOptions: {
      output: {
        format: "es",
        entryFileNames: "prerender.js",
      },
    },
  },
});
