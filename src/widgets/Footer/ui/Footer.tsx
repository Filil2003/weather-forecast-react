import { useTranslation } from "react-i18next";
import { Text } from "#shared/ui";
import styles from "./Footer.module.css";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <Text as="p" weight="bold">
        {t("footer.weather-data-source")}{" "}
        <a href="https://www.weatherapi.com/">WeatherAPI.com</a>
      </Text>
    </footer>
  );
}
