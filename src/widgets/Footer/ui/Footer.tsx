import { Trans } from "react-i18next";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Trans i18nKey="terms.agreement">
        Weather data provided by{" "}
        <a href="https://www.weatherapi.com/">WeatherAPI.com</a>
      </Trans>
    </footer>
  );
}
