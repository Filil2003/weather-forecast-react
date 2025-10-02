import clsx from "clsx";
import { Section, Text } from "#shared/ui";
import { WeatherIcon } from "../WeatherIcon/WeatherIcon.tsx";
import { mockWeeklyForecast } from "./mock";
import styles from "./WeeklyForecast.module.css";

export function WeeklyForecast() {
  return (
    <Section heading="Weekly forecast" headingLevel="h2">
      <ul className={styles.list}>
        {mockWeeklyForecast.map((day, index) => (
          <li
            className={clsx(styles.item, { [styles.weekend]: index % 2 === 0 })}
            key={day.date}
          >
            <div>
              <Text as="p" className={styles.date} variant="caption">
                {day.date}
              </Text>
              <Text as="p" className={styles.day} weight="bold">
                {day.day}
              </Text>
            </div>
            <WeatherIcon
              code={day.code}
              isDay={day.isDay}
              size={"2.25em"}
              title={day.condition}
            />
            <Text className={styles.condition}>{day.condition}</Text>
            <Text as="p" className={styles.temperature}>
              <Text weight="bold">{day.tempMax}</Text>
              {day.tempMin}
            </Text>
          </li>
        ))}
      </ul>
    </Section>
  );
}
