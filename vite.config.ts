import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { patchCssModules } from "vite-css-modules";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    react(),
    patchCssModules({
      exportMode: "default",
      generateSourceTypes: true,
    }),
    checker({
      typescript: { tsconfigPath: "./tsconfig.app.json" },
    }),
  ],
  resolve: {
    alias: {
      "#pages": path.resolve(import.meta.dirname, "src", "pages"),
      "#widgets": path.resolve(import.meta.dirname, "src", "widgets"),
      "#features": path.resolve(import.meta.dirname, "src", "features"),
      "#entities": path.resolve(import.meta.dirname, "src", "entities"),
      "#shared": path.resolve(import.meta.dirname, "src", "shared"),
    },
  },
});
