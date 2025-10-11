import clsx from "clsx";
import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import { Section, Text } from "#shared/ui";
import styles from "./WeeklyForecast.module.css";

interface Props {
  forecast: Array<{
    date: string;
    condition: string;
    icon: JSX.Element;
    temperature: {
      avg: {
        celsius: string;
        fahrenheit: string;
      };
      min: {
        celsius: string;
        fahrenheit: string;
      };
    };
  }>;
}

export function WeeklyForecast({ forecast }: Props) {
  const { t } = useTranslation();

  return (
    <Section heading={t("weekly.title")} headingLevel="h2">
      <ul className={styles.list}>
        {forecast.map((day, index) => (
          <li
            className={clsx(styles.item, { [styles.weekend]: index % 2 === 0 })}
            key={day.date}
          >
            <div>
              <Text as="p" className={styles.date} variant="caption">
                {t("weekly.date", {
                  date: new Date(day.date),
                })}
              </Text>
              <Text as="p" className={styles.day} weight="bold">
                {t("weekly.day", {
                  date: new Date(day.date),
                })}
              </Text>
            </div>
            {day.icon}
            <Text className={styles.condition}>{day.condition}</Text>
            <Text as="p" className={styles.temperature}>
              <Text weight="bold">{day.temperature.avg.celsius}</Text>
              {day.temperature.min.celsius}
            </Text>
          </li>
        ))}
      </ul>
    </Section>
  );
}
