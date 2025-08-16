import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import I18NextHttpBackend, { type HttpBackendOptions } from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const defaultNS = "common";

i18next
  .use(I18NextHttpBackend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    debug: true,
    lng: "en",
    fallbackLng: "en",
    defaultNS,
    ns: ["common", "home"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      crossDomain: true,
    },
    interpolation: {
      escapeValue: false
    }
  });
