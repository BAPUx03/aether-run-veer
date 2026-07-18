import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  root: resolve(process.cwd(), "game-client"),
  base: "./",
  publicDir: "public",
  build: {
    outDir: resolve(process.cwd(), "public/game"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1400,
  },
});
