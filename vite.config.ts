import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import webExtension from "vite-plugin-web-extension";

export default defineConfig({
  plugins: [
    react(),
    webExtension({
      manifest: "public/manifest.json",
      // popup と options の2エントリを自動検出
      additionalInputs: [
        "src/popup/index.html",
        "src/options/index.html",
      ],
    }),
  ],
  build: {
    outDir: "build",
    emptyOutDir: true,
    sourcemap: process.env.NODE_ENV !== "production",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
