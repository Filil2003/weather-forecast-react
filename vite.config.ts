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
});
