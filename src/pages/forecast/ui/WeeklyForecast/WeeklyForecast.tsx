import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Section, Text } from "#shared/ui";
import type { Day } from "../../model";
import styles from "./WeeklyForecast.module.css";

interface Props {
  forecast: Day[];
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
              <Text weight="bold">{day.temperature.avg}</Text>
              {day.temperature.min}
            </Text>
          </li>
        ))}
      </ul>
    </Section>
  );
}
