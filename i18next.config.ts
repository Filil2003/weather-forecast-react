import { defineConfig } from "i18next-cli";

export default defineConfig({
  locales: ["ru", "en", "ar"],
  extract: {
    input: "src/**/*.{ts,tsx}",
    ignore: "src/**/*module.css.d.ts",
    output: "public/locales/{{language}}/{{namespace}}.json",
  },
});
