import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from '@/languages/en'

i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
        en
    },
  });

export default i18n;