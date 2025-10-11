import { useTranslation } from "react-i18next";
import { supportedLanguages } from "#shared/config/i18n";

export function LocaleSwitcher() {
  const { i18n } = useTranslation();

  return (
    <select
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      value={i18n.resolvedLanguage}
    >
      {Object.entries(supportedLanguages).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
