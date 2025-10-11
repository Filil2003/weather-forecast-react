import { type PropsWithChildren, useEffect } from "react";
import "#shared/config/i18n";
import { useTranslation } from "react-i18next";

export function LanguageProvider({ children }: PropsWithChildren) {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.resolvedLanguage) {
      document.documentElement.lang = i18n.resolvedLanguage;
      document.documentElement.dir = i18n.dir(i18n.resolvedLanguage);
    }
  });

  return children;
}
