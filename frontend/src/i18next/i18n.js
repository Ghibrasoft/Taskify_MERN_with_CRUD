import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // default language fallback
    debug: true, // set to true to enable i18next debug logs
    interpolation: {
      escapeValue: false, // react already escapes variables for us
    },
  });

export default i18n;
