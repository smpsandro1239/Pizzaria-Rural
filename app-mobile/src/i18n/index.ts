import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import ptPT from "./locales/pt-PT.json";
import enUS from "./locales/en-US.json";

const resources = {
  "pt-PT": { translation: ptPT },
  "en-US": { translation: enUS },
};

const getDeviceLanguage = () => {
  const locale = Localization.getLocales()[0].languageCode;
  if (locale && resources[locale as keyof typeof resources]) {
    return locale;
  }
  return "pt-PT";
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage() as string,
    fallbackLng: "pt-PT",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
