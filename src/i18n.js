import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import trTranslation from "./locales/tr.json";

// The translations
const resources = {
    en: {
        translation: enTranslation,
    },
    tr: {
        translation: trTranslation,
    },
};

// Initialize i18n
i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;