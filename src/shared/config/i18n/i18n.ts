import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { datetime } from "./formatters.tsx";

const supportedLanguages = {
  en: "English",
  ru: "Русский",
  ar: "العربية",
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: Object.keys(supportedLanguages),
    interpolation: {
      escapeValue: false,
    },
  });

i18n.services.formatter?.add("datetime", datetime);

export { i18n, supportedLanguages };
